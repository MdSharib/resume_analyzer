import mongoose from "mongoose";

//defining schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } 
);

export default mongoose.model("users", userSchema);
