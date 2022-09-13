import './App.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState("")
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => 
  {
    setTodoList(prevTodoList => [...prevTodoList, { id: uuidv4(), todo: newTodo, isEditable: false, isCompleted: false }])
    setNewTodo("")
  }

  const completeTodo = (id) =>
  {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ? { ...todoItem, isCompleted: !todoItem.isCompleted } : todoItem))
  }

  const editTodo = (id, oldTodo) => 
  {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ? { ...todoItem, isEditable: !todoItem.isEditable } : todoItem)) 
    setTodo(oldTodo)
  }

  const saveTodo = (id) => 
  {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ? { ...todoItem, isEditable: !todoItem.isEditable, todo: todo } : todoItem))
  }

  const deleteTodo = (id) => 
  {
    setTodoList(prevTodoList => prevTodoList.filter(todoItem => todoItem.id !== id))
  }

  return (
    <div className="App text-white d-flex flex-column justify-content-center align-items-center">
      <h1 className='mb-5 text-white fw-bold'>Todo List</h1>

      <div className='d-flex w-50'>
        <Form.Control
          className='w-75'
          placeholder="Todo Input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className='btn btn-primary ms-3 w-25' onClick={addTodo} >Add Todo</button>
      </div>

      <div className='mt-3 w-50 '>
        {
          todoList.map(
            todoItem => 
            <div key={todoItem.id} className='d-flex justify-content-between  my-3'>
              
              <div className='d-flex align-items-center w-75 '>
                
                <Form.Check
                  type={'checkbox'}
                  value={todoItem.isCompleted}
                  onChange={() => completeTodo(todoItem.id)}
                  className='me-3'
                />

                {

                  !todoItem.isEditable ?
                    <label className={`${todoItem.isCompleted ? 'text-decoration-line-through' : ""} fw-bold fs-4 ms-3`}>
                      {todoItem.todo}
                    </label>

                    :

                    <Form.Control
                      value={todo}
                      onChange={(e) => setTodo(e.target.value)}
                    />

                }

              </div>

              <div >
                {
                  !todoItem.isEditable ?
                    <i className="fa-solid fa-pen-to-square fa-2x me-4 text-primary" style={{ cursor: "pointer" }} onClick = {() => editTodo(todoItem.id, todoItem.todo)}></i>
                    :
                    <i className="fa-solid fa-floppy-disk fa-2x me-4 text-success" style={{ cursor: "pointer" }} onClick = {() => saveTodo(todoItem.id)}></i>
                }
                
                <i className="fa-solid fa-trash fa-2x text-danger" style={{ cursor: "pointer" }} onClick = {() => deleteTodo(todoItem.id)}></i>
              
              </div>

            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
