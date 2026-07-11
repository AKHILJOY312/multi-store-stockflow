import authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      return res
        .status(201)
        .json(new ApiResponse(201, "User Registered successfully", result));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      return res
        .status(200)
        .json(new ApiResponse(200, "Login successful", result));
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
