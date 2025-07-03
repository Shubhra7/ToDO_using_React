import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}
    >
      {/* Full-page Pinkish Gradient Background */}
      <div className="min-h-screen w-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            📝 ToDo List 📝
          </h1>

          {/* Todo Form */}
          <div>
            <TodoForm />
          </div>

          {/* Todo List Items */}
          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>

          {/* Footer credit */}
          <p className="text-center text-sm text-gray-500 pt-2 border-t border-gray-200">
            Created by <span className="font-semibold">𝚂𝚑𝚞𝚋𝚑𝚛𝚊𝚓𝚒𝚝 𝙶𝚑𝚘𝚜𝚑</span>
          </p>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
