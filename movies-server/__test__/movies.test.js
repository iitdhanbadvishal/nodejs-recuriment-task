const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo = "";
beforeAll;

describe("create movies for users", () => {
  let mongo = "";
  beforeAll(async () => {
    process.env.API_KEY = "2c46c474";
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });

  test("Should create a movie for authorized user with movie title", async () => {
    const response = await request(app).post("/movies").send({
      movieTitle: "No entry",
    });
    expect(response.statusCode).toBe(500);
  });
});
