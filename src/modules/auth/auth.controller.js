import {
  registerUser,
  loginUser,
  refreshAccessTokenService,
  logoutService,
} from "./auth.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "zod";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(201).json({
    message: "User registered successfully",
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Login successfully",
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const user = await refreshAccessTokenService(refreshToken);

  const accessToken = generateAccessToken(user);

  res.status(200).json({
    success: true,

    accessToken,
  });
});

export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

export const logout = asyncHandler(async (req, res) => {
  await logoutService(req.user._id);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
