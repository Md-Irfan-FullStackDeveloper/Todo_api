const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = {
  TodoModel,
};
