import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // -------------------------------
  // Save To Local Storage (CORRECTED)
  // -------------------------------
  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // --------------------------------
  // Load from Local Storage (ONCE)
  // --------------------------------
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  // --------------------------------
  // Handle Add Todo  (CORRECTED)
  // --------------------------------
  const handleAdd = () => {
    if (todo.trim() === "") return;

    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  // --------------------------------
  // Handle Checkbox (CORRECTED)
  // --------------------------------
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // --------------------------------
  // Handle Edit (CORRECTED)
  // --------------------------------
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // --------------------------------
  // Handle Delete (CORRECTED)
  // --------------------------------
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-8">
      <div className="w-full max-w-xl bg-gray-800 p-6 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>

        {/* Input Box */}
        <div className="flex gap-3">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-700 outline-none"
            type="text"
            placeholder="Enter todo..."
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Show Finished Toggle */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
          />
          <label>Show Finished</label>
        </div>

        {/* Todo List */}
        <div className="mt-6 flex flex-col gap-3">
          {todos
            .filter((item) => showFinished || !item.isCompleted)
            .map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={item.id}
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                  />
                  <span
                    className={
                      item.isCompleted
                        ? "line-through text-gray-400"
                        : "text-white"
                    }
                  >
                    {item.todo}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
