const express = require("express");
const {addDepartment,User} = require ("../controller/department");
const {checkRoles} = require("../middleware/middleware");


const departmentRouter = express.Router();

departmentRouter.post("/addDepartment",addDepartment);

departmentRouter.get("/:id/user",checkRoles,User);

module.exports = departmentRouter;