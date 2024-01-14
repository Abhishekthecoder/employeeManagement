const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    userid:{
      type : mongoose.Schema.Types.ObjectId, ref: "Employee" ,

    }
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);