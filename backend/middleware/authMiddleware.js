import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read jwt from cookie
});
