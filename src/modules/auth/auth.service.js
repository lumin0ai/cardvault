import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(401, "User already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 6);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }
  return user;
};

export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.refreshToken != refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }
  return user;
};

export const logoutService = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
