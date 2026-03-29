import sharp from "sharp";

const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    return true;
  } catch {
    throw new Error("Resize failed");
  }
};

export default resizeImage;