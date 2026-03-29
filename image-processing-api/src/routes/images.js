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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage_1 = __importDefault(require("../utilities/resizeImage"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //  Missing filename
    if (!filename) {
        return res.status(400).send("Missing filename parameter");
    }
    //  Missing width/height
    if (!req.query.width || !req.query.height) {
        return res.status(400).send("Missing width or height parameters");
    }
    //  Invalid values
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        return res.status(400).send("Invalid width or height values");
    }
    const fullPath = path_1.default.join("images/full", `${filename}.jpg`);
    const thumbPath = path_1.default.join("images/thumb", `${filename}_${width}_${height}.jpg`);
    //  File not found
    if (!fs_1.default.existsSync(fullPath)) {
        return res.status(404).send("Image not found");
    }
    try {
        // cache
        if (fs_1.default.existsSync(thumbPath)) {
            return res.sendFile(path_1.default.resolve(thumbPath));
        }
        yield (0, resizeImage_1.default)(fullPath, thumbPath, width, height);
        return res.sendFile(path_1.default.resolve(thumbPath));
    }
    catch (error) {
        return res.status(500).send("Error processing image");
    }
}));
exports.default = router;
