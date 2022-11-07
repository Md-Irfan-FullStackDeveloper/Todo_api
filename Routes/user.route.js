const { Router } = require("express");
const {
  getAllUsers,
  userSignup,
  userLogin,
} = require("../Controllers/userController");

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

module.exports = {
  userRouter,
};
