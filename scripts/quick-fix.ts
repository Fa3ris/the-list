import matter from 'gray-matter';
import fs from 'node:fs'

// Run only if this file is executed directly
if (process.argv[1] !== import.meta.filename) {
    process.exit(0);
}


// hide next link in footer for all index.md files
fs.glob('docs/**/index.md', (err, matches) => {
    if (err) return
    console.log(matches)
    matches.forEach((filePath) => {
        const { content, data } = matter.read(filePath);
        data.next = false
        const newContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, newContent, "utf8");
    })

})