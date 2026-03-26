/**
 * Generate South Indian section decoration assets via Google Stitch.
 *
 * Produces:
 *   1. divider-kolam.png     — Kolam-inspired geometric line divider
 *   2. accent-thoranam.png   — Mango leaf thoranam garland corner accent
 *   3. icon-vilakku.png      — Brass oil lamp icon
 *
 * Usage:
 *   STITCH_API_KEY=<key> node scripts/stitch-section-decor.mjs
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
    filename: "divider-kolam.png",
    prompt:
      "A full-width horizontal decorative divider band inspired by South Indian kolam (rangoli) geometric patterns. " +
      "White or transparent background, PNG. 1920px wide, approximately 100px tall. " +
      "Center: an intricate symmetrical kolam knot design made of continuous curved gold lines, " +
      "with small dots at the grid intersections in the traditional kolam style. " +
      "The kolam pattern extends horizontally with repeating connected loops radiating from the center. " +
      "Tiny jasmine bud accents (small white oval buds with pale green stems) are woven along the line, " +
      "like a real jasmine garland threaded through the geometric pattern. " +
      "Colors: rich gold (#C8963E) for the kolam lines, antique gold highlights, " +
      "soft white for jasmine buds, subtle green for stems. " +
      "The design fades gracefully to transparent at left and right edges. " +
      "Style: elegant, traditional South Indian temple art — clean geometric precision with organic floral softness. " +
      "NOT North Indian, NOT Mughal. Think Tanjore painting borders meets temple floor kolam. " +
      "No text. No people.",
    device: "AGNOSTIC",
  },
  {
    filename: "accent-thoranam.png",
    prompt:
      "A decorative corner accent inspired by the South Indian mango leaf thoranam (doorway garland). " +
      "White or transparent background, PNG. Approximately 400px × 300px. " +
      "A graceful swooping garland of mango leaves strung together, cascading from the top-right corner " +
      "downward in a gentle scalloped arc. The leaves are fresh green with golden stems and binding thread. " +
      "Small marigold flowers and jasmine buds are interspersed along the garland at intervals. " +
      "Thin gold filigree vines and tendrils extend from the garland, adding delicate ornamentation. " +
      "The garland ends taper off with individual leaves fading to transparent. " +
      "Colors: fresh green leaves, gold (#C8963E) thread and filigree, saffron-orange marigolds, white jasmine. " +
      "Style: painterly, rich, traditional South Indian wedding decoration — " +
      "like a real thoranam photographed and stylized into illustration. " +
      "No text. No people. No peacocks.",
    device: "AGNOSTIC",
  },
  {
    filename: "icon-vilakku.png",
    prompt:
      "A small, elegant brass vilakku (South Indian traditional oil lamp) icon. " +
      "White or transparent background, PNG. Approximately 200px × 200px. " +
      "A tall, ornate South Indian brass oil lamp (nilavilakku) with: " +
      "a wide circular base, a fluted stem with decorative rings, " +
      "a broad oil cup at the top with 5 wicks radiating outward, " +
      "and small flames burning on each wick. " +
      "The brass is rendered in rich warm gold tones (#C8963E, #D4A843) with subtle metallic sheen. " +
      "Soft warm glow emanating from the flames. " +
      "Style: detailed but clean illustration, inspired by Tanjore painting gold leaf treatment. " +
      "Traditional South Indian temple lamp — NOT a simple diya, NOT North Indian style. " +
      "No text. No people. No background decoration.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating Stitch project for section decorations…");
  const project = await sdk.createProject(
    "Chad & Anusha Wedding — Section Decorations"
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

  console.log("\nDone. Section decoration images saved to assets/images/stitch/");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
