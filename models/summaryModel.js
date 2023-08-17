import mongoose from "mongoose";


//defining schema
const summarySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

export default mongoose.model("summary", summarySchema); 
