const { ObjectId } = require("mongodb");
const Department = require("../models/department");
const employee = require("../models/employee");

const addDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await Department.create({
      name: name,
    });

    await result.save();
    res.status(201).json({ Department: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const User = async (req, res) => {
  try {
    const id = req.params.id;
    const { page, limit } = req.query;
    const skip = (page - 1) * 3;
    const allHr = await employee
      .find({
        department: { _id: id },
      })
      .populate({
        path: "department",
      })
      .skip(skip)
      .limit(limit);
    res.status(200).json(allHr);
  } catch (error) {
    res.status(400).json({ message: "bad request" });
  }
};

module.exports = { addDepartment, User };
