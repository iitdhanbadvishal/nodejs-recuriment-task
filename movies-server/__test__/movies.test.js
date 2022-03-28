const request = require("supertest");
const app = require("../src/app");

it("Return 200 with successfull movie creation with given title", async () => {
  return request(app)
    .post("/movies")
    .send({ movieTitle: "no entry" })
    .expect(200);
});

it("Return 400 when a movie title already exists", async () => {
  return request(app)
    .post("/movies")
    .send({ movieTitle: "no entry" })
    .expect(400);
});

it("Return 400 when user pass empty movie titile", async () => {
  return request(app)
    .post("/movies")
    .send({ movieTitle: "no entry" })
    .expect(400);
});
