import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateTodo from './UpdateTodo'
import TodoLists from './TodoLists';

export default function DisplayTodo() {
  const [infoTodo, setInfoTodo] = useState([]);
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);

  // GET request to pull data from server and display all docs
  useEffect(() => {
    axios.get('http://localhost:8000/api/todoapp')
      .then((res) => {
        console.log(`DATA: ${res.data}`);
        setInfoTodo(res.data);
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  }, [update]);

  const editHandler = (e) => {
    setId(e.target.name);
    setModal(true);
  }

  const updateHandler = () => {
    setUpdate(!update);
  };

  // send DELETE request to server to delete doc via _id
  const deleteHandler = (e) => {
    axios.delete(`http://localhost:8000/api/todoapp/${e.target.name}`);
    setInfoTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  };

  const closeHandler = () => {
    setId('');
    setModal(false);
  };

  return (
    <section className='container'>
      <h1 className='main-title'>Todo List</h1>
      <Link to='/add-todo' className='todo-btn-new'>
        <button className='todo-btn add-btn'>🆕</button>
      </Link>
      <section className='todo-data'>
        <h1></h1>
        <ul className='todo-list-block'>
          {infoTodo.map((todoInfo, index) => (
            <TodoLists
              key={index}
              todoInfos={todoInfo}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </ul>
      </section>
      {modal ? (
        <section className='update-container'>
          <div className='update-todo-data'>
            <p onClick={closeHandler} className='close'>
              ✖️
            </p>
            <UpdateTodo
              _id={id}
              closeHandler={closeHandler}
              updateHandler={updateHandler}
            />
          </div>
        </section>
      ) : (
        ''
      )}
    </section>
  );

}
