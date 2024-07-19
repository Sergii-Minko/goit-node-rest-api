import Jimp from "jimp";
import HttpError from "./HttpError.js";
const processImage = async (avatarURL) => {
  try {
    console.log(avatarURL);
    const lenna = await Jimp.read(avatarURL);
    await lenna
      .resize(250, 250) // змінити розмір
      .quality(60) // встановити якість
      .writeAsync(avatarURL); // зберегти
  } catch (err) {
    throw HttpError(400, "Avatar Image is not valid");
  }
};

export default processImage;
