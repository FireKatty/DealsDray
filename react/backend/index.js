const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const multer = require('multer');
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm";
app.use(express.json());
app.use(cors());

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/Dealsdray', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define Employee schema
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
// create user login model
const Userid = mongoose.model('t_user',loginSchema);

// Create Employee model
const Employee = mongoose.model('t_employees', employeeSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoint to store login details
app.post("/signup",async(req,res)=>{
    let user = new Userid(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    console.warn(result)
    res.send(result)
    // Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
    //     if(err){
    //         res.send({result:"something went wrong"})
    //     }
    //     res.send({result,auth:token})
    // })
});

app.post("/login",async(req,res)=>{
    if (req.body.password && req.body.email){
      console.log(req.body)
        let user = await Userid.findOne(req.body).select("-password");
        res.send(user)}
    //     if (user){
    //         Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
    //             if (err){
    //                 res.send({result:"something went wrong"})
    //             }
    //             res.send({user,auth:token})
    //         })  
    //     }else{
    //         res.send({result:'No user Found'})
    //     }       
    // }
    // else{
    //     res.send({result:'No user found'});
    // }
});





// API endpoint to store employee data
// app.use(bodyParser.json());

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// API endpoint to handle form submission
app.post('/create', upload.single('file'), async (req, res) => {
  try {
    // Create a new employee instance using data from the request body and file path
    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      courses: req.body.courses,
      file: req.file.path // Save file path in database
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Send a success response
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server

// API endpoint to fetch all employee details
// app.get('/list', async (req, res) => {
//   try {
//     // Fetch all employees from the database
//     const employees = await Employee.find();

//     // Send the list of employees as JSON response
//     res.json(employees.);
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



app.get('/list',async(req,res)=>{
    let result = await Employee.find();
    if (result.length>0){
    res.send(result)
    }
    else{
        res.send({result:"Not Found"})
    }
});

// API endpoint to update employee details
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, courses } = req.body;

  try {
    // Find the employee by ID and update their data
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
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

app.delete('/delete/:id', async (req, res) => {
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

app.get('/data/:id', async (req, res) => {
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



  


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
