// doctor route module.
var express = require('express');
const Doctor = require('./doctorModel');
const { login } = require('./doctorcontroller');
const { validateData, verifyToken } = require('./middlewares')

var doctorRouter = express.Router();



doctorRouter.get('/about',  async (req,res,next)=>{
  
  res.send("hello");
})

// get all doctors.
doctorRouter.get('/',  async (req,res,next)=>{
  const doctors = await Doctor.find();
  res.send(doctors);
})

//create user
doctorRouter.post('/' ,async (req,res,next)=>{
  const { username, password,specialty,location,price ,waiting,phone} = req.body;
  try {    
      const doctor = new Doctor({username, password,specialty,location,price ,waiting,phone});
      const createdDoctor = await doctor.save();
      res.send(createdDoctor);
  } catch (error) {
      error.statusCode = 500;
      next(error);
  }
});

//login user
doctorRouter.post('/login' ,validateData , login);

//profile
doctorRouter.get('/profile',verifyToken ,async (req,res,next)=>{
    const doctor = req.doctor
    console.log(doctor._id);
    const filterdDoctor= await  Doctor .findById(doctor._id);
    console.log(filterdDoctor);
    res.send(filterdDoctor);
});




/*
doctor.get("/", async (request, response) => {
  
    try {
        const doctors = await doctorData.find({});
      response.send( doctors);
    } catch (error) {
      error.status=500;
      next(error);
    }
  });


doctor.get("/:id",async (request, response) => {
    

  
  try {
    const filterdDoctor= await doctorData.findById(request.params['id']);
    response.send( filterdDoctor);
  } catch (error) {
    error.status=500;
    next(error);
  }
});

doctor.patch('/:id',async (request, response) => {
    
    
    try {
        const filterdDoctor= await doctorData.findByIdAndUpdate(request.params['id'],{"name":request.body.name});
        response.send( filterdDoctor);
      } catch (error) {
        error.status=500;
        next(error);
      }

});

doctor.delete('/:id',async (request, response) => {
   
    try {
        await doctorData.findByIdAndRemove(request.params.id);
        response.send( "Delete done");
      } catch (error) {
        error.status=500;
        next(error);
      }

});
*/
module.exports = doctorRouter;