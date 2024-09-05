const express = require("express");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const bcryptSalt = bcrypt.genSaltSync(10);
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const passed = bcrypt.compareSync(password, user.password);
    if (passed) {
      jwt.sign( { userId: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(200)
          .json({
            id: user._id,
            username: user.username,
            createdAt: user.createdAt,
          });
      });
    } else {
        res.status(400).json("Wrong credentials");
      }
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    jwt.sign(
      { userId: createdUser._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
          });
      }
    );
  } catch (error) {
    if (error) throw error;
  }
});

app.listen(3030, () => console.log("Server started on port 3030"));
