import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import resizeImage from '../utilities/resizeImage';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void | Response> => {
    const filename = req.query.filename as string;
    const widthStr = req.query.width as string;
    const heightStr = req.query.height as string;

    // 1. Missing filename parameter
    if (!filename) {
        return res.status(400).send('Error: Missing filename parameter.');
    }

    // 2. Missing width or height parameters
    if (!widthStr || !heightStr) {
        return res.status(400).send('Error: Missing width or height parameter(s).');
    }

    // 3. Invalid width/height values (non-numbers, negative numbers, zero, or strings like 500f)
    const width = Number(widthStr);
    const height = Number(heightStr);

    // التحقق الصارم: هل هو رقم؟ هل هو أكبر من صفر؟ وهل النص الأصلي مطابق للرقم (عشان نكشف الـ 500f)؟
    const isInvalidWidth = isNaN(width) || width <= 0 || width.toString() !== widthStr;
    const isInvalidHeight = isNaN(height) || height <= 0 || height.toString() !== heightStr;

    if (isInvalidWidth || isInvalidHeight) {
        return res.status(400).send('Error: Invalid width or height value(s). Must be positive integers.');
    }

    const fullPath = path.join(__dirname, '../../assets/full', `${filename}.jpg`);
    const thumbPath = path.join(__dirname, '../../assets/thumb', `${filename}_${width}_${height}.jpg`);

    // 4. Non-existent image file (404)
    if (!fs.existsSync(fullPath)) {
        return res.status(404).send('Error: Image file not found.');
    }

    try {
        // Serve from cache if exists
        if (fs.existsSync(thumbPath)) {
            return res.sendFile(path.resolve(thumbPath));
        }

        // Processing image
        await resizeImage(fullPath, thumbPath, width, height);
        return res.sendFile(path.resolve(thumbPath));
        
    } catch  {
        // 5. Internal server error
        return res.status(500).send('Error: Internal server error during image processing.');
    }
});

export default router;