import request from "supertest";
import app from "../src/app.js";

export async function getAdminToken() {
  const response = await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  });

  return response.body.data.token;
}
