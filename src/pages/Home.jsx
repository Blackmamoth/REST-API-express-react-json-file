import { useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";

const Button = ({ setShowForm }) => {
  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        setShowForm(false);
      }}
    >
      Close
    </button>
  );
};

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [todo, setTodo] = useState({});

  const getTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      <table className="table mb-4">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Todo item</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            return (
              <tr key={todo.id}>
                <th scope="row">{index + 1}</th>
                <td>{todo.title}</td>
                <td>{todo.complete ? "Complete" : "Incomplete"}</td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ms-1"
                    onClick={() => {
                      setShowForm(true);
                      setTodo(todo);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showForm && (
        <UpdateTodo todo={todo} getTodos={getTodos} setShowForm={setShowForm} />
      )}
      {showForm && <Button setShowForm={setShowForm} />}
    </div>
  );
};

export default Home;
