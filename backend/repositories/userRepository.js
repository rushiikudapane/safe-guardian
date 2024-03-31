const userSchema = require("../models/Users");

const getUser = async (reqBody) => {
  const email = reqBody.email;
  const password = reqBody.password;

  const response = await userSchema.findOne({ email });
  console.log("response: ", response);
  if (response) {
    if (response.password == password) {
      return response;
    } else {
      return response;
    }
  } else {
    return response;
  }
};

const registerUser = async (
  fullName,
  gender,
  email,
  phoneNumber,
  username,
  password
) => {
  const newUser = new userSchema({
    fullName,
    gender,
    email,
    phoneNumber,
    username,
    password,
  });

  await newUser.save();
};

module.exports = { getUser, registerUser };
