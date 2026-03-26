/**
 * Generate high-quality decorative accents via Google Stitch:
 * 1. Peacock corner accent — elegant, for section corners
 * 2. Lotus rangoli accent — for section backgrounds
 * 3. Paisley vine border — vertical side accent
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
    filename: "accent-peacock-corner.png",
    prompt:
      "A single elegant Indian peacock in profile facing right, rendered in rich teal (#2A9D8F), " +
      "deep blue (#1B6B8A), and gold (#C8963E) colors. The peacock's tail fans out in an ornate " +
      "decorative arc with detailed eye feather patterns. Style: luxurious Mughal miniature painting " +
      "meets modern vector art — clean smooth lines, rich saturated colors, intricate feather detail " +
      "with gold filigree highlights. The peacock sits in the bottom-left corner of the image. " +
      "The rest of the image is completely white/transparent. " +
      "High-end wedding invitation quality. No text. No background pattern. White background only.",
    device: "AGNOSTIC",
  },
  {
    filename: "accent-rangoli-lotus.png",
    prompt:
      "A symmetrical lotus rangoli mandala design viewed from above. Rendered in soft gold (#C8963E) " +
      "and warm red (#8B1A1A) with teal (#2A9D8F) accents. The design has a central lotus flower " +
      "surrounded by concentric rings of paisley motifs, tiny flower buds, and delicate dot patterns. " +
      "Style: traditional South Indian kolam/rangoli art rendered as crisp vector illustration — " +
      "clean geometric lines, perfect symmetry, like a henna design or mehndi pattern. " +
      "Elegant and refined. White background. No text. No 3D effects. Flat art.",
    device: "AGNOSTIC",
  },
  {
    filename: "accent-paisley-vine.png",
    prompt:
      "A tall vertical decorative vine border in South Indian style. The vine runs vertically from " +
      "top to bottom with gold (#C8963E) scrollwork, paisley motifs, tiny lotus buds, and delicate " +
      "leaf tendrils branching off symmetrically to both sides. Small teal (#2A9D8F) and red (#8B1A1A) " +
      "jewel accents at key points. Style: Kanchipuram saree pallu border or carved temple pillar " +
      "rendered as flat vector art — crisp lines, smooth curves, luxurious feel. " +
      "The vine is thin and centered horizontally. White background. No text. No 3D effects.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating Stitch project for decorative accents…");
  const project = await sdk.createProject(
    "Chad & Anusha Wedding — Section Accents"
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
