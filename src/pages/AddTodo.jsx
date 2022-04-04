import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const postData = async () => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setShowAlert(true);
    } else {
      postData();
      navigate("/");
    }
  };

  return (
    <div>
      {showAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Title cannot be blank
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
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

      <button
        type="submit"
        className="btn btn-primary btn-block mb-4"
        onClick={handleSubmit}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
