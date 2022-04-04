let todos = require("../data/data.json");
const { writeToFile } = require("../utils");
const { v4: uuid } = require("uuid");

const getTodos = () => {
  return new Promise((resolve, reject) => {
    resolve(todos);
  });
};

const getTodo = (id) => {
  return new Promise((resolve, reject) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      resolve(todo);
    } else {
      reject(`Todo with id ${id} not found`);
    }
  });
};

const addTodo = (todoObj) => {
  return new Promise((resolve, reject) => {
    const newTodoObj = { id: uuid(), ...todoObj, complete: false };
    todos.push(newTodoObj);
    writeToFile(todos);
    resolve(newTodoObj);
  });
};

const updateTodo = (todoObj, id) => {
  return new Promise((resolve, reject) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index] = { id, ...todoObj };
    writeToFile(todos);
    resolve(todos);
  });
};

const removeTodo = (id) => {
  return new Promise((resolve, reject) => {
    todos = todos.filter((todo) => todo.id !== id);
    writeToFile(todos);
    resolve(todos);
  });
};

module.exports = { getTodos, getTodo, addTodo, updateTodo, removeTodo };
