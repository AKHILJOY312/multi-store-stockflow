import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../src/models/User.js";
await mongoose.connect(process.env.MONGO_URI);

console.log("Connected to MongoDB");

const users = [
  {
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
  {
    name: "Shopper",
    email: "shopper@test.com",
    password: "123456",
    role: "shopper",
  },
];

for (const user of users) {
  const exists = await User.findOne({ email: user.email });

  if (exists) {
    console.log(`${user.email} already exists`);
    continue;
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  await User.create({
    ...user,
    password: hashedPassword,
  });

  console.log(`${user.email} created`);
}

console.log("Seeding completed");

await mongoose.disconnect();
