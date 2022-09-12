export default function TodoLists({ todoInfos, editHandler, deleteHandler }) {
  const { _id, title, description } = todoInfos;

  return (
    // iterate over todoData and pass content to this component--diplay contents of each todo doc in db
    <li key={_id}>
      <div className='pin'>📌</div>
      <div>
        <h2 className='title'>{title}</h2>
        <h1></h1>
        <h2 className='title-description'>{description}</h2>
      </div>
      <h1></h1>
      <div className='todo-btn-container'>
        <button name={_id} className='todo-btn' onClick={editHandler}>
          🖊️
        </button>
        <button name={_id} className='todo-btn' onClick={deleteHandler}>
          🗑️
        </button>
      </div>
    </li>
  );
}
