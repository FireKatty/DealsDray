const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const multer = require('multer');
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey = "e-empolyee";
app.use(express.json());
app.use(cors());

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Dealsdray', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const employeeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  mobile: String,
  designation: String,
  gender: String,
  courses: [String],
  createDate: { type: Date, default: Date.now }
});

const loginSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password:String

});

const Userid = mongoose.model('t_user',loginSchema);

const Employee = mongoose.model('t_employees', employeeSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/signup",async(req,res)=>{
    let user = new Userid(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    console.warn(result)
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
      if (err){
        res.send({user:"Please try after sometime"})
      }
      res.send({result,auth:token})
    })
    
    // res.send(result)
    
});

app.post("/login",async(req,res)=>{
    if (req.body.password && req.body.email){
      console.log(req.body)
      let user = await Userid.findOne(req.body).select("-password");
      if (user){
        Jwt.sign( {user}, jwtKey,{expiresIn:"2h"},(err,token)=>{
          if (err){
            res.send({result:"Please try after some time"})
          }
          res.send({user,auth:token})
        })
      }
        
        // res.send(user)
      }

});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/create', verifytoken,upload.single('file'), async (req, res) => {
  try {
  
    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      courses: req.body.courses,
      file: req.file.path 
    });

  
    await newEmployee.save();

    
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/list',verifytoken,async(req,res)=>{
    let result = await Employee.find();
    if (result.length>0){
    res.send(result)
    }
    else{
        res.send({result:"Not Found"})
    }
});


app.put('/update/:id', verifytoken,async (req, res) => {
  // const { id } = req.params;
  const { name, email, mobile, designation, gender, courses } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate({_id:req.params.id}, {
      name,
      email,
      mobile,
      designation,
      gender,
      courses
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/delete/:id',verifytoken, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee by ID and delete them
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/data/:id',verifytoken, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    console.log(employee)
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function verifytoken(req,res,next) {
  let token = req.headers['authorization']
  if (token){
    // token = token.split(' ')[1]
    Jwt.verify(token,jwtKey,(err,valid)=>{
      if (err){
        res.status(401).send({result:"Please provide valid token"})
      }
      next();
    })
  }else{
    res.status(403).send({result:'Please provide'})
  }

}






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
