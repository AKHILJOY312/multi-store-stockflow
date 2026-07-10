import { body } from "express-validator";

export const storeValidator = [
  body("name").trim().notEmpty().withMessage("Store name is required"),
];
