const request = require("supertest");
const app = require("../src/app");

it("Return 200 with successfull movie creation with given title", async () => {
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ2OTg3NCwiZXhwIjoxNjQ4NDcxNjc0LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.ALHgI01xWFFcpLlOVAxI_8O7W-6791-yrYbMhxoSfPo`
    )
    .send({ movieTitle: "no entry" });
  expect(response.statusCode).toBe(200);
});

it("Return 400 when a movie title already exists", async () => {
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ2OTg3NCwiZXhwIjoxNjQ4NDcxNjc0LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.ALHgI01xWFFcpLlOVAxI_8O7W-6791-yrYbMhxoSfPo`
    )
    .send({ movieTitle: "no entry" });

  expect(response.statusCode).toBe(400);
});

it("Return 400 when user pass empty movie titile", async () => {
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ2OTg3NCwiZXhwIjoxNjQ4NDcxNjc0LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.ALHgI01xWFFcpLlOVAxI_8O7W-6791-yrYbMhxoSfPo`
    )
    .send({ movieTitle: "" });

  expect(response.statusCode).toBe(400);
});
