const User  = require("../models/userLogin")
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId)=>{
    const token = jwt.sign( {userId}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    } );
    return token;
};


const signup = async (req, res) => {
    try {
        // console.log(req.body)
      const { fullName, userName, password, confirmPassword } = req.body;
      console.log(confirmPassword)
      // console.log(f_fullName, f_userName, f_pwd, confirmPassword)
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      // Check if the username already exists
      const existingUser = await User.findOne({ userName });
      console.log(userName)
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword)
      // Fetch the last employee and auto-increment the s_no
      const lastEmployee = await User.findOne().sort({ s_no: -1 });
      let newSNo = 1; // Default s_no for first user
  
      if (lastEmployee && lastEmployee.s_no) {
        newSNo = lastEmployee.s_no + 1;
      }
  
      // Create a new user
      const newUser = new User({
        s_no: newSNo,
        fullName,
        userName,
        password: hashedPassword, // Store the hashed password
      });
  
      // Save the user to the database
      await newUser.save();
      console.log(newUser)
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      // Send the response with the new user and token
      res.status(201).json({
        result: newUser,
        auth: token,
      });
    } catch (error) {
      console.error("Error in signup controller", error.message);
      res.status(500).json({
        error: "Internal server error",
      });
    }
};
  
const check_email = async(req,res)=>{
  console.log(req.body)
    const { userName } = req.body;
    // console.log(email)
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
        return res.json({ exists: true });
    }

    return res.json({ exists: false });
}


const login = async(req,res)=>{
    try {
        // console.log(req.body)
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password|| "");
        console.log(user)
        if (!user || !isPasswordCorrect){
            return res.status(401).json({error:"Invalid username or password"})
        }

        const token = generateToken(user._id);
        res.send({result:user,auth:token});
    
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({
            error:"Internal server Error"
        });
    }
}


const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{ maxAge:0 });
        res.status(200).json({message:"Logged out successfully"});
        
    } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({
            error:"Internal server Error"
        });
    }
}

module.exports = {signup,check_email,login,logout};
