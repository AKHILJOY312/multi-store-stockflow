import { Router } from "express";

import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  adjustValidator,
  transferValidator,
} from "../validators/stock .validator.js";
import stockController from "../controllers/stock.controller.js";

const router = Router();

router.get("/", auth, stockController.getStock);

router.post(
  "/adjust",
  auth,
  admin,
  adjustValidator,
  validate,
  stockController.adjustStock,
);

router.post(
  "/transfer",
  auth,
  admin,
  transferValidator,
  validate,
  stockController.transferStock,
);
export default router;
