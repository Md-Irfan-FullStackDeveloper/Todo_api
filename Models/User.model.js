const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: "todo" }],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
