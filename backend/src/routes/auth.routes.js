import { Router } from "express";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import validate from "../middleware/validate.middleware.js";
import authController from "../controllers/auth.controller.js";
const router = Router();

router.post(
  "/register",

  registerValidator,
  validate,
  authController.register,
);

router.post("/login", loginValidator, validate, authController.login);

export default router;
