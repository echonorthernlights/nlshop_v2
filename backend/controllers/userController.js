import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//@desc auth user + get token
//@route POST api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Incorrect Email or Password");
  }
});

//@desc register user
//@route POST api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists !");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data !");
  }
});

//@desc logout user + clear cookie
//@route POST api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully !" });
});

//@desc get user profile
//@route POST api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found !");
  }
});

//@desc update user profile
//@route PUT api/users
//@access Private
const updateUserPofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found !");
  }
});

//@desc get users
//@route GET api/users
//@access Private/Admin
const getUsers = asyncHandler((req, res) => {
  res.send("get users");
});

//@desc delete user
//@route DELETE api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler((req, res) => {
  res.send("delete user");
});

//@desc get user by id
//@route GET api/users/:id
//@access Private/Admin
const getUserById = asyncHandler((req, res) => {
  res.send("get user by id");
});

//@desc update user
//@route PUT api/users:id
//@access Private/Admin
const updateUser = asyncHandler((req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserPofile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
