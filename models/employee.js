const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: {
      type: String,
      required: false,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: false },
    salary:{
      type:Number,
      required:false,
    },
    contactNo: { type: String, required: false },
    employeeCode: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    token:{
      type :String ,
    }
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);