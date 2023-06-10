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

const { 
  login
} = require("../controllers/AuthController");

const { 
  updateUserProfile
} = require("../controllers/ProfileController");

const { 
  publish,
  unpublish,
  approvedByAdmin
} = require("../controllers/PublishController");

const { 
  restlink,
  ForgotPassword
} = require("../controllers/ForgotPasswordController");

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
router.post("/store/category",authToken,createCategory);
router.get("/get/categories",getAllCategories);
router.post("/update/category",authToken,updateCategory);
router.get("/delete/category/:id",authToken,deleteCategory);

// users routes
router.post("/register/user",createUser);
router.get("/get/users",authToken,getAllUsers);
router.get("/get/user/:id",authToken,getUserById);
router.post("/update/user",authToken,updateUser);
router.get("/delete/user/:id",authToken,deleteUser);

// posts routes
router.post("/create/post",upload.single("image"),createPost);
router.get("/get/posts",getAllPosts);
router.get("/get/post/:id",getPostById);
router.post("/update/post/:id",upload.single("image"),updatePost);
router.get("/delete/post/:id",authToken,deletePost);    

// auth routes
router.post("/user/login",login);

// update user profile
router.post("/update/user/profile/:id",upload.single("image"),updateUserProfile);

// post publish

router.get("/publish/post/:id",publish);
router.get("/unpublish/post/:id",unpublish);
router.get("/post/approved/:id",approvedByAdmin);


// send mail route
router.post("/send-rest-link",restlink);
router.post("/forgot/password",ForgotPassword);
module.exports = router;