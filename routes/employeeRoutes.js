const express =require("express");
const {addUser,signin, updateEmployee,getSpecificId, deleteEmployee} = require("../controller/employee");
const {attendanceLogin,attendanceLogout, attendanceList,attendance} = require("../controller/attendance");
const {employeeAuth, userAuth, checkRoles, attendanceRoles, } = require("../middleware/middleware");
const router=express.Router();

const employeeRouter = express.Router();

employeeRouter.post("/addUser",checkRoles,addUser);

employeeRouter.post("/signin",signin);

employeeRouter.get("/getSpecificId/:id",checkRoles,getSpecificId);

employeeRouter.put("/updateEmployee/:id",checkRoles,updateEmployee);

employeeRouter.delete("/deleteEmployee/:id",checkRoles,deleteEmployee);

employeeRouter.post("/attendance/loginAt",attendanceLogin);

employeeRouter.put("/attendance/logoutAt",attendanceLogout);

employeeRouter.get("/attendanceList/:id",attendanceRoles,attendanceList);

employeeRouter.get("/attendanceList",attendance);



module.exports=employeeRouter;