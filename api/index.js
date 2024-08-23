const express = require("express");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const createdUser = await User.create({ username, email, password });
    jwt.sign(
      { userId: createdUser._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).status(201).json({
            _id: createdUser._id,
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
