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
