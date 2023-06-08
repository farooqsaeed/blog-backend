const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/Auth")
const { 
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory 
} = require("../controllers/CategoryController");

const { 
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/UserController");

const { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/PostController");

const multer = require("multer");
/**-----------------upload file start--------------------- **/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload/");
    },
    filename: function (req, file, cb) {
      var datetime = Date.now();
      cb(null, datetime+"-" + file.originalname);
    },
});
var upload = multer({ storage: storage });
/**-----------------upload file end--------------------- **/

// category routes
router.post("/store/category",createCategory);
router.get("/get/categories",getAllCategories);
router.post("/update/category",updateCategory);
router.get("/delete/category/:id",deleteCategory);

// users routes
router.post("/register/user",createUser);
router.get("/get/users",getAllUsers);
router.get("/get/user/:id",getUserById);
router.post("/update/user",updateUser);
router.get("/delete/user/:id",deleteUser);

// posts routes
router.post("/create/post",upload.single("image"),createPost);
router.get("/get/posts",getAllPosts);
router.get("/get/post/:id",getPostById);
router.post("/update/post",updatePost);
router.get("/delete/post/:id",deletePost);
    
    

module.exports = router;