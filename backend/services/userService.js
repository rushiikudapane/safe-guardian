const userRepository = require("../repositories/userRepository");

const getUserService = async (reqBody) => {
  try {
    const response = await userRepository.getUser(reqBody);
    return response;
  } catch (err) {
    console.log(err);
    return { message: "Error occured while fetching Users" };
  }
};

const registerUserService = (reqBody) => {
  const { fullName, gender, email, phoneNumber, username, password } = reqBody;
  try {
    userRepository.registerUser(
      fullName,
      gender,
      email,
      phoneNumber,
      username,
      password
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { getUserService, registerUserService };
