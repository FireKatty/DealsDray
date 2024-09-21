const  mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: String,
    email: { type: String}, // Ensure email is unique
    mobile: String,
    designation: String,
    gender: String,
    courses: [String],
    image: String,
    createDate: { type: Date, default: Date.now }

});

const Employee = mongoose.model("t_employee",employeeSchema);
module.exports = Employee;























// const employeeSchema = new mongoose.Schema({
//     f_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     f_Name: String,
//     f_Email: { type: String, unique: true }, // Ensure email is unique
//     f_Mobile: String,
//     f_Designation: String,
//     f_Gender: String,
//     f_Courses: [String],
//     f_Image: String,
//     f_CreateDate: { type: Date, default: Date.now }
// });

// const Employee = mongoose.model('t_employees', employeeSchema);
// module.exports = Employee;
  