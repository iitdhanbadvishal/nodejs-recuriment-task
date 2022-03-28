const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo = "";
beforeAll(async () => {
  process.env.JWT_SECRET = "abc";
  process.env.API_KEY = "2c46c474";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  process.env.MONGO_URI = mongoUri;

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(() => {
  mongo.stop();
  mongoose.connection.close();
});
