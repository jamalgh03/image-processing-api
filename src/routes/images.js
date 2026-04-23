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

router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const widthStr = req.query.width;
    const heightStr = req.query.height;

    // 1. التحقق من وجود اسم الملف (Missing filename parameter)
    if (!filename) {
        return res.status(400).send('Error: Missing filename parameter.');
    }

    // 2. التحقق من وجود الطول والعرض (Missing width or height parameters)
    if (!widthStr || !heightStr) {
        return res.status(400).send('Error: Missing width or height parameter(s).');
    }

    const width = Number(widthStr);
    const height = Number(heightStr);

    // 3. معالجة القيم غير الصالحة (Invalid values: non-numbers, negative, zero, 500f)
    // نستخدم مقارنة النص بالأرقام لضمان عدم وجود أحرف مثل 'f'
    const isInvalidWidth = isNaN(width) || width <= 0 || !Number.isInteger(width) || widthStr !== width.toString();
    const isInvalidHeight = isNaN(height) || height <= 0 || !Number.isInteger(height) || heightStr !== height.toString();

    if (isInvalidWidth || isInvalidHeight) {
        return res.status(400).send('Error: Invalid width or height value(s). Must be positive integers (e.g., 500).');
    }

    const fullPath = path_1.default.join('assets/full', `${filename}.jpg`);
    const thumbPath = path_1.default.join('assets/thumb', `${filename}_${width}_${height}.jpg`);

    // 4. التحقق من وجود الملف الأصلي (Non-existent image file) - كود 404
    if (!fs_1.default.existsSync(fullPath)) {
        return res.status(404).send('Error: Image file not found.');
    }

    try {
        if (fs_1.default.existsSync(thumbPath)) {
            return res.sendFile(path_1.default.resolve(thumbPath));
        }

        yield (0, resizeImage_1.default)(fullPath, thumbPath, width, height);
        return res.sendFile(path_1.default.resolve(thumbPath));
    }
    catch {
        // 5. خطأ داخلي في حالة فشل المعالجة - كود 500
        return res.status(500).send('Error: Internal server error during image processing.');
    }
}));

exports.default = router;