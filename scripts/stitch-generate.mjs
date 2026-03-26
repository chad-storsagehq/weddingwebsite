/**
 * Stitch asset generator for Chad & Anusha wedding website.
 * Generates floral divider + section decoration images via Google Stitch.
 *
 * Usage:
 *   STITCH_API_KEY=<key> node scripts/stitch-generate.mjs
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
if (!apiKey) {
  console.error("Error: STITCH_API_KEY environment variable not set.");
  process.exit(1);
}

const client = new StitchToolClient({
  apiKey,
  baseUrl: "https://stitch.googleapis.com/mcp",
});
const sdk = new Stitch(client);

async function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(filePath);
    proto
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(filePath);
          return download(res.headers.location, filePath).then(resolve).catch(reject);
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
  });
}

const SCREENS = [
  {
    filename: "divider-floral.png",
    prompt:
      "A full-width horizontal decorative band for a South Indian Telugu wedding invitation website. " +
      "The band is 1920px wide and 120px tall — it is ONLY a divider strip, not a full page. " +
      "Centered: a lush marigold flower garland draped horizontally across the full width. " +
      "Behind it: a very subtle kolam/rangoli mandala pattern tiled across the background. " +
      "Colors: warm gold (#D4AF37), deep amber, rich maroon (#8B1A1A), on a warm cream/ivory background. " +
      "Style: elegant, sacred, traditional South Indian wedding invitation — NOT loud, NOT neon. " +
      "No text. No people. No icons. Pure decorative floral band only.",
    device: "AGNOSTIC",
  },
  {
    filename: "divider-floral-dark.png",
    prompt:
      "A full-width horizontal decorative band for a South Indian Telugu wedding website, " +
      "designed to sit between dark-background sections (deep brown/maroon). " +
      "1920px wide, 120px tall — only a divider strip. " +
      "Centered: a row of marigold flowers and jasmine buds in a traditional toran/garland style. " +
      "Subtle mandala motifs on a very dark maroon/brown background. " +
      "Colors: gold, saffron, ivory on deep brown-maroon (#3D1510). " +
      "Elegant, sacred, traditional. No text, no people.",
    device: "AGNOSTIC",
  },
  {
    filename: "peacock-guide-corner.png",
    prompt:
      "A decorative corner accent for a South Indian Telugu wedding website. " +
      "A pair of vibrant peacocks with detailed feathers, facing inward toward center. " +
      "Colors: emerald teal, cobalt blue, gold, with detailed peacock-feather eye patterns. " +
      "Transparent/white background. 300px × 300px. " +
      "Traditional Indian art style — detailed, colorful, sacred. No text.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating Stitch project…");
  const project = await sdk.createProject("Chad & Anusha Wedding — Visual Assets");
  console.log(`Project created: ${project.id}`);

  for (const { filename, prompt, device } of SCREENS) {
    console.log(`\nGenerating: ${filename}…`);
    try {
      const screen = await project.generate(prompt, device);
      console.log(`  Screen ID: ${screen.screenId}`);

      const imageUrl = await screen.getImage();
      const outPath = path.join(OUT_DIR, filename);
      console.log(`  Downloading → ${outPath}`);
      await download(imageUrl, outPath);
      console.log(`  ✅ Saved: ${filename}`);
    } catch (err) {
      console.error(`  ❌ Failed ${filename}:`, err.message ?? err);
    }
  }

  console.log("\nDone. Images saved to assets/images/stitch/");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
