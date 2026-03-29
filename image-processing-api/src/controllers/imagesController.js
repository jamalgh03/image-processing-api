"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageHandler = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage_1 = __importDefault(require("../utilities/resizeImage"));
const resizeImageHandler = async (req, res) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //  Missing params
    if (!filename || !width || !height) {
        return res.status(400).send("Missing parameters");
    }
    //  Invalid numbers
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        return res.status(400).send("Invalid width or height");
    }
    const fullPath = path_1.default.resolve(`images/full/${filename}.jpg`);
    const thumbPath = path_1.default.resolve(`images/thumb/${filename}_${width}_${height}.jpg`);
    //  File not found
    if (!fs_1.default.existsSync(fullPath)) {
        return res.status(404).send("Image not found");
    }
    try {
        // Cache
        if (fs_1.default.existsSync(thumbPath)) {
            console.log("Serving cached image");
            return res.sendFile(thumbPath);
        }
        console.log("Processing image...");
        await (0, resizeImage_1.default)(fullPath, thumbPath, width, height);
        return res.sendFile(thumbPath);
    }
    catch (error) {
        return res.status(500).send("Error processing image");
    }
};
exports.resizeImageHandler = resizeImageHandler;
//# sourceMappingURL=imagesController.js.map