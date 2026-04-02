import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import resizeImage from '../utilities/resizeImage';

export const resizeImageHandler = async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const widthStr = req.query.width as string;
  const heightStr = req.query.height as string;

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

  const fullPath = path.join('assets/full', `${filename}.jpg`);
  const thumbPath = path.join('assets/thumb', `${filename}_${width}_${height}.jpg`);

  // Image file does not exist
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'Image file not found' });
  }

  try {
    // Serve from cache if exists
    if (fs.existsSync(thumbPath)) {
      return res.sendFile(path.resolve(thumbPath));
    }

    await resizeImage(fullPath, thumbPath, width, height);
    return res.sendFile(path.resolve(thumbPath));
  } catch {
    return res.status(500).json({ error: 'Error processing image' });
  }
};
