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
const resizeImage_1 = __importDefault(require("../src/utilities/resizeImage"));
describe("Image Processing Function", () => {
    it("works with valid input", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, resizeImage_1.default)("images/full/fjord.jpg", "images/thumb/test.jpg", 200, 200);
        expect(result).toBeTrue();
    }));
    it("fails with invalid input", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizeImage_1.default)("", "", -1, -1)).toBeRejected();
    }));
});
