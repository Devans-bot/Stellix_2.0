import { Pin } from "../models/pinmodels.js";
import { analyzeImage } from "./analyzeImages.js";


const extractWords = (text = "") =>
  text
    .toLowerCase()
    .split(/[\s,.;:!?()"'`]+/)
    .filter((w) => w.length > 2 && !stopwords.has(w));

const analyzePinAsync = async (pinId, buffer, title, pin) => {
  try {
    const { objects, colors } = await analyzeImage(buffer);

    const tags = [
      ...new Set([
        ...objects,
        ...colors,
        ...extractWords(title),
        ...extractWords(pin),
      ]),
    ];

    await Pin.findByIdAndUpdate(pinId, {
      objects,
      colors,
      tags,
    });

    console.log("✅ Analysis done for", pinId);
  } catch (err) {
    console.error("Analysis failed:", err);
  }
};

export default analyzePinAsync
