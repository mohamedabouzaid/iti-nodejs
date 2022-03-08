const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
var doctor = require('./module/doctor.js');

require('dotenv').config();

const doctorRouter = require('./module/doctor');


app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/doctors', doctorRouter);


/*
///api to create new todo inside 
  app.post('/Todos', function (req, res) {
    db.push(req.body) ;    
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2),(error)=>{
    if(error){
        res.send("faild")
    }

    });  
    res.send( req.body);
  })

  //api to get all todos with filter for status
  app.get('/Todos', (req, res) => {
    
    const filterd= db.filter(a => a.status == req.query.status);   
    res.send(filterd);

  }) 
//api to get a single todo based on id
  app.get('/Todos/:id', (req, res) => {
    const filterd= db.find(a => a.id == req.params['id']);   
    res.send(filterd);

  })  
//api to edit a single todo based on id
app.put('/Todos/:id', (req, res) => {
    const filterd= db.map((a )=> {if( a.id == req.params['id']){
     Object.assign(a,req.body);
     fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));  
    }});

    res.send("sucess");

  })  



  app.delete('/Todos/:id', (req, res) => {
    const filterd= db.filter(a => a.id = req.params['id']);   
    fs.writeFileSync('./db.json', JSON.stringify(filterd, null, 2));
    res.send(filterd);
    
  })
*/

mongoose.connect('mongodb://localhost:27017/doctor');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



//midleware handler
app.use((err, req, res, next) => {
  res.send({
      status: err.statusCode,
      message: err.message,
      errors: err.errors || []
  });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})