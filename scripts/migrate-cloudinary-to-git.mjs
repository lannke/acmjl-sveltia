import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Find all Cloudinary URLs in content files
function findCloudinaryUrls() {
  const urls = new Set();
  const urlRegex = /https:\/\/res\.cloudinary\.com\/[^\s"'\)]+/g;

  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        scanDir(filePath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(urlRegex);
        if (matches) {
          matches.forEach(url => urls.add(url));
        }
      }
    }
  }

  scanDir(CONTENT_DIR);
  return Array.from(urls);
}

// Download image from URL
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// Extract filename from Cloudinary URL
function getFilename(url) {
  // URL format: https://res.cloudinary.com/dfv2us40f/image/upload/v1234567890/acmjl/folder/filename.jpg
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  // Make unique filename with folder prefix
  return `${folder}-${filename}`.replace(/[^a-zA-Z0-9.-]/g, '_');
}

// Replace URLs in all content files
function replaceUrls(urlMap) {
  function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        processDir(filePath);
      } else if (file.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let changed = false;
        for (const [cloudinaryUrl, localPath] of Object.entries(urlMap)) {
          if (content.includes(cloudinaryUrl)) {
            content = content.split(cloudinaryUrl).join(localPath);
            changed = true;
          }
        }
        if (changed) {
          fs.writeFileSync(filePath, content);
          console.log(`Updated: ${filePath}`);
        }
      }
    }
  }

  processDir(CONTENT_DIR);
}

async function main() {
  console.log('Finding Cloudinary URLs...');
  const urls = findCloudinaryUrls();
  console.log(`Found ${urls.length} unique URLs\n`);

  const urlMap = {};

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = getFilename(url);
    const destPath = path.join(UPLOADS_DIR, filename);
    const localPath = `/uploads/${filename}`;

    console.log(`[${i + 1}/${urls.length}] Downloading: ${filename}`);

    try {
      await downloadImage(url, destPath);
      urlMap[url] = localPath;
    } catch (err) {
      console.error(`  Error downloading ${url}: ${err.message}`);
    }
  }

  console.log('\nUpdating content files...');
  replaceUrls(urlMap);

  console.log('\nDone! All images migrated to public/uploads/');
  console.log('Remember to commit and push the changes.');
}

main().catch(console.error);
