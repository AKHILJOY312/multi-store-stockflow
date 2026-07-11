import { body } from "express-validator";

export const adjustValidator = [
  body("productId").isMongoId().withMessage("Invalid product id"),

  body("storeId").isMongoId().withMessage("Invade store id"),

  body("quantity").isInt().withMessage("Quantity must be an integer"),
];

export const transferValidator = [
  body("productId").isMongoId().withMessage("Invalid product id"),

  body("fromStore").isMongoId().withMessage("Invalid source store"),

  body("toStore").isMongoId().withMessage("Invalid destination store"),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  body("toStore").custom((value, { req }) => {
    if (value === req.body.fromStore) {
      throw new Error("Source and destination stores cannot be the same");
    }
    return true;
  }),
];
