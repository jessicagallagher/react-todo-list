import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateTodo() {
  const [todoInfo, setTodoInfo] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodoInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  let baseURL = '';

  if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8000';
  } else {
    baseURL = 'https://jess-todo-list.herokuapp.com/';
  }

  // send POST request to send new todo to server
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(baseURL + 'http://localhost:8000/api/todoapp', todoInfo)
      .then((res) => {
        setTodoInfo({ title: '', description: '' });
        console.log(`MSG: ${res.data.message}`);
        navigate('/')
      })
      .catch((err) => {
        console.log(`ERR: ${err.message}`);
      });
  };

  return (
    <section className='container'>
      <Link to='/'>
        <button type='button' className='todo-btn todo-btn-back add-btn'>
          ⬅️
        </button>
      </Link>

      <section className='todo-data'>
        <form onSubmit={handleSubmit} className='form-container add-container' noValidate>
          <label className='label' htmlFor='title'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={todoInfo.title}
            onChange={handleChange}
            className='input'
          />
          <label className='label' htmlFor='description'>
            Describe it!
          </label>
          <input
            type='textarea'
            name='description'
            value={todoInfo.description}
            onChange={handleChange}
            className='input'
          />
          <button type='submit' className='todo-btn'>
            ✔️
          </button>
        </form>
      </section>
    </section>
  );
}
