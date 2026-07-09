import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

inventorySchema.index(
  {
    productId: 1,
    storeId: 1,
  },
  { unique: true },
);

const InventoryModel = mongoose.model("Inventory", inventorySchema);
