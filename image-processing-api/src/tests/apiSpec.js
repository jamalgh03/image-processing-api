"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("API Endpoint Tests", () => {
    it("returns 200 for valid request", async () => {
        const response = await request.get("/api/images?filename=fjord&width=200&height=200");
        expect(response.status).toBe(200);
    });
    it("fails when parameters are missing", async () => {
        const response = await request.get("/api/images");
        expect(response.status).toBe(400);
    });
    it("fails when image does not exist", async () => {
        const response = await request.get("/api/images?filename=wrong&width=200&height=200");
        expect(response.status).toBe(404);
    });
    it("fails with invalid width/height", async () => {
        const response = await request.get("/api/images?filename=fjord&width=-1&height=200");
        expect(response.status).toBe(400);
    });
});
//# sourceMappingURL=apiSpec.js.map