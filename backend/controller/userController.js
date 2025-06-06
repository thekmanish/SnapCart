import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import users from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Login User
const authUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!password || !email) {
    return next(new CustomError("Please enter email and password", 400));
  }
  const correctUserData = await users.findOne({ email });
  if (!correctUserData) {
    return next(new CustomError("Incorrect credentials please try again", 400));
  }

  let isValidPassword = await bcrypt.compare(
    password,
    correctUserData.password
  );

  if (!isValidPassword) {
    return next(new CustomError("Invalid password", 400));
  }

  const jwtToken = await jwt.sign(
    { _id: correctUserData._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );

  res.status(200).json({
    user: correctUserData,
    token: jwtToken,
  });
});

//Register User
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return next(new CustomError("All fields are mandatory", 400));
  }
  const isExisting = await users.findOne({ email });
  if (isExisting) {
    return next(new CustomError("User already exists", 401));
  }
  let newUser = await users.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
  });
});

//Logout User
const logout = asyncHandler((req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  res.status(200).json({
    success: true,
  });
});

//Update Profile
const updateProfile = asyncHandler(async (req, res, next) => {
  if (!req.body.name && !req.body.email && !req.body.phone) {
    return next(new CustomError("Modify at least a new field"));
  }
  const newUserDetails = await users.findByIdAndUpdate(req.loggedInUser._id, {
    name: req.body.name || req.loggedInUser.name,
    email: req.body.email || req.loggedInUser.email,
    phone: req.body.phone || req.loggedInUser.phone,
  });
  res.status(200).json({
    success: true,
  });
});

//Delete Account
const deleteAccount = asyncHandler(async (req, res, next) => {
  if (!req.body.password) {
    return next(
      new CustomError("Please enter your password to delete account")
    );
  }
  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    req.user.password
  );
  if (!isCorrectPassword) {
    return next(new CustomError("Enter correct password", 404));
  }
  let user = await users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    success: true,
  });
});

//Check Auth
const checkAuth = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      userDetails: req.loggedInUser,
    });    
  } catch (error) {
    res.status(500).json(error.message)
  }
});

//Exporting all the functions
export { authUser, logout, register, updateProfile, deleteAccount, checkAuth };
