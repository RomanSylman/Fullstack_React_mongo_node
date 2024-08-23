const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {type:String, unique: true},
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
