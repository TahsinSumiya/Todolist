import React,{useState,useRef,useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
const local_storage_keys ='todoApp.todos'
function App() {

   const [todos,setTodos] = useState([])

   const todoNameRef = useRef()
  
   useEffect(()=>{
      const storedTodos = JSON.parse(localStorage.getItem(local_storage_keys))
      if(storedTodos) setTodos(storedTodos)
   },[])

  useEffect(()=>{
    localStorage.setItem(local_storage_keys, JSON.stringify(todos))
  },[todos])


   function toggleTodo(id){
     const  newTodos = [...todos]
     const todo = newTodos.find(todo => todo.id === id)
     todo.complete = !todo.complete
     setTodos(newTodos);
   }

   function handleAddTodo(e){
     const name = todoNameRef.current.value

      if(name ==='') return 
     setTodos(prevTodos =>{
       return [...prevTodos,{id:uuidv4(), name:name,complete:false}]
     })

      todoNameRef.current.value =null

   }

  function handleClearTodos(){
    const newTodos =todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
    
    <input className='input ' ref={todoNameRef} type="text" />
    <button className='button1 ' onClick={handleAddTodo}>Add Todo's</button>
    <button className='button2 ' onClick={handleClearTodos}> Clear Todo's</button>
    <TodoList  todos = {todos} toggleTodo={toggleTodo}/>
    <div className='left ' >{todos.filter(todo=>!todo.complete).length} Todo's left</div>
    </>
  )
}

export default App;
