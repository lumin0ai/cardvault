import { registerUser, loginUser } from "./auth.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

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
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};
