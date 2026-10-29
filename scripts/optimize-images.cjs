const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIR = path.resolve(__dirname, '../public/images');
const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 78;

function getAllImageFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllImageFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImage(filePath) {
  const origStats = fs.statSync(filePath);
  const origSize = origStats.size;
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const isLogo = baseName === 'logo';

  const isHero = filePath.includes('/hero/') || filePath.includes('\\hero\\');
  const maxDim = isHero ? 1920 : MAX_DIMENSION;

  let pipeline = sharp(filePath).rotate();
  pipeline = pipeline.resize(maxDim, maxDim, {
    fit: 'inside',
    withoutEnlargement: true,
  });

  const webpBuffer = await pipeline
    .webp({
      quality: WEBP_QUALITY,
      effort: 5,
    })
    .toBuffer();

  const webpPath = path.join(dir, `${baseName}.webp`);
  fs.writeFileSync(webpPath, webpBuffer);

  if (!isLogo && (ext === '.jpg' || ext === '.jpeg')) {
    fs.unlinkSync(filePath);
  }

  return {
    file: path.relative(TARGET_DIR, webpPath),
    origSize,
    newSize: webpBuffer.length,
    saved: origSize - webpBuffer.length,
    optimized: true,
  };
}

async function main() {
  console.log(`Buscando imágenes en: ${TARGET_DIR} ...`);
  const files = getAllImageFiles(TARGET_DIR);
  console.log(`Se encontraron ${files.length} imágenes.\nOptimizando a WebP...`);

  let totalOrig = 0;
  let totalNew = 0;
  let countOptimized = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const res = await optimizeImage(file);
      totalOrig += res.origSize;
      totalNew += res.newSize;
      countOptimized++;
      process.stdout.write(
        `\rProgreso: ${i + 1}/${files.length} (${Math.round(((i + 1) / files.length) * 100)}%)`
      );
    } catch (err) {
      console.error(`\nError optimizando ${file}:`, err.message);
    }
  }

  console.log('\n\n--- Resumen de Optimización WebP ---');
  console.log(`Imágenes totales analizadas: ${files.length}`);
  console.log(`Imágenes optimizadas:       ${countOptimized}`);
  console.log(`Tamaño original:            ${formatBytes(totalOrig)}`);
  console.log(`Tamaño final:               ${formatBytes(totalNew)}`);
  console.log(
    `Ahorro total:               ${formatBytes(totalOrig - totalNew)} (-${(
      (1 - totalNew / totalOrig) *
      100
    ).toFixed(1)}%)`
  );
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
