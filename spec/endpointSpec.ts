// @ts-ignore
import supertest from "supertest";
// @ts-ignore
import app from "../index";

// @ts-ignore
const request = supertest(app);

describe("API Endpoint", () => {
  it("returns 200 with valid params", async () => {
    const res = await request.get(
      "/api/images?filename=fjord&width=200&height=200"
    );
    expect(res.status).toBe(200);
  });

  it("returns 400 if filename missing", async () => {
    const res = await request.get(
      "/api/images?width=200&height=200"
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 if invalid width", async () => {
    const res = await request.get(
      "/api/images?filename=fjord&width=-1&height=200"
    );
    expect(res.status).toBe(400);
  });
});