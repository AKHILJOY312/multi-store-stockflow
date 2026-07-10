import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import UserModel from "../models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

class AuthService {
  async register(data) {
    const { name, email, password, role } = data;

    const exits = await UserModel.findOne({ email });
    if (exits) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(data) {
    const { email, password } = data;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

export default new AuthService();
