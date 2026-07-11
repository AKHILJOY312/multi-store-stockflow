import { Router } from "express";

import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import validator from "../middleware/validate.middleware.js";
import { adjustValidator } from "../validators/stock .validator.js";
import stockController from "../controllers/stock.controller.js";

const router = Router();

router.get("/", auth, stockController.getStock);

router.post(
  "/adjust",
  auth,
  admin,
  adjustValidator,
  validator,
  stockController.adjustStock,
);
export default router;
