import path from 'path'

import fs, { glob } from 'fs'

const DOCS_DIR = path.resolve(process.env.INIT_CWD || path.dirname(import.meta.dirname), 'docs')

type Doc = {
    title: string;
    article: string;
}

const japan: Doc = {
    title: 'Japan',
    article: 'lovely'
}

function generateVitePressMarkdown(item: Doc) {
    return `---
title: ${item.title}
---
${item.article}
`;
}



function generateSite() {
    const content = generateVitePressMarkdown(japan)
    fs.writeFileSync(path.join(DOCS_DIR, `${japan.title}.md`), content);
}


type Filename = string
type Nav = { [entry: string]: Nav | Filename}; 


function walkDir(rootDir: string) {

    const entries = fs.readdirSync(rootDir, { recursive: true, withFileTypes: true });

    const dirsToIgnore = [/\.vitepress/, /public/]

    const fileExtensionsToInclude = [/md/]
    const filtered = entries.filter(entry => {

        if (entry.isDirectory()) {
            return !dirsToIgnore.some(p => p.test(entry.name)) && !dirsToIgnore.some(p => p.test(entry.parentPath))
        }

        return fileExtensionsToInclude.some(p => p.test(path.extname(entry.name))) && !dirsToIgnore.some(pattern => pattern.test(entry.parentPath))
    })

    const files: string[] = []
    const dirs: string[] = []
    for (const entry of filtered) {
        const fullPath = path.resolve(entry.parentPath, entry.name);

        const rel = path.relative(DOCS_DIR, fullPath)
        if (entry.isFile()) {
            // console.log('File:', fullPath);
            console.log('Rel File:', rel);
            files.push(fullPath)
        } else if (entry.isDirectory()) {
            // console.log('Directory:', fullPath);
            console.log('Rel Dir:', rel);
            dirs.push(fullPath)
        }
    }

    const arrays = dirs.map(dir => path.relative(DOCS_DIR, dir).split("/")).sort((p1, p2) => p1.length - p2.length)


    console.log(arrays)

    const nav: Nav = {};

    for (const dirPath of arrays) {
        let currentFolder = nav;
        for (const folder of dirPath) {
            currentFolder[folder] = typeof currentFolder[folder] === 'object' ? currentFolder[folder] : {};
            currentFolder = currentFolder[folder]
        }
    }


    console.log(nav)

    const relativeFiles = files.map(file => path.relative(DOCS_DIR, file).split('/'))
    console.log(relativeFiles)

    for (const relativePath of relativeFiles) {
        
        let currentFolder = nav;
        for(const entry of relativePath) {
            if (typeof currentFolder[entry] === 'object') {
                currentFolder = currentFolder[entry]
            } else {
                const parsed = path.parse(entry)
                currentFolder[parsed.name] = parsed.name
            }
        }
        
    }



    console.log(nav)


    console.log(Object.entries(nav).map(([path, entries]) => {

        console.log('entry', [path, entries])
    }))

    return nav;
}

// Run only if this file is executed directly
if (process.argv[1] === import.meta.filename) {
    walkDir(DOCS_DIR)
    // generateSite()
}
