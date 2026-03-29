import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import resizeImage from "../utilities/resizeImage";

export const resizeImageHandler = async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  //  Missing params
  if (!filename || !width || !height) {
    return res.status(400).send("Missing parameters");
  }

  //  Invalid numbers
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return res.status(400).send("Invalid width or height");
  }

  const fullPath = path.resolve(`images/full/${filename}.jpg`);
  const thumbPath = path.resolve(
    `images/thumb/${filename}_${width}_${height}.jpg`,
  );

  //  File not found
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send("Image not found");
  }

  try {
    // Cache
    if (fs.existsSync(thumbPath)) {
      console.log("Serving cached image");
      return res.sendFile(thumbPath);
    }

    console.log("Processing image...");
    await resizeImage(fullPath, thumbPath, width, height);

    return res.sendFile(thumbPath);
  } catch (error) {
    return res.status(500).send("Error processing image");
  }
};
