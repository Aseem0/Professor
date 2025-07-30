const User = require("../model/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function getUserController(req, res) {
  res.json({
    message: "User Controller is working",
  });
}

async function loginHandleController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "PLease provide all required fields",
    });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const checkPassword = await bcrypt.compare(password, existingUser.password);
  if (checkPassword) {
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.AUTH_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({
      message: "Login Successfully",
      accessToken: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid Credit",
    });
  }
}

async function createUserController(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "PLease provide all required fields",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }

  const encryptPassword = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password: encryptPassword,
  };

  const user = new User(data);
  await user.save();

  res.status(201).json({
    message: "User Created Succesfully",
    user: user,
  });
}

module.exports = {
  loginHandleController,
  createUserController,
  getUserController,
};
