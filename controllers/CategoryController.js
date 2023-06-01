const Category = require("../models/Category");


// create category

const createCategory = async (req,res) => {
    // find if category already exist
    
    let category = await Category.findOne({categoryName:req.body.categoryName.toLowerCase()});

    if(category == null){
         
        await Category.create({
            categoryName:req.body.categoryName.toLowerCase()
        });

        res.json({
            success:true,
            message:'category created successfully!'
        })
    }else{
        res.json({
            success:false,
            message:'this category is already exist!'
        })
    }
}

const getAllCategories = async (req,res)=>{

    let categories= await Category.find({});

    res.json({
        success:false,
        message:'categories fetcehd successfully!',
        data:categories
    })
}

const updateCategory = async (req,res) => {
     
     await Category.findByIdAndUpdate(req.body.id,{
        categoryName:req.body.categoryName.toLowerCase()
     });

    res.json({
        success:true,
        message:'category updated successfully!'
    });
}

const deleteCategory = async (req,res) => {

    await Category.findByIdAndDelete(req.params.id);

    res.json({
        success:true,
        message:'category deleted successfully!'
    });

}



module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}