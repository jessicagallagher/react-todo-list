import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateTodo() {
  const [todoInfo, setTodoInfo] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setTodoInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  // send POST request to send new todo to server
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/todoapp', todoInfo)
      .then((res) => {
        setTodoInfo({ title: '', description: '' });
        console.log(`MSG: ${res.data.message}`);
      })
      .catch((err) => {
        console.log(`ERR: ${err.message}`);
      });
  }

  return (
    <section className='container'>
      <Link to='/'>
        <button type='button' className='todo-btn todo-btn-back'>
          🔙 Back
        </button>
      </Link>

      <section className='todo-data'>
        <form onSubmit={handleSubmit} className='form-container' noValidate>
          <label className='label' htmlFor='title'>
            Todo Title
          </label>
          <input
            type='text'
            name='title'
            value={todoInfo.title}
            onChange={handleChange}
            className='input'
          />
          <label className='label' htmlFor='description'>
            Describe it !
          </label>
          <input
            type='textarea'
            name='description'
            value={todoInfo.description}
            onChange={handleChange}
            className='input'
          />
          <button type='submit' className='todo-btn'>
            ➕ create todo
          </button>
        </form>
      </section>
    </section>
  );

}
