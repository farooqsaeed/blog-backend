const express = require("express");
const router = express.Router();
const { 
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory 
} = require("../controllers/CategoryController");

// category routes
router.post("/store/category",createCategory);
router.get("/get/categories",getAllCategories);
router.post("/update/category",updateCategory);
router.get("/delete/category/:id",deleteCategory);


module.exports = router;