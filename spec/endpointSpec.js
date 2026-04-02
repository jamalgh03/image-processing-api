"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
// @ts-ignore
const index_1 = __importDefault(require("../src/index"));
// @ts-ignore
const request = (0, supertest_1.default)(index_1.default);
describe("API Endpoint", () => {
    it("returns 200 with valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/api/images?filename=fjord&width=200&height=200");
        expect(res.status).toBe(200);
    }));
    it("returns 400 if filename missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/api/images?width=200&height=200");
        expect(res.status).toBe(400);
    }));
    it("returns 400 if invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/api/images?filename=fjord&width=-1&height=200");
        expect(res.status).toBe(400);
    }));
});
