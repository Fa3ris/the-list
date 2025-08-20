import fs from 'fs';
import path from 'path';

const validCategories = ['anime', 'book', 'game', 'manga', 'movie', 'series', 'travel', 'webtoon']

const category = process.argv[2] || 'anime'
console.log(category)

if (!validCategories.includes(category)) {
  console.error(`category ${category} is invalid valid values are ${validCategories}`)
  process.exit()
}
const categoryFolder = `docs/${category}`;
const indexContent = fs.readFileSync(`${categoryFolder}/index.md`, 'utf8');

// Extract list items (lines starting with '- ')
const lines = indexContent.split('\n');
const listItems = lines
  .filter(line => line.trim().startsWith('- '))
  .map(line => line.trim().substring(2).trim());

console.log(`Found ${listItems.length} list items`);

// Function to convert to dash-case
function toDashCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Check existing files
const existingFiles = fs.readdirSync(categoryFolder).filter(f => f.endsWith('.md') && f !== 'index.md');

console.log(`Found ${existingFiles.length} existing files:`, existingFiles);

let createdCount = 0;
let skippedCount = 0;

// Create files for each list item
listItems.forEach(item => {
  const filename = toDashCase(item) + '.md';
  const filepath = path.join(categoryFolder, filename);

  if (!existingFiles.includes(filename)) {
    const content = `---
title: ${item}
---

# {{ $frontmatter.title }}

`;

    fs.writeFileSync(filepath, content);
    console.log(`Created: ${filename}`);
    createdCount++;
  } else {
    console.log(`Skipped (already exists): ${filename}`);
    skippedCount++;
  }
});

console.log(`\nSummary: Created ${createdCount} files, skipped ${skippedCount} files`);
