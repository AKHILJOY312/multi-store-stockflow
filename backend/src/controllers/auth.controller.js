import authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      return res
        .status(201)
        .json(new ApiResponse(201, result, "User Registered successfully"));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      return res
        .status(200)
        .json(new ApiResponse(200, result, "Login successful"));
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
