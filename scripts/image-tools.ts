import convert from "heic-convert";
import fs from "node:fs/promises";
import nodePath from "node:path";
import sharp from "sharp";


// Run only if this file is executed directly
if (process.argv[1] !== import.meta.filename) {
    process.exit(0);
}

main()


async function main() {

    const IMG_DIR = `${process.cwd()}/images`;

    const HEICEntries = (await fs.readdir(IMG_DIR)).filter(file =>
        !file.startsWith('.') && // Remove .DS_Store and other hidden files
        /\.(heic)$/i.test(file) // Only keep image files
    )
    for (const entry of HEICEntries) {
        const baseName = nodePath.basename(entry, nodePath.extname(entry))
        console.log("base name", baseName)

        const file = await fs.readFile(`${IMG_DIR}/${entry}`)

        // @ts-expect-error typing is broken
        const output = await convert({ buffer: file, format: 'JPEG' })

        const sharpConvert = sharp(output)
            .jpeg({
                quality: 80,           // Quality 0-100 (lower = smaller file)
                progressive: true,     // Progressive JPEG for better loading
                mozjpeg: true,         // Use mozjpeg encoder for better compression
                chromaSubsampling: '4:2:0', // Chroma subsampling for smaller files
                trellisQuantisation: true,   // Better compression
                overshootDeringing: true,    // Reduce artifacts
                optimiseScans: true          // Optimize scan order
            })


        const outputDir = `${IMG_DIR}/${baseName}`;

        // Create directory if it doesn't exist (won't throw if it exists)
        await fs.mkdir(outputDir, { recursive: true });


        const promises = [
            sharpConvert.resize(1920, 1080, {   // Resize to reduce file size
                fit: 'inside',        // Maintain aspect ratio
                withoutEnlargement: true // Don't upscale smaller images
            }).toFile(`${outputDir}/${baseName}-min.jpg`),
            sharpConvert.resize(300, 200, { fit: 'cover', position: 'attention' }).toFile(`${outputDir}/${baseName}-thumb-title.jpg`),
            sharpConvert.resize(300, 200, { fit: 'cover', position: 'entropy' }).toFile(`${outputDir}/${baseName}-thumb-faces.jpg`)
        ]

        await Promise.all(promises)
    }
}
