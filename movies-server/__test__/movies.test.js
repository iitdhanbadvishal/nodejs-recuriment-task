const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

// describe("create movies for users", () => {
//   let mongo = "";
//   beforeAll(async () => {
//     process.env.API_KEY = "2c46c474";
//     mongo = await MongoMemoryServer.create();
//     const mongoUri = await mongo.getUri();

//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     await mongo.stop();
//     await mongoose.connection.close();
//   });

//   test("Should create a movie for authorized user with movie title", async () => {
//     const response = await request(app).post("/movies").send({
//       movieTitle: "No entry",
//     });
//     expect(response.statusCode).toBe(200);
//   });
// });

// let mongo = "";
// beforeAll(async () => {
//   process.env.API_KEY = "2c46c474";
//   mongo = await MongoMemoryServer.create();
//   const mongoUri = await mongo.getUri();

//   await mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongo.stop();
//   await mongoose.connection.close();
// });

// test("Should create a movie for authorized user with movie title", async () => {
//   const response = await request(app).post("/movies").send({
//     movieTitle: "No entry",
//   });
//   expect(response.statusCode).toBe(200);
// });

const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = { _id: "some-user-id", name: "John" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});
