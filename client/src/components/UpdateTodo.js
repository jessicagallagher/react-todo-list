import { useState } from 'react';
import axios from 'axios';

export default function UpdateTodo({ _id, closeHandler, updateHandler }) {
  const [todoInfo, setTodoInfo] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setTodoInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  // send PUT request to server to update doc by _id
  const submitHandler = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/todoapp/${_id}`, todoInfo)
      .then((res) => {
        setTodoInfo({ title: '', description: '' });
      })
      .catch((err) => {
      console.log(`ERROR: ${err}`)
    })
  }

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
        Todo Title
      </label>
      <input
        type='text'
        name='title'
        className='input'
        onChange={handleChange}
      />
      <label htmlFor='description' className='label'>
        Todo Description
      </label>
      <input
        type='textarea'
        name='description'
        className='input'
        onChange={handleChange}
      />
      <button type='submit' className='todo-btn'>
        ➕ Add
      </button>
    </form>
  );
}
