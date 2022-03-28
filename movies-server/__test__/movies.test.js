const request = require("supertest");
const app = require("../src/app");

it("Return 200 with successfull movie creation with given title", async () => {
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ3MjQ1MCwiZXhwIjoxNjQ4NDc0MjUwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.qqPA6L0hql_UKkwKCPIZYRAJvr8HB5z2FLuUf5pLTiA`
    )
    .send({ movieTitle: "no entry" });
  expect(response.statusCode).toBe(200);
});

it("Return 400 when a movie title already exists", async () => {
  await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ3MjQ1MCwiZXhwIjoxNjQ4NDc0MjUwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.qqPA6L0hql_UKkwKCPIZYRAJvr8HB5z2FLuUf5pLTiA`
    )
    .send({ movieTitle: "no entry" });
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ3MjQ1MCwiZXhwIjoxNjQ4NDc0MjUwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.qqPA6L0hql_UKkwKCPIZYRAJvr8HB5z2FLuUf5pLTiA`
    )
    .send({ movieTitle: "no entry" });

  expect(response.statusCode).toBe(400);
});

it("Return 400 when user pass empty movie titile", async () => {
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ3MjQ1MCwiZXhwIjoxNjQ4NDc0MjUwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.qqPA6L0hql_UKkwKCPIZYRAJvr8HB5z2FLuUf5pLTiA`
    )
    .send({ movieTitle: "" });

  expect(response.statusCode).toBe(400);
});

it("Return 400 for case insentisative title", async () => {
  await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ3MjQ1MCwiZXhwIjoxNjQ4NDc0MjUwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.qqPA6L0hql_UKkwKCPIZYRAJvr8HB5z2FLuUf5pLTiA`
    )
    .send({ movieTitle: "no entry" });
  const response = await await request(app)
    .post("/movies")
    .set(
      "authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0ODQ3MjQ1MCwiZXhwIjoxNjQ4NDc0MjUwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.qqPA6L0hql_UKkwKCPIZYRAJvr8HB5z2FLuUf5pLTiA`
    )
    .send({ movieTitle: "No entry" });

  expect(response.statusCode).toBe(400);
});
