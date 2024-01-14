const jwt = require("jsonwebtoken");
const Attendance = require("../models/attendance");
const Employee = require("../models/employee");
const moment = require("moment");
const SECRET_KEY = "NOTESAPI1";


const attendanceLogin = async (req, res) => {
  try {
    
    const loginAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(loginAt);
    const onlyDate = moment(loginAt, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
    console.log(onlyDate);
    let token = req.headers.authorization;
    console.log(token);
    if(token){
        token = token.split(" ")[1];
        console.log(token);
        let user = jwt.verify(token,SECRET_KEY);
        
        console.log(user);
        req.user = user;
        console.log(user.id);
        const userId = user.id;

    const existingAttendance = await Attendance.findOne({
      userId,
    }).sort({loginAt:-1});
    
    console.log(existingAttendance);
    
    
    console.log(loginAt);

    console.log(onlyDate);
    if (existingAttendance) { 
      const loginDate = moment(existingAttendance.loginAt, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
    console.log(loginDate);
      if (onlyDate === loginDate) { 
        res.status(200).json({message:"you have already logged in"})
      } 
     
      else{ 
        
          const newAttendance = await Attendance.create({
            userId : user.id ,
            loginAt : loginAt
            })  

      return res.status(200).json({message:"you logged in successfully"})
    }
  }

    if (!existingAttendance) {
      
    await Attendance.create({
      userId : user.id ,
      loginAt : loginAt
      });

      return res.status(400).json({message:"you logged in successfully"});
    }

    } }catch (error) {
      res.status(500).json({ message :error.message});
    };
  };

const attendanceLogout =  async (req, res) => {
  try {

    const logoutAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    let token = req.headers.authorization;
    console.log(token);
    if(token){
      token = token.split(" ")[1];
      console.log(token);
      let user = jwt.verify(token,SECRET_KEY);
      console.log(user);
      req.user = user;
      console.log(user.id);
      const userId = user.id;
      console.log(userId);

    
    const latestLogin = await Attendance.findOne({ userId }).sort({ loginAt: -1 });
    console.log(latestLogin);
    if (!latestLogin) {
      return res.status(400).json({ message: 'User has not logged in today' });
    }

    const onlyDate = moment(logoutAt, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
    console.log(onlyDate);

    const loginDate = moment(latestLogin.loginAt, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
    console.log(loginDate);

    const logoutDate = moment(latestLogin.logoutAt, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
    console.log(logoutDate);
 
   
    if (latestLogin.logoutAt) {
      if (onlyDate === logoutDate) {
        res.status(200).json({message:"you have already logged out"})
      } else {
        return res.status(400).json({ message: 'you cannot logout now' });
      } 
    }

    if (!latestLogin.logoutAt) {
      if (loginDate===onlyDate) {
        await Attendance.findByIdAndUpdate(latestLogin._id, { logoutAt });

    res.json({ message: 'you logged out successfully' });
      }else{
        return res.status(400).json({ message: "You can only logout after your last LogIn." })
      }
    }
     
  }} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const attendanceList = async(req,res)=>{
  try {
    const userId = req.params.id;
    console.log(req.query);
    console.log(userId);
    const { page, limit } = req.query;
    const skip = (page - 1) * 3;
    const employee = await Attendance.find({userId}).skip(skip).limit(limit);
    console.log(employee);
    res.status(200).json({employee}); 
  } catch (error) {
    res.status(500).json({message:error.message})
  }

}

const attendance = async(req,res)=>{
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
    console.log(userData.id);
    const userId = userData.id;
    console.log(userId);
    const { page, limit } = req.query;
    const skip = (page - 1) * 3;
    const employee = await Attendance.find({userId}).skip(skip).limit(limit);
    console.log(employee);
    res.status(200).json({employee});
  }} catch (error) {
    res.status(500).json({message:error.message})
  }

}


module.exports = {attendanceLogin,attendanceLogout,attendanceList,attendance};