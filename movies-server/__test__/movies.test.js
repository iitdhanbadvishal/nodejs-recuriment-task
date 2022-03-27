const request = require('supertest');
const app = require('../src/app');

describe("get /test", () => {
    describe("testing the test", () => {
        
        test("response from test", async () => {
            const response = await request(app).get("/test");
            expect(response.status).toBe(200);
        })
    })
})