const Employee = require("../models/employee");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI1";

const addUser = async (req, res) => {
  // existing user check
  // hashed password
  // user creation
  // token generation

  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    role,
    department,
    salary,
  } = req.body;
  try {
    const existingUser = await Employee.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Employee.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      userName: userName,
      role: role,
      department: department,
      salary: salary,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY); 
    // result.token = token;
    await result.save();
    res.status(201).json({
      Employee: result,token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Employee.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "employee not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );

    await existingUser.save();
    res.status(201).json({ token: 

      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getSpecificId = async (req, res, user) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      department,
      salary,
    } = req.body;
    const id = req.params.id;
    console.log(id);
    const data = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
          userName,
          email,
          password,
          role,
          department,
          salary,
        },
      },
      { new: true }
    );
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const user = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addUser,
  signin,
  updateEmployee,
  getSpecificId,
  deleteEmployee
};
