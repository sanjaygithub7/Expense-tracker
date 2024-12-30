const mongoose=require('mongoose')

const connectdatabase=async()=>{
 await mongoose.connect('mongodb://localhost:27017/expense-tracker')
 .then((con)=>{
    console.log("Mongodb connected to host:",con.connection.host)
 })
}

module.exports=connectdatabase