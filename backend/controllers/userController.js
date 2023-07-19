import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

//@desc auth user + get token
//@route POST api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

//@desc register user
//@route POST api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//@desc logout user + clear cookie
//@route POST api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//@desc get user profile
//@route POST api/users/profile
//@access Private
const getUserProfile = asyncHandler((req, res) => {
  res.send("get user profile");
});

//@desc update user profile
//@route PUT api/users
//@access Private
const updateUserPofile = asyncHandler((req, res) => {
  res.send("update user profile");
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
