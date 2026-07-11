import { Router } from "express";

import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import validate from "../middleware/validate.middleware.js";

import productController from "../controllers/product.controller.js";
import { productValidator } from "../validators/product.validator.js";

const router = Router();

router.post(
  "/",
  auth,
  admin,
  productValidator,
  validate,
  productController.createProduct,
);

router.get("/", auth, productController.getProducts);

export default router;
