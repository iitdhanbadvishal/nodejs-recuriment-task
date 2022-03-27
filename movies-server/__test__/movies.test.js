const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("create movies for users", () => {
  beforeAll(async () => {
    process.env.API_KEY = "2c46c474";
    process.env.MONGO_URI =
      "mongodb+srv://vishal:vishal@cluster0.tuv3n.mongodb.net/nodeJsTask?retryWrites=true&w=majority";
  });

  test("Should create a movie for authorized user with movie title", async () => {
    const response = await request(app).post("/movies").send({
      movieTitle: "No entry",
    });
    expect(response.statusCode).toBe(200);
  });
});
