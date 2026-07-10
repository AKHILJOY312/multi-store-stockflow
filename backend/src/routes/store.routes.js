import { Router } from "express";

import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import validate from "../middleware/validate.middleware.js";

import storeController from "../controllers/store.controller.js";
import { storeValidator } from "../validators/store.validator.js";

const router = Router();

router.post(
  "/",
  auth,
  admin,
  storeValidator,
  validate,
  storeController.createStore,
);

router.get("/", auth, storeController.getStores);

export default router;
