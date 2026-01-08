import jwt from "jsonwebtoken"
import { User } from "../models/usermodel.js"


export const isauth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

