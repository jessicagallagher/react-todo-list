import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayTodo from './components/DisplayTodo';
import CreateTodo from './components/CreateTodo';
import './App.css';

function App() {
  return (
    <div className='todo-Container'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<DisplayTodo />} />
          <Route exact path='/add-todo' element={<CreateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
