const express = require("express");
const connection = require("./Config/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./Routes/user.route");
const { todoRouter } = require("./Routes/todo.route");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Welcome to api homepage");
});

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successful");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to db");
  }
});
