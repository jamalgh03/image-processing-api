import resizeImage from "./resizeImage";
import fs from "fs";

describe("Image Processing Function", () => {
  it("resizes image successfully", async () => {
    await resizeImage(
      "images/full/fjord.jpg",
      "images/thumb/test.jpg",
      100,
      100,
    );

    expect(fs.existsSync("images/thumb/test.jpg")).toBeTrue();
  });

  it("throws error on invalid input", async () => {
    try {
      await resizeImage("wrong.jpg", "out.jpg", 100, 100);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
