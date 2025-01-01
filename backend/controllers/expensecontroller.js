const expensemodel = require('../models/expenseschema');

exports.createexpenses = async (req, res) => {
    try {
        const {amount, category, date, note } = req.body;

        // Create a new expense
        const newExpense = expensemodel.create({
            
            amount,
            category,
            date,
            note,
            userId:req.user.id,  //getting from auth middleware
        });
        
        res.status(201).json({
            message: 'Expense created successfully',
    });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating expense',
            error: error.message,
        });
    }
};

exports.getSingleexpenses = async (req, res) => {

    try{
    const id=req.params.id
        const expenses = await expensemodel.find({userId:id}).populate({path:'userId',select:'name'});//fetching expenses of a particular user from the database
        res.status(200).json({expenses:expenses});
    }catch(error){
        res.status(500).json({ message: "An error occurred while fetching expenses." });
    }
}

exports.getallexpenses=async(req,res)=>{
    try{
        const expenses=await expensemodel.find({})
        res.status(200).json({
            expenses:expenses
        })
        
    }catch(error){
        res.status(500).json({
            message:"An error occurred while fetching expenses"
        })
    }
}

exports.updateexpenses=async(req,res)=>{
    try{
        const {id}=req.params
        const {amount, category, date, note}=req.body;

        const updateexpense=await expensemodel.findByIdAndUpdate(id,{amount, category, date, note})
        res.status(200).json({
            message:"Expense updated successfully",
            updateexpense:updateexpense
        })
        
    }catch(error){
        res.status(500).json({
            message:"An error occurred while updating the expense"
        })
    }

}

exports.deleteexpenses=async(req,res)=>{
    try{
        const {id}=req.params.id
       const deleteexpenses= await expensemodel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Expense deleted successfully",
            deleteexpenses:deleteexpenses
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            messsage:"Error in deleting the expense"

        })
    }
}