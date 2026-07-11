import { body } from "express-validator";

export const productValidator = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("sku").trim().notEmpty().withMessage("SKU is required"),
];
