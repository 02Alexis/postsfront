import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image_url: String,
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;