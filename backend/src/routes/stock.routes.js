import { Router } from "express";

import auth from "../middleware/auth.middleware.js";
import stockController from "../controllers/stock.controller.js";

const router = Router();

router.get("/", auth, stockController.getStock);

export default router;
