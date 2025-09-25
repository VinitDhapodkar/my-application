import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
