/**
 * Generate hero section decorative assets via Google Stitch.
 *
 * Produces:
 *   1. hero-corner-left.png  — ornate floral corner arrangement (top-left)
 *   2. hero-bottom-band.png  — wide symmetrical ornamental band (bottom of hero)
 *
 * The right corner is created by CSS mirroring the left corner.
 *
 * Usage:
 *   STITCH_API_KEY=<key> node scripts/stitch-hero-decor.mjs
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
          return download(res.headers.location, filePath)
            .then(resolve)
            .catch(reject);
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
  });
}

const ASSETS = [
  {
    filename: "hero-corner-left.png",
    prompt:
      "A decorative corner floral arrangement for the top-left corner of a South Indian wedding website hero section. " +
      "Transparent background, PNG with alpha. The arrangement cascades from the top-left corner diagonally inward. " +
      "Contains: lush red and pink roses, golden marigolds, small white jasmine buds, " +
      "delicate green leaves, and 2-3 elegant peacock feathers with iridescent blue-green eyes fanning outward. " +
      "Gold filigree scrollwork and thin ornamental vines weave through the flowers. " +
      "Colors: deep crimson, coral pink, gold (#C8963E), emerald green, teal-blue peacock tones. " +
      "Style: rich, painterly, traditional Indian wedding invitation art — NOT flat or cartoonish. " +
      "High detail, soft shadows, realistic floral textures blending into transparent edges. " +
      "Dimensions: approximately 500px × 500px corner piece. " +
      "No text. No people. No animals except the peacock feathers.",
    device: "AGNOSTIC",
  },
  {
    filename: "hero-bottom-band.png",
    prompt:
      "A wide, symmetrical ornamental decorative band for the bottom of a South Indian wedding website hero section. " +
      "Transparent background, PNG with alpha. Full width 1920px, approximately 280px tall. " +
      "Center: an elaborate golden filigree medallion with intricate paisley and mandala scrollwork radiating outward symmetrically. " +
      "Flanking the center: ornate golden acanthus-style scrolls, delicate floral sprays with small red roses and white jasmine, " +
      "and subtle peacock feather motifs woven into the gold filigree. " +
      "The design fades gracefully to transparent at the left and right edges. " +
      "Colors: rich gold (#C8963E), antique gold, warm cream highlights, touches of deep red and emerald in the florals. " +
      "Style: luxurious, regal, traditional Indian wedding invitation border art — painterly with depth and soft shadows. " +
      "Think ornate Mughal/South Indian invitation border meets European filigree. " +
      "No text. No people. No full peacock birds — only feather motifs integrated into the scrollwork.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating Stitch project for hero decorations…");
  const project = await sdk.createProject(
    "Chad & Anusha Wedding — Hero Decorations"
  );
  console.log(`Project created: ${project.id}`);

  for (const { filename, prompt, device } of ASSETS) {
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

  console.log("\nDone. Hero decoration images saved to assets/images/stitch/");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
