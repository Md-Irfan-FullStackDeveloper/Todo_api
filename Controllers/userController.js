const { UserModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  let users;

  try {
    users = await UserModel.find();
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!users) {
    return res.status(400).json({ msg: "User cannot found" });
  }

  return res.status(200).json({ users });
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  let userExist;

  try {
    userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user is already present try to login" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  const hash_password = bcrypt.hashSync(password, 5);
  const newUser = new UserModel({
    name,
    email,
    password: hash_password,
    todos: [],
  });

  try {
    await newUser.save();
    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let userExist;

  try {
    userExist = await UserModel.findOne({ email });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!userExist) {
    return res.status(404).json({ msg: "user not found" });
  }

  const hash_password = userExist.password;
  const compared = bcrypt.compareSync(password, hash_password);

  if (!compared) {
    return res.status(404).json({ msg: "Wrong credentials" });
  }

  const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
  return res.status(200).json({ msg: "Login successfull", token });
};

module.exports = {
  getAllUsers,
  userSignup,
  userLogin,
};
