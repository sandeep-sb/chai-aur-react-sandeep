import { useEffect, useState } from 'react'
import {TodoProvider} from "./context"
import {TodoForm, TodoItem} from "./components"
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=> {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...todos]);
  }

  const updateTodo = (id, todo) => {
    // another way
    // setTodos((prev) => prev.map((eachTodo) => eachTodo.id === id ? todo : eachTodo));
    setTodos((prev) => prev.map((eachTodo) => {
      if(eachTodo.id === id){
        return todo;
      }
      return eachTodo;
    }))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((eachTodo) => eachTodo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((eachTodo) => {
      if(eachTodo.id === id){
        return {...eachTodo, completed: !eachTodo.completed}
      }
      return eachTodo;
    }))
  }

  // get todos from local storage everytime screen is rendered and display it on the screen
  useEffect(() => {
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
    const oldTodos = JSON.parse(localStorage.getItem("todosKey"));
    
    // oldTodos is to check undefined and oldTodos.length > 0 to 
    // check if there are any todos present currently
    if(oldTodos && oldTodos.length > 0){
      setTodos(oldTodos);
    }

  }, []);
  // store todos in local storage everytime a todo is added
  useEffect(() => {
    localStorage.setItem("todosKey", JSON.stringify(todos));
  }, [todos]);

  return (
   <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
   <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
            {todos && todos.map((todo) => (
              <div className='w-full'>
                <TodoItem eachTodo={todo} key={todo.id}/>
              </div>
            ))}
        </div>
    </div>
  </div>
   </TodoProvider>
  )
}

export default App
