const request = require("supertest");
const app = require("../src/app");

it("Return 200 with successfull movie creation with given title", async () => {
  const response = await await request(app)
    .post("/movies")
    .send({ movieTitle: "no entry" });

  expect(response.statusCode).toBe(200);
});

it("Return 400 when a movie title already exists", async () => {
  const response = await await request(app)
    .post("/movies")
    .send({ movieTitle: "no entry" });

  expect(response.statusCode).toBe(400);
});

it("Return 400 when user pass empty movie titile", async () => {
  const response = await await request(app)
    .post("/movies")
    .send({ movieTitle: "" });

  expect(response.statusCode).toBe(400);
});
