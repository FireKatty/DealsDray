const express = require("express");
const path = require("path");
const Employee = require("../models/employeeList");
const multer = require("multer");
const app = express();



const getData = async(req,res)=>{
    try{
      console.log(req.body)
        const {email}  = req.body
        // Email Validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email format' });
        }
        // Email Duplicate Check
        const existingUser = await Employee.findOne({ email });
        if(existingUser){
            return res.status(400).json({error:'email already exists'});
        }
        //Numeric Validate
        const mobileRegex = /^\d{10}$/;  // Assuming a 10-digit mobile number
        if (!mobileRegex.test(req.body.mobile)) {
          return res.status(400).json({ error: 'Invalid mobile number, must be 10 digits' });
        }
        // 
        const newEmployee = new Employee({
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          designation: req.body.designation,
          gender: req.body.gender,
          courses: req.body.courses,
          image: req.file.filename
        });
    
        await newEmployee.save();
    
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });

      }catch (error){
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    };

};


const fetchData = async(req,res)=>{
    try {
        let result = await Employee.find();
        if (result.length > 0) {
          // Modify the result to include the full URL to the image
          result = result.map(employee => ({
            ...employee._doc, // Spread the existing employee data
            image: employee.image ? `http://localhost:9876/api/data/uploads/${employee.image}` : null // Construct the full image URL
          }));
    
          res.send(result); 
        } else {
          res.send({ result: "Not Found" });
        }
    }catch (error){
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const editData = async(req,res)=>{
    
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
};


const updateData = async(req,res)=>{
    const { name, email, mobile, designation, gender, courses } = req.body;
    const image = req.file.filename

        // Email Validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email format' });
        }
        // Email Duplicate Check
        // const existingUser = await Employee.findOne({ email });
        // if(existingUser){
        //     return res.status(400).json({error:'email already exists'});
        // }
        //Numeric Validate
        const mobileRegex = /^\d{10}$/;  // Assuming a 10-digit mobile number
        if (!mobileRegex.test(req.body.mobile)) {
          return res.status(400).json({ error: 'Invalid mobile number, must be 10 digits' });
        }

    // const image = req.file.filename
        try {
        const updatedEmployee = await Employee.findByIdAndUpdate({_id:req.params.id}, {
        name,
        email,
        mobile,
        designation,
        gender,
        courses,
        image
        }, { new: true });

        if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteData = async(req,res)=>{
    const { id } = req.params;
    console.log(id)
    console.log(req.params)

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
};

module.exports = {getData,fetchData,editData,updateData,deleteData};