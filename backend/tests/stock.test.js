import request from "supertest";
import app from "../src/app.js";

import Product from "../src/models/Product.js";
import Store from "../src/models/Store.js";
import Inventory from "../src/models/Inventory.js";

import { getAdminToken } from "./helper.js";

describe("Stock Operations", () => {
  let token;
  let product;
  let storeA;
  let storeB;

  beforeEach(async () => {
    token = await getAdminToken();

    product = await Product.create({
      name: "iPhone 16",
      sku: "IP16",
    });

    storeA = await Store.create({
      name: "Store A",
    });

    storeB = await Store.create({
      name: "Store B",
    });
  });

  test("should increase stock", async () => {
    const response = await request(app)
      .post("/api/stock/adjust")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        storeId: storeA._id,
        quantity: 100,
      });

    expect(response.statusCode).toBe(200);

    const inventory = await Inventory.findOne({
      productId: product._id,
      storeId: storeA._id,
    });

    expect(inventory.quantity).toBe(100);
  });

  test("should decrease stock", async () => {
    await Inventory.create({
      productId: product._id,
      storeId: storeA._id,
      quantity: 100,
    });

    const response = await request(app)
      .post("/api/stock/adjust")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        storeId: storeA._id,
        quantity: -40,
      });

    expect(response.statusCode).toBe(200);

    const inventory = await Inventory.findOne({
      productId: product._id,
      storeId: storeA._id,
    });

    expect(inventory.quantity).toBe(60);
  });

  test("should reject adjustment exceeding stock", async () => {
    await Inventory.create({
      productId: product._id,
      storeId: storeA._id,
      quantity: 10,
    });

    const response = await request(app)
      .post("/api/stock/adjust")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        storeId: storeA._id,
        quantity: -20,
      });

    expect(response.statusCode).toBe(409);
  });

  test("should never allow stock to become negative under concurrent requests", async () => {
    await Inventory.create({
      productId: product._id,
      storeId: storeA._id,
      quantity: 10,
    });

    await Promise.all([
      request(app)
        .post("/api/stock/adjust")
        .set("Authorization", `Bearer ${token}`)
        .send({
          productId: product._id,
          storeId: storeA._id,
          quantity: -8,
        }),

      request(app)
        .post("/api/stock/adjust")
        .set("Authorization", `Bearer ${token}`)
        .send({
          productId: product._id,
          storeId: storeA._id,
          quantity: -8,
        }),
    ]);

    const inventory = await Inventory.findOne({
      productId: product._id,
      storeId: storeA._id,
    });

    expect(inventory.quantity).toBe(2);
  });

  test("should transfer stock successfully", async () => {
    await Inventory.create({
      productId: product._id,
      storeId: storeA._id,
      quantity: 100,
    });

    const response = await request(app)
      .post("/api/stock/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        fromStore: storeA._id,
        toStore: storeB._id,
        quantity: 30,
      });

    expect(response.statusCode).toBe(200);

    const source = await Inventory.findOne({
      productId: product._id,
      storeId: storeA._id,
    });

    const destination = await Inventory.findOne({
      productId: product._id,
      storeId: storeB._id,
    });

    expect(source.quantity).toBe(70);
    expect(destination.quantity).toBe(30);
  });

  test("should reject transfer when stock is insufficient", async () => {
    await Inventory.create({
      productId: product._id,
      storeId: storeA._id,
      quantity: 10,
    });

    const response = await request(app)
      .post("/api/stock/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        fromStore: storeA._id,
        toStore: storeB._id,
        quantity: 50,
      });

    expect(response.statusCode).toBe(409);

    const source = await Inventory.findOne({
      productId: product._id,
      storeId: storeA._id,
    });

    const destination = await Inventory.findOne({
      productId: product._id,
      storeId: storeB._id,
    });

    expect(source.quantity).toBe(10);
    expect(destination).toBeNull();
  });

  test("should return only low stock items", async () => {
    await Inventory.create([
      {
        productId: product._id,
        storeId: storeA._id,
        quantity: 5,
      },
      {
        productId: product._id,
        storeId: storeB._id,
        quantity: 100,
      },
    ]);

    const response = await request(app)
      .get("/api/stock?lowStock=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].quantity).toBe(5);
  });
});
