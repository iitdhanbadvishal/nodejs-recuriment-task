const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Movi = require("../src/models/movies");
const mongoose = require("mongoose");

describe("create movies for users", () => {
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
    const movi = new Movi({
      userId: "123",
      title: "no entry",
      released: "1222",
      genre: "comedey",
      director: "test",
      createdAt: "111100020202",
      month: "3",
      year: "2022",
    });
    await movi.save();

    await request(app)
      .post("/movies")
      .send({ movieTitle: "no entry" })
      .expect(response.statusCode)
      .toBe(200);

    // const response = await request(app).post("/movies").send({
    //   movieTitle: "No entry",
    // });
    // expect(response.statusCode).toBe(200);
  });
});
