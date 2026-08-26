import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UMAMI_MENU_ITEMS } from './src/data/umamiMenuData.js';
import { UMAMI_JOURNAL_POSTS } from './src/data/umamiJournalData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_IMAGES_DIR = path.join(__dirname, 'public', 'web');

const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_TOKEN;

const client = createClient({
  projectId: 'u0jvlr9x',
  dataset: 'production',
  apiVersion: '2026-08-26',
  token: token,
  useCdn: false,
});

async function uploadAllToSanity() {
  if (!token) {
    console.error('❌ No SANITY_AUTH_TOKEN provided.');
    process.exit(1);
  }

  console.log('🚀 Connecting to Sanity Cloud (Project: u0jvlr9x, Dataset: production)...');

  // 1. Upload All Image Assets
  const imageFiles = fs.readdirSync(WEB_IMAGES_DIR).filter(f => f.endsWith('.webp') || f.endsWith('.jpg'));
  const assetMap = {};

  console.log(`\n📸 Uploading ${imageFiles.length} images to Sanity Asset CDN...`);
  for (const filename of imageFiles) {
    const filePath = path.join(WEB_IMAGES_DIR, filename);
    const readStream = fs.createReadStream(filePath);
    try {
      const asset = await client.assets.upload('image', readStream, { filename });
      assetMap[filename] = asset._id;
      console.log(`  ✓ Uploaded ${filename} -> ${asset._id}`);
    } catch (err) {
      console.error(`  ❌ Failed to upload ${filename}:`, err.message);
    }
  }

  // 2. Create / Replace Menu Items
  console.log(`\n🍔 Publishing ${UMAMI_MENU_ITEMS.length} Menu Items to Sanity...`);
  for (const item of UMAMI_MENU_ITEMS) {
    const imageName = item.image ? path.basename(item.image) : null;
    const assetId = imageName ? assetMap[imageName] : null;

    const doc = {
      _id: `menuItem-${item.id}`,
      _type: 'menuItem',
      name: item.name,
      slug: { _type: 'slug', current: item.id },
      section: item.sectionId,
      protein: item.protein || '',
      dietary: item.dietary || 'non-veg',
      tagline: item.tagline || '',
      description: item.description || '',
      ingredients: item.ingredients || [],
      pairWith: item.pairWith || '',
      price: item.price || null,
      ...(assetId ? {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        }
      } : {}),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Menu Item Synced: ${item.name} (${item.id})`);
  }

  // 3. Create / Replace Journal Posts
  console.log(`\n📖 Publishing ${UMAMI_JOURNAL_POSTS.length} Journal Posts to Sanity...`);
  for (const post of UMAMI_JOURNAL_POSTS) {
    const doc = {
      _id: `journalPost-${post.slug}`,
      _type: 'journalPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      status: 'published',
      category: post.category || 'Culinary Craft',
      datePublished: post.datePublished || '2026-08-20',
      readingTime: post.readingTime || '5 min read',
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || '',
      quickAnswer: post.quickAnswer || '',
      content: (post.sections || []).map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n'),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Journal Post Synced: ${post.title}`);
  }

  console.log('\n🎉 ALL MENU ITEMS, IMAGES, AND JOURNAL POSTS SUCCESSFULLY PUSHED TO SANITY!');
}

uploadAllToSanity().catch(console.error);
