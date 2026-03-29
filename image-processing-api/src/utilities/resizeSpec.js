"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizeImage_1 = __importDefault(require("../src/utilities/resizeImage"));
const fs_1 = __importDefault(require("fs"));
describe("Image Processing Function", () => {
    it("resizes image successfully", async () => {
        await (0, resizeImage_1.default)("images/full/fjord.jpg", "images/thumb/test.jpg", 100, 100);
        expect(fs_1.default.existsSync("images/thumb/test.jpg")).toBeTrue();
    });
    it("throws error on invalid input", async () => {
        try {
            await (0, resizeImage_1.default)("wrong.jpg", "out.jpg", 100, 100);
        }
        catch (error) {
            expect(error).toBeTruthy();
        }
    });
});
//# sourceMappingURL=resizeSpec.js.map