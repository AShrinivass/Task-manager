import React, { useState, useEffect } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") return;
    setTodos([...todos, { text: todo }]);
    setTodo("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(todos[index].text);
  };

  const handleSave = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, text: editValue } : item
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Todo List</h1>

      <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
        <input
          value={todo}
          type="text"
          placeholder="Enter your todo"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="space-y-4">
        {todos.map((item, index) =>
          index === editingIndex ? (
            <div key={index} className="flex space-x-2">
              <input
                className="border border-blue-200 text-black flex-grow"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button
                onClick={() => handleSave(index)}
                className="bg-blue-200 px-4 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <span className="text-gray-700">{item.text}</span>
              <div className="space-x-4">
                <button
                  className="text-yellow-500 hover:text-yellow-700 transition duration-200"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Todo;
