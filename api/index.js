const express = require("express");
require("dotenv").config();
require("mangoose").connect(mongoUrl);
const User = require("./models/User");

console.log(process.env.MONGO_URL);

const mongoUrl = process.env.MONGO_URL;

const app = express();

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({ username, email, password });
  res.json({ username, email, password });
});

app.listen(3030, () => console.log("Server started on port 3030"));
