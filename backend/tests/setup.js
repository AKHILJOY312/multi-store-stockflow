import mongoose from "mongoose";

import { MongoMemoryReplSet } from "mongodb-memory-server";

process.env.PORT = "3000";
process.env.JWT_SECRET = "your-secret-key";
process.env.EXPIRES_IN = "7d";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryReplSet.create({
    replSet: {
      name: "rs0",
      storageEngine: "wiredTiger",
      count: 1,
    },
  });

  const uri = mongo.getUri();
  await mongoose.connect(uri);

  let isConnected = false;
  while (!isConnected) {
    try {
      await mongoose.connection.db.admin().command({ ping: 1 });
      isConnected = true;
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}, 60000);

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
