import React, { useEffect, useState } from "react";

const UpdateTodo = ({ todo, getTodos, setShowForm }) => {
  const [title, setTitle] = useState(todo.title);
  const [complete, setComplete] = useState(todo.complete);

  useEffect(() => {
    setTitle(todo.title);
    setComplete(todo.complete);
  }, [todo]);

  const updateTodo = async () => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, complete }),
    });
  };

  const handleSubmit = () => {
    if (title === "") {
      alert("Title cannot be blank");
    } else {
      updateTodo();
      getTodos();
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="form-outline mb-4">
        <label className="form-label h2" htmlFor="form3Example3">
          Todo Title
        </label>
        <input
          type="text"
          id="form3Example3"
          className="form-control border-dark"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-outline mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          checked={complete}
          onChange={(e) => {
            setComplete(e.target.checked);
          }}
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          <span className="ms-2">Complete</span>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block mb-4"
        onClick={handleSubmit}
      >
        Update Todo
      </button>
    </div>
  );
};

export default UpdateTodo;
