/**
 * Regenerate kolam divider with better prompt for square canvas.
 * Stitch outputs 512×512, so we design the divider as a centered
 * horizontal band within that square, then crop in post-processing.
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
    filename: "divider-kolam-v2.png",
    prompt:
      "A vibrant horizontal decorative border band centered vertically in the image, " +
      "with the top and bottom thirds of the image completely empty white space. " +
      "The band spans the full width of the image and occupies only the middle third. " +
      "The design: a richly colorful South Indian kolam-inspired geometric border with " +
      "interlocking loops and curves in deep gold (#C8963E), saffron orange, deep red (#8B1A1A), " +
      "and emerald green accents. Small colorful marigold flowers (bright orange and yellow) " +
      "and jasmine buds (white) are woven through the geometric pattern. " +
      "The kolam lines are thick and bold with beautiful symmetry. " +
      "Think of a temple doorway border or traditional wedding invitation border — " +
      "rich, vibrant, celebratory. NOT subtle or faded. Bold saturated colors. " +
      "White background. No text. No people.",
    device: "AGNOSTIC",
  },
  {
    filename: "accent-thoranam-v2.png",
    prompt:
      "A small, delicate South Indian mango leaf thoranam garland accent for a corner decoration. " +
      "White background, PNG. The garland is compact — a short curved string of small mango leaves " +
      "with 2-3 tiny marigold flowers and jasmine buds. " +
      "It hangs in a gentle curve from the top-left corner of the image, " +
      "like a miniature doorway garland. Gold thread binds the leaves. " +
      "The garland is small and subtle — meant as a corner accent, not a large decoration. " +
      "Colors: fresh green leaves, gold (#C8963E) thread, saffron marigolds, white jasmine. " +
      "Delicate thin gold filigree tendrils extend from the ends. " +
      "Style: refined, elegant, traditional South Indian. Small and compact. " +
      "No text. No people. No peacocks.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating Stitch project for v2 decorations…");
  const project = await sdk.createProject(
    "Chad & Anusha Wedding — Decoration v2"
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
      console.log(`  Saved: ${filename}`);
    } catch (err) {
      console.error(`  Failed ${filename}:`, err.message ?? err);
    }
  }

  console.log("\nDone.");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
