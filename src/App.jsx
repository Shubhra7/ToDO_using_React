import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {
  // this the context api todos
  const [todos, setTodos] = useState([])

  // now implement the context api given methods

  // the todo will come from form in bellow 
  const addTodo = (todo)=>{
    // Because we will add the new do with previous one 
    // in context api there is todos structure, for this we need id to inject that's why we used {id: ......... }
    setTodos((prev)=> [{id: Date.now(), ...todo},...prev])
  }

  // id ==> change which one      todo ==> new one to set
  const updatedTodo =(id, todo)=>{
    // *** used map inspite of foreach because we need the return value to setTodos ***
    // checking previous todo with map()
    // as in todos each element id object
    // so again call back used for each object in the array
    // then check the id of each object
    // if matched then change or previous one 
    setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id === id ?  todo : prevTodo)))
  }

  // delete will work like, store every ids except the given id
  // that's why better to use filter 
  const deleteTodo = (id)=>{
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }


  // for toggle rest will be same and the matched id todo will changed
  //total todos(array of objects)--> single object--> check id--> change or same
  const toggleComplete = (id)=>{
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  // use local storage beacuse when first or anytime refresh the todos should be in the localstorage 
  // useEffect for first time fetched and dependency changes fetched
  // local storage alawys store value in String format but we need in JSON format that's why JSON.parse used
  // localstorage stored vlaue in key-value format
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) // fetched by key "todos"

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  },[])

  // useEffect for when we add new todos it will add it in localstorage also
  // localStorage storges in String format so we used JSON.stringify
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])


  return (
    <TodoProvider value={{todos, addTodo, updatedTodo, deleteTodo, toggleComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                          todos.map((todo)=> (
                            <div key={todo.id}
                            className='w-full'>
                              <TodoItem todo={todo} />
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
