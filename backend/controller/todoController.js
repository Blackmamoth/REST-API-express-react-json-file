const express = require("express");
const app = express();
const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  removeTodo,
} = require("../model/todoModel");
const cors = require("cors");

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/api/todos", async (req, res) => {
  const todos = await getTodos();
  res.status(200).json(todos);
});

app.get("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await getTodo(id);
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/todos", async (req, res) => {
  const { title } = req.body;
  const todoObj = await addTodo({
    title,
  });
  res.status(201).json(todoObj);
});

app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { title, complete } = req.body;
  const todoObj = await updateTodo({ title, complete }, id);
  res.status(200).json(todoObj);
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const todo = await removeTodo(id);
  res.status(202).json(todo);
});

module.exports = { app };
