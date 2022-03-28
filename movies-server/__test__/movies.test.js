const request = require("supertest");
const app = require("../src/app");

it("Return 200 with successfull movie creation with given title", async () => {
  return request(app)
    .post("/movies")
    .send({ movieTitle: "no entry" })
    .expect(200);
});
