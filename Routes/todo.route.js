const { Router } = require("express");
const {
  getAllTodos,
  addTodos,
  getTodoById,
  deletTodo,
  updateTodo,
} = require("../Controllers/todoController");
const { authentication } = require("../Middleware/authentication");

const todoRouter = Router();

todoRouter.get("/", getAllTodos);
todoRouter.post("/addTodo", addTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.put("/updateTodo", updateTodo)
todoRouter.delete("/:id", authentication, deletTodo);

module.exports = {
  todoRouter,
};
