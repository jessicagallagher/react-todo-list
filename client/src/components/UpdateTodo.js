import { useState } from 'react';
import axios from 'axios';

export default function UpdateTodo({ _id, closeHandler, updateHandler, title, description }) {
  const initialState = {
    title,
    description
  }
  const [todoInfo, setTodoInfo] = useState(initialState);

  const handleChange = (e) => {
    setTodoInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  // send PUT request to server to update doc by _id
  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/todoapp/${_id}`, todoInfo)
      .then((res) => {
        setTodoInfo({ title: '', description: '' });
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  };

  return (
    <form
      className='form-container'
      onSubmit={(e) => {
        submitHandler(e);
        updateHandler();
        closeHandler();
      }}
    >
      <label htmlFor='title' className='label'>
        Title
      </label>
      <input
        type='text'
        name='title'
        className='input'
        value={todoInfo.title}
        onChange={handleChange}
      />
      <label htmlFor='description' className='label'>
        Description
      </label>
      <input
        type='textarea'
        name='description'
        className='input'
        value={todoInfo.description}
        onChange={handleChange}
      />
      <button type='submit' className='todo-btn'>
        ✔️
      </button>
    </form>
  );
}
