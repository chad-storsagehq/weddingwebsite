/**
 * Stitch batch 2 — divider strip + feather + lotus
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
    filename: "divider-strip-light.png",
    prompt:
      "The ENTIRE image is a full-width horizontal decorative strip — nothing else. " +
      "A wide rectangular band, wider than tall (approximately 8:1 ratio). " +
      "Filled edge-to-edge with a traditional Indian floral garland pattern: " +
      "orange and gold marigold flowers with green leaves repeating horizontally. " +
      "Background: warm cream/ivory. No page content, no text, no navigation, no buttons. " +
      "Just the decorative floral strip filling the entire canvas. " +
      "South Indian wedding invitation border style. Warm, sacred, elegant.",
    device: "AGNOSTIC",
  },
  {
    filename: "divider-strip-kolam.png",
    prompt:
      "The ENTIRE image is a horizontal decorative border strip — nothing else. " +
      "Wide rectangular band (8:1 width-to-height ratio), filling the entire canvas edge-to-edge. " +
      "Traditional South Indian kolam/rangoli pattern tiled horizontally: " +
      "geometric dotted patterns, lotus motifs, symmetrical diamond shapes. " +
      "Colors: deep maroon (#8B1A1A) and warm gold (#D4AF37) on cream background. " +
      "No text, no buttons, no UI elements. Pure decorative kolam border only.",
    device: "AGNOSTIC",
  },
  {
    filename: "peacock-feather-stitch.png",
    prompt:
      "A single ornate peacock feather in traditional Indian art style. " +
      "Tall and narrow (portrait orientation). Detailed eye pattern at the top. " +
      "Emerald green, cobalt blue, and gold colors. " +
      "Transparent background. No text, no borders, no background. " +
      "Traditional Indian decorative illustration, high detail.",
    device: "AGNOSTIC",
  },
  {
    filename: "lotus-stitch.png",
    prompt:
      "A single ornate lotus flower, top-down view, traditional Indian temple art style. " +
      "Square canvas. Perfectly symmetrical, detailed petals. " +
      "Colors: warm gold (#D4AF37) and deep maroon (#8B1A1A). " +
      "Transparent or white background. No text. " +
      "Sacred, elegant — like a temple carving or wedding invitation motif.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating project…");
  const project = await sdk.createProject("Wedding Assets Batch 2");
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
