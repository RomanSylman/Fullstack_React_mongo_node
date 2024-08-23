const express = require("express");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();
require("mangoose").connect(mongoUrl);

console.log(process.env.MONGO_URL);

const mongoUrl = process.env.MONGO_URL;

const app = express();

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const createdUser = await User.create({ username, email, password });
  jwt.sign(
    { userId: createdUser._id },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json("success");
    }
  );
});

app.listen(3030, () => console.log("Server started on port 3030"));
