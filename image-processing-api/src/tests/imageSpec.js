"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("API Endpoint", () => {
    it("returns resized image", async () => {
        const response = await request.get("/api/images?filename=fjord&width=200&height=200");
        expect(response.status).toBe(200);
    });
    it("fails with missing params", async () => {
        const response = await request.get("/api/images");
        expect(response.status).toBe(400);
    });
});
//# sourceMappingURL=imageSpec.js.map