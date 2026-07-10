import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    ENV.JWT.SECRET,
    { expiresIn: ENV.JWT.EXPIRES_IN },
  );
};
export default generateToken;
