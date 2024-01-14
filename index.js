const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Employee = require("./models/employee");
const Department = require("./models/department");
const { addUser, signin, updateEmployee } = require("./controller/employee");
const {addDepartment} =require("./controller/department");
const bcrypt = require("bcrypt");
const employeeRouter = require("./routes/employeeRoutes");
const departmentRouter = require("./routes/department");
const SECRET_KEY = "NOTESAPI1";

const url = "mongodb://127.0.0.1:27017/employee";

const app = express();
app.use(express.json()); // for parsing application/json
app.use("/employee",employeeRouter);
app.use("/department",departmentRouter);
app.use(express.urlencoded({ extended: true }));



mongoose
  .connect(url)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
