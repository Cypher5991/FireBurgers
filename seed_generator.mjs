import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UMAMI_MENU_ITEMS } from './src/data/umamiMenuData.js';
import { UMAMI_JOURNAL_POSTS } from './src/data/umamiJournalData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STUDIO_DIR = path.join(__dirname, '..', 'studio-umami-fire-burgers-website');
const OUTPUT_FILE = path.join(STUDIO_DIR, 'seed-data.ndjson');

const ndjsonLines = [];

// 1. Menu Items
UMAMI_MENU_ITEMS.forEach((item) => {
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
  };
  ndjsonLines.push(JSON.stringify(doc));
});

// 2. Journal Posts
UMAMI_JOURNAL_POSTS.forEach((post) => {
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
  ndjsonLines.push(JSON.stringify(doc));
});

fs.writeFileSync(OUTPUT_FILE, ndjsonLines.join('\n') + '\n');
console.log(`✓ Generated ${ndjsonLines.length} seed documents in ${OUTPUT_FILE}`);
