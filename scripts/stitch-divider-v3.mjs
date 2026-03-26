/**
 * Regenerate kolam divider v3 — ornate, vector-style, full-width South Indian border.
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
    filename: "divider-kolam-v3.png",
    prompt:
      "A seamless horizontal ornamental border in the style of a South Indian temple frieze or Tanjore painting border. " +
      "The design is a thin elegant band running perfectly horizontally across the center of the image. " +
      "The top half and bottom half of the image are completely white/empty. " +
      "The border band itself features: a central running vine of gold (#C8963E) filigree scrollwork " +
      "with symmetrical paisley motifs, tiny lotus buds, and delicate leaf tendrils. " +
      "Above and below the vine are thin parallel gold lines framing it. " +
      "Small red (#8B1A1A) and saffron accents dot the design at regular intervals like jewels. " +
      "The style is clean vector illustration — crisp lines, smooth curves, like gold embossing on a wedding card. " +
      "Think: Kanchipuram silk saree border or carved temple pillar frieze rendered as flat vector art. " +
      "Elegant, refined, luxurious. The pattern tiles seamlessly left to right. " +
      "White background. No text. No people. No 3D effects.",
    device: "AGNOSTIC",
  },
];

async function run() {
  console.log("Creating Stitch project for divider v3…");
  const project = await sdk.createProject(
    "Chad & Anusha Wedding — Divider v3"
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
