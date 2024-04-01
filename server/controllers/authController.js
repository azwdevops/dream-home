const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// register user
module.exports.register = async (req, res, next) => {
  try {
    // take all the information from the req.body
    const { firstName, lastName, email, password } = req.body;
    // get the uploaded file, note we use req.file since we are using upload multer middleware see authRoutes
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }
    // path to the uploaded profile photo
    const profileImagePath = profileImage.path;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "This email is already taken" });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // save the new user
    await newUser.save();

    // send a success message
    res.status(201).json({ message: "Registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // validate password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // generate jwt token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    // since we want to choose the fields we want to exclude, we make another call to get user so that we can select the fields
    const user = await User.findById(existingUser._id).select(
      "-password -tripList -wishList -propertyList -reservationList"
    );
    console.log(user);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
