const UserService = require("../services/userService");

const getUsers = async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);

  const users = await UserService.getUserService(reqBody);
  console.log("user at controller: ", users);
  if (users) {
    if (users.password == reqBody.password) {
      res.status(200).send({ message: "User Logged in!", data: users });
    } else {
      res.status(403).send({ message: "Password did not match, recheck it." });
    }
  } else {
    res.status(404).send({ message: "User does not exist!!!" });
  }
};

// POST req to register new user
const registerUser = (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);

  const result = UserService.registerUserService(reqBody);
  if (result) {
    console.log(result);
    res.status(200).send("User has been registered, Thanks!");
  } else {
    res.status(500).send("Error occured while registering user!!!");
  }
};

module.exports = { getUsers, registerUser };
