import express from "express";
import path from "path";
import fs from "fs";
import resizeImage from "../utilities/resizeImage";

const router = express.Router();

router.get("/", async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

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

  const fullPath = path.join("images/full", `${filename}.jpg`);
  const thumbPath = path.join(
    "images/thumb",
    `${filename}_${width}_${height}.jpg`
  );

  //  File not found
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send("Image not found");
  }

  try {
    // cache
    if (fs.existsSync(thumbPath)) {
      return res.sendFile(path.resolve(thumbPath));
    }

    await resizeImage(fullPath, thumbPath, width, height);

    return res.sendFile(path.resolve(thumbPath));
  } catch (error) {
    return res.status(500).send("Error processing image");
  }
});

export default router;