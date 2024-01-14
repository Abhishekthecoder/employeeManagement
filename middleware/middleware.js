const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");
const SECRET_KEY = "NOTESAPI1";

const checkRoles = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    console.log(req.headers);
    if (!token)
    return res.status(401).json({ message: 'Unauthorized' });
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      let user = jwt.verify(token, SECRET_KEY);
      console.log(user);
      req.user = user;

      const userData = await Employee.findOne({ _id:user.id });
      
      if (userData.role === "admin") {
       next();
      
      } else {if (userData.role === "user" && user.id === req.params.id) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized user" });
      }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const attendanceRoles = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    console.log(req.headers);
    if (!token)
    return res.status(401).json({ message: 'Unauthorized' });
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      let user = jwt.verify(token, SECRET_KEY);
      console.log(user);
      req.user = user;

      const userData = await Employee.findOne({ _id:user.id });
      
      if (userData.role === "admin") {
       next();
      
      } else {if (userData.role === "user" && user.id === req.params.id) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized user" });
      }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};



module.exports = {checkRoles,attendanceRoles};
