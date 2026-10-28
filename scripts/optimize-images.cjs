const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIR = path.resolve(__dirname, '../public/images');
const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;

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

  let pipeline = sharp(filePath).rotate();
  const meta = await pipeline.metadata();

  if ((meta.width && meta.width > MAX_DIMENSION) || (meta.height && meta.height > MAX_DIMENSION)) {
    pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  let optimizedBuffer;
  if (ext === '.jpg' || ext === '.jpeg') {
    optimizedBuffer = await pipeline
      .jpeg({
        quality: JPEG_QUALITY,
        mozjpeg: true,
        progressive: true,
      })
      .toBuffer();
  } else if (ext === '.png') {
    optimizedBuffer = await pipeline
      .png({
        compressionLevel: 9,
        effort: 9,
        palette: true,
      })
      .toBuffer();
  } else if (ext === '.webp') {
    optimizedBuffer = await pipeline
      .webp({
        quality: WEBP_QUALITY,
        effort: 6,
      })
      .toBuffer();
  }

  if (optimizedBuffer && optimizedBuffer.length < origSize) {
    fs.writeFileSync(filePath, optimizedBuffer);
    return {
      file: path.relative(TARGET_DIR, filePath),
      origSize,
      newSize: optimizedBuffer.length,
      saved: origSize - optimizedBuffer.length,
      optimized: true,
    };
  }

  return {
    file: path.relative(TARGET_DIR, filePath),
    origSize,
    newSize: origSize,
    saved: 0,
    optimized: false,
  };
}

async function main() {
  console.log(`Buscando imágenes en: ${TARGET_DIR} ...`);
  const files = getAllImageFiles(TARGET_DIR);
  console.log(`Se encontraron ${files.length} imágenes.\nOptimizando...`);

  let totalOrig = 0;
  let totalNew = 0;
  let countOptimized = 0;
  const savings = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const res = await optimizeImage(file);
      totalOrig += res.origSize;
      totalNew += res.newSize;
      if (res.optimized) {
        countOptimized++;
        savings.push(res);
      }
      process.stdout.write(
        `\rProgreso: ${i + 1}/${files.length} (${Math.round(((i + 1) / files.length) * 100)}%)`
      );
    } catch (err) {
      console.error(`\nError optimizando ${file}:`, err.message);
    }
  }

  console.log('\n\n--- Resumen de Optimización ---');
  console.log(`Imágenes totales analizadas: ${files.length}`);
  console.log(`Imágenes optimizadas: ${countOptimized}`);
  console.log(`Tamaño original: ${formatBytes(totalOrig)}`);
  console.log(`Tamaño final:    ${formatBytes(totalNew)}`);
  console.log(
    `Ahorro total:    ${formatBytes(totalOrig - totalNew)} (-${(
      (1 - totalNew / totalOrig) *
      100
    ).toFixed(1)}%)`
  );

  savings.sort((a, b) => b.saved - a.saved);
  console.log('\nTop 10 mayores reducciones:');
  savings.slice(0, 10).forEach((s, idx) => {
    console.log(
      `${idx + 1}. ${s.file} -> ${(s.origSize / 1024 / 1024).toFixed(2)}MB a ${(
        s.newSize /
        1024 /
        1024
      ).toFixed(2)}MB (-${((s.saved / s.origSize) * 100).toFixed(0)}%)`
    );
  });
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
