/**
 * Generate a full-canvas floral image for use as section dividers.
 */
import { StitchToolClient, Stitch } from "@google/stitch-sdk";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "assets", "images", "stitch");
fs.mkdirSync(OUT_DIR, { recursive: true });

const apiKey = process.env.STITCH_API_KEY;
if (!apiKey) { console.error("Set STITCH_API_KEY"); process.exit(1); }

const client = new StitchToolClient({ apiKey, baseUrl: "https://stitch.googleapis.com/mcp" });
const sdk = new Stitch(client);

async function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(filePath);
    proto.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlinkSync(filePath);
        return download(res.headers.location, filePath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => { fs.unlink(filePath, () => {}); reject(err); });
  });
}

const SCREENS = [
  {
    filename: "divider-marigold-field.png",
    prompt:
      "A dense, overflowing field of bright Indian marigold flowers completely filling the entire canvas edge-to-edge. " +
      "No background visible anywhere — every pixel is covered with orange and gold marigold blooms, " +
      "vibrant green leaves, and saffron petals. " +
      "Colors: vivid orange (#FF8C00), bright saffron yellow (#FFC200), deep emerald green. " +
      "Top-down flat-lay view. No text, no patterns, no geometric shapes, no borders, no empty space. " +
      "Pure overflowing garden of marigolds, the kind used in Indian wedding decorations. " +
      "Photorealistic or illustration style, very detailed, lush, joyful, sacred.",
    device: "AGNOSTIC",
  },
  {
    filename: "divider-garland-band.png",
    prompt:
      "A horizontal string of Indian marigold flowers strung into a traditional wedding garland (toran). " +
      "The garland hangs in a gentle arc across the full width of the image. " +
      "Bright orange and gold marigolds with green mango leaves interspersed. " +
      "Clean cream/ivory background. Centered vertically in the image. " +
      "Traditional South Indian wedding decoration style. " +
      "No text, no people, no icons. Wide landscape format.",
    device: "AGNOSTIC",
  },
];

async function run() {
  const project = await sdk.createProject("Wedding Divider Assets");
  console.log(`Project: ${project.id}`);

  for (const { filename, prompt, device } of SCREENS) {
    console.log(`\nGenerating: ${filename}…`);
    try {
      const screen = await project.generate(prompt, device);
      const imageUrl = await screen.getImage();
      const outPath = path.join(OUT_DIR, filename);
      await download(imageUrl, outPath);
      const size = Math.round(fs.statSync(outPath).size / 1024);
      console.log(`  ✅ ${filename} (${size}KB)`);
    } catch (err) {
      console.error(`  ❌ ${filename}:`, err.message ?? err);
    }
  }
  console.log("\nDone.");
}

run().catch((err) => { console.error("Fatal:", err); process.exit(1); });
