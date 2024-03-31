const router = require("express").Router();
const UserController = require("../controllers/UserController");

// get method call to retrive user info
router.route("/getUser").post(UserController.getUsers);

router.route("/register").post(UserController.registerUser);

module.exports = router;
