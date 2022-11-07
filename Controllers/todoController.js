const { TodoModel } = require("../Models/Todo.model");
const mongoose = require("mongoose");
const { UserModel } = require("../Models/User.model");

const getAllTodos = async (req, res) => {
  let allTodos;

  try {
    allTodos = await TodoModel.find();
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (allTodos) {
    return res.status(200).json({ allTodos });
  }

  return res.status(400).json({ msg: "todos not found" });
};

const addTodos = async (req, res) => {
  const { taskname, status, tag, user } = req.body;
  const todo = new TodoModel({
    taskname,
    status,
    tag,
    user,
  });
  let userExist;

  try {
    userExist = await UserModel.findById(user);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!userExist) {
    return res.status(400).json({ msg: "user not found" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await todo.save({ session });
    userExist.todos.push(todo);
    await userExist.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  return res.status(200).json({ msg: "Todo addes successfull" });
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  let todo;

  try {
    todo = await TodoModel.findById(id);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!todo) {
    return res.status(400).json({ msg: "todo not found" });
  }

  return res.status(200).json({ todo });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { taskname, status, tag } = req.body;
  let todo;

  try {
    if (taskname && status && tag) {
      todo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          taskname,
          status,
          tag,
        }
      );
    } else if (taskname && status) {
      todo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          taskname,
          status,
        }
      );
    } else if (taskname && tag) {
      todo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          taskname,
          tag,
        }
      );
    } else if (taskname) {
      todo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          taskname,
        }
      );
    } else if (status) {
      todo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          status,
        }
      );
    } else {
      todo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          tag,
        }
      );
    }
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  return res.status(200).json({ todo });
};

const deletTodo = async (req, res) => {
  const { id } = req.params;
  let todo;

  try {
    todo = await TodoModel.findByIdAndDelete({ _id: id }).populate("user");
    await todo.user.todos.pull(todo);
    await todo.user.save();
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!todo) {
    return res.status(400).json({ msg: "todo delete unsuccess" });
  }

  return res.status(200).json({ msg: "todo successfully deleted" });
};

module.exports = {
  getAllTodos,
  addTodos,
  getTodoById,
  deletTodo,
  updateTodo,
};
