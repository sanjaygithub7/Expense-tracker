const usermodel=require('../models/userschema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  


exports.createuser=async(req,res)=>{
    const { name, email, password,salary} = req.body;
    try{
        const newuser=await usermodel.create({
            name,
            email,
            password,
            salary
         })

        
        console.log(newuser.name,newuser.email)

        res.status(201).json({
            message:"user added successfully",
          
            
        })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "An error occurred while creating the user." });
    }

}

exports.loginuser=async(req,res)=>{

    // Find user in database
    const {email,password}=req.body

    try{
        
        // if the email and password is found and matched then login successful
        const user= await usermodel.findOne({email})
        if(!user){
          return res.status(404).json({
                 message:'User not found'
            })
        }

        if(!password || !email){
            return res.status(400).json({ message: "Please provide an email and password" });
        }

        const validation=await bcrypt.compare(password,user.password)

        if(!validation){
           return res.status(401).json({ message: "Invalid credentials" });
        } 
        
        // genarating JWT token for authentication
        const token=jwt.sign({id:user._id,email:user.email,name:user.name},
                 process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN })

            console.log("User logged in successfully:", user.id);
            console.log(token)

        res.status(200).json({ 
            message: "Login successful", 
            token:token,
            user: { name: user.name, email: user.email }
        })

        // console.log("Response sent to client:", {
        //     message: "Login successful",
        //     token,
        //     user: { name: user.name, email: user.email }
        // });  for verification purpose of jwt working or not


    }catch(error){
        console.log(error)
        console.log("error in finding user credentials")
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
    


}