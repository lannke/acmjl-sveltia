import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.join(__dirname, '..')

// Config Cloudinary
cloudinary.config({
  cloud_name: 'dfv2us40f',
  api_key: '765975952492195',
  api_secret: 'etLCujLVBkuUXWdMMJGk8RDbhbw'
})

const IMAGES_DIR = path.join(PROJECT_ROOT, 'public/images')
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content')

// Map des anciennes URLs vers nouvelles URLs Cloudinary
const urlMap = new Map()

// Extensions images supportées
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

async function getAllImages(dir) {
  const images = []

  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir)
    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        scanDir(fullPath)
      } else if (IMAGE_EXTENSIONS.includes(path.extname(item).toLowerCase())) {
        // Ignorer les versions redimensionnées (contiennent des dimensions dans le nom)
        if (!item.match(/\.\d+x\d+/) && !item.includes('-crop')) {
          images.push(fullPath)
        }
      }
    }
  }

  scanDir(dir)
  return images
}

async function uploadImage(imagePath) {
  const relativePath = path.relative(IMAGES_DIR, imagePath)
  const publicId = 'acmjl/' + relativePath.replace(/\\/g, '/').replace(/\.[^.]+$/, '')

  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image'
    })

    const oldUrl = '/images/' + relativePath.replace(/\\/g, '/')
    const newUrl = result.secure_url

    urlMap.set(oldUrl, newUrl)
    console.log(`✓ ${oldUrl} → ${newUrl}`)

    return result
  } catch (error) {
    console.error(`✗ Erreur upload ${imagePath}:`, error.message)
    return null
  }
}

function updateMarkdownFiles(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      updateMarkdownFiles(fullPath)
    } else if (file.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf-8')
      let modified = false

      for (const [oldUrl, newUrl] of urlMap) {
        if (content.includes(oldUrl)) {
          content = content.split(oldUrl).join(newUrl)
          modified = true
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content)
        console.log(`📝 Mis à jour: ${path.relative(PROJECT_ROOT, fullPath)}`)
      }
    }
  }
}

async function main() {
  console.log('🚀 Migration des images vers Cloudinary\n')

  // 1. Récupérer toutes les images
  console.log('📁 Scan des images...')
  const images = await getAllImages(IMAGES_DIR)
  console.log(`   Trouvé ${images.length} images à migrer\n`)

  // 2. Upload vers Cloudinary
  console.log('☁️  Upload vers Cloudinary...')
  for (const image of images) {
    await uploadImage(image)
  }
  console.log(`\n   ${urlMap.size} images uploadées\n`)

  // 3. Mettre à jour les fichiers Markdown
  console.log('📝 Mise à jour des fichiers Markdown...')
  updateMarkdownFiles(CONTENT_DIR)

  // 4. Sauvegarder le mapping
  const mappingPath = path.join(PROJECT_ROOT, 'cloudinary-migration-map.json')
  fs.writeFileSync(mappingPath, JSON.stringify(Object.fromEntries(urlMap), null, 2))
  console.log(`\n💾 Mapping sauvegardé: ${mappingPath}`)

  console.log('\n✅ Migration terminée!')
}

main().catch(console.error)
