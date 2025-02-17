import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
    require: true,
    unique: true,
  },
  mobileNumber: {
    type: "string",
    require: true,
  },
  password: {
    type: "string",
    require: true,
  }
}, { timestamps: true });

const User = mongoose.model('User ', userSchema);

export default User; 
