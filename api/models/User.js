const mangoose = require("mangoose");
const userSchema = new mangoose.Schema(
  {
    username: {type:String, unique: true},
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mangoose.model("User", userSchema);
