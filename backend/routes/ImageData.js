const router = require("express").Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");

const upload = multer({ dest: "uploads/" });

router.post("/detect", upload.single("image"), (req, res) => {
  console.log("Images reached to sever!!!!");

  const imageFile = req.file;
  console.log("Image file: ", imageFile);

  const imageFilePath = req.file.path;

  const testData = {
    image: {
      data: require("fs").readFileSync(imageFilePath), // Read the file data
      contentType: req.file.mimetype, // Include the file's MIME type
      filename: req.file.originalname, // Include the file's original name
    },
  };

  console.log("Data sent to flask: ", testData);

  axios
    .post("http://127.0.0.1:3000/predict", {
      // Send the file data as the request body
      image: {
        data: require("fs").readFileSync(imageFilePath), // Read the file data
        contentType: req.file.mimetype, // Include the file's MIME type
        filename: req.file.originalname, // Include the file's original name
      },
    })
    .then((response) => {
      console.log("Server response:", response.data);
      res.status(200).send(response.data); // Send the Flask server's response back to the client
    })
    .catch((error) => {
      console.error("Error while sending data:", error.message);
      res.status(500).send("Internal server error"); // Handle errors
    });
});

module.exports = router;
