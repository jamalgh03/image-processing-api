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
exports.resizeImageHandler = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage_1 = __importDefault(require("../utilities/resizeImage"));
const resizeImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const widthStr = req.query.width;
    const heightStr = req.query.height;
    // Missing filename
    if (!filename) {
        return res.status(400).json({ error: 'Missing filename parameter' });
    }
    // Missing width or height
    if (!widthStr || !heightStr) {
        return res.status(400).json({ error: 'Missing width or height parameter(s)' });
    }
    // Invalid width/height values
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        return res.status(400).json({ error: 'Invalid width or height value(s). Must be positive numbers.' });
    }
    const fullPath = path_1.default.join('assets/full', `${filename}.jpg`);
    const thumbPath = path_1.default.join('assets/thumb', `${filename}_${width}_${height}.jpg`);
    // Image file does not exist
    if (!fs_1.default.existsSync(fullPath)) {
        return res.status(404).json({ error: 'Image file not found' });
    }
    try {
        // Serve from cache if exists
        if (fs_1.default.existsSync(thumbPath)) {
            return res.sendFile(path_1.default.resolve(thumbPath));
        }
        yield (0, resizeImage_1.default)(fullPath, thumbPath, width, height);
        return res.sendFile(path_1.default.resolve(thumbPath));
    }
    catch (_a) {
        return res.status(500).json({ error: 'Error processing image' });
    }
});
exports.resizeImageHandler = resizeImageHandler;
