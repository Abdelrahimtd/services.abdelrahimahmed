const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgPath = "C:\\Users\\abdel\\.gemini\\antigravity-ide\\brain\\3dbdb6af-abbc-42eb-9b77-0ef327a65bf8\\.user_uploaded\\media_1786961491840.jpg";
const outDir = "C:\\Users\\abdel\\Desktop\\Ads_Images";

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function createPaddedImage(sourcePath, targetWidth, targetHeight, outPath) {
    // 1. Create blurred background
    const bgBuffer = await sharp(sourcePath)
        .resize({ width: targetWidth, height: targetHeight, fit: 'cover' })
        .blur(40)
        .modulate({ brightness: 0.6 }) // darken it
        .toBuffer();

    // 2. Resize foreground to fit
    const fgBuffer = await sharp(sourcePath)
        .resize({ width: targetWidth, height: targetHeight, fit: 'inside' })
        .toBuffer();

    // 3. Composite
    await sharp(bgBuffer)
        .composite([{ input: fgBuffer, gravity: 'center' }])
        .toFile(outPath);
    
    console.log(`Saved: ${outPath}`);
}

async function processAds() {
    try {
        // 1:1 Square
        await sharp(imgPath)
            .resize({ width: 1080, height: 1080, fit: 'contain' })
            .toFile(path.join(outDir, "1_Square_1x1.jpg"));
        console.log("Saved: 1_Square_1x1.jpg");

        // 9:16 Vertical
        await createPaddedImage(imgPath, 1080, 1920, path.join(outDir, "2_Vertical_9x16.jpg"));

        // 1.91:1 Horizontal
        await createPaddedImage(imgPath, 1200, 628, path.join(outDir, "3_Horizontal_1.91x1.jpg"));

        console.log("All images generated successfully!");
    } catch (err) {
        console.error("Error:", err);
    }
}

processAds();
