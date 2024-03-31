const { register, login } = require("../controllers/authController");

const router = require("express").Router();

const multer = require("multer");

// configuration for multer to enable file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // stora uploaded files in the uploads folder NB: ensure you create this folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);

module.exports = router;
