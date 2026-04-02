// @ts-ignore
import resizeImage from "../src/utilities/resizeImage";

describe("Image Processing Function", () => {
  it("works with valid input", async () => {
    const result = await resizeImage(
      "assets/full/fjord.jpg",
      "assets/thumb/test.jpg",
      200,
      200
    );
    expect(result).toBeTrue();
  });

  it("fails with invalid input", async () => {
    await expectAsync(
      resizeImage("", "", -1, -1)
    ).toBeRejected();
  });
});