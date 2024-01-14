const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema(
    {
     "userId":{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
     "loginAt":String,
     "logoutAt": String
    },
    {
      timestamp: true,
    }
  );
  
  module.exports = mongoose.model("Attendance", attendanceSchema);