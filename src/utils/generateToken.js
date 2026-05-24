import jwt from "jsonwebtoken";

const getTokenPayload = (user) => {
  if (typeof user === "object" && user !== null) {
    return {
      id: user._id?.toString?.() || user.id,
      tokenVersion: user.tokenVersion ?? 0,
    };
  }

  return {
    id: user,
    tokenVersion: 0,
  };
};

export const generateAccessToken = (user) => {
  return jwt.sign(getTokenPayload(user), process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign(getTokenPayload(user), process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "90d",
  });
};
