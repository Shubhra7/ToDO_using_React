import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo)=> {}, // for adding new todo
    updatedTodo: (id, todo)=> {},   // id for which todo and todo for new one
    deleteTodo: (id)=> {},   // id for delete which todo
    toggleComplete: (id)=> {}
})

export const useTodo = ()=>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider