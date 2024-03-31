// const mongoose = require("mongoose");

// const Users = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       require: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     contact: {
//       type: String,
//       required: true,
//     },
//     driversLicense: {
//       type: String,
//       require: false,
//     },
//   },
//   {
//     timestamp: true,
//   }
// );

// module.exports = mongoose.model("Users", Users);

const mongoose = require("mongoose");
const User = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    emergencyContact: {
      name: {
        type: String,
        required: false,
      },
      mobile: {
        type: String,
        required: false,
      },
      relation: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", User);
