import { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Add a new task..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
