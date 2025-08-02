import path from 'path';

import fs from 'fs';

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
export type Nav = { [entry: string]: Nav | Filename };


function walkDir(rootDir: string, options = {
    dirsToIgnore: [/\.vitepress/, /public/],
    fileExtensionsToInclude: [/md/]
}) {

    const entries = fs.readdirSync(rootDir, { recursive: true, withFileTypes: true });

    const { dirsToIgnore, fileExtensionsToInclude } = options

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
        if (entry.isFile()) {
            files.push(fullPath)
        } else if (entry.isDirectory()) {
            dirs.push(fullPath)
        }
    }

    const dirPaths = dirs.map(dir => path.relative(rootDir, dir).split("/")).sort((p1, p2) => p1.length - p2.length)

    const nav: Nav = {};

    for (const dirPath of dirPaths) {
        let currentDir = nav;
        for (const dir of dirPath) {
            currentDir[dir] = typeof currentDir[dir] === 'object' ? currentDir[dir] : {};
            currentDir = currentDir[dir]
        }
    }


    const relativeFilePaths = files.map(file => path.relative(rootDir, file).split('/'))

    for (const relativePath of relativeFilePaths) {
        let currentDir = nav;
        for (const entry of relativePath) {
            if (typeof currentDir[entry] === 'object') {
                currentDir = currentDir[entry]
            } else {
                const parsed = path.parse(entry)
                currentDir[parsed.name] = parsed.name
            }
        }
    }

    return nav;
}


function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toSideBarNav(nav: Nav) {
    const entries = Object.entries(nav)
    const firstEntry = entries[0]
    const res = {}
    const [entryName, entryContent] = firstEntry;

    if (typeof entryContent === 'object') {

        const items: { text: string, link: string }[] = []

        let indexFile: { text: string, link: string } | undefined = undefined;

        const children = Object.entries(entryContent)
        for (const [childName, childContent] of children) {
            if (typeof childContent === 'string') {
const linkInfo = { text: capitalizeFirstLetter(childName), link: `/${childName}` }
                if (childName === 'index') {
                    indexFile = linkInfo
                } else {
                    items.push(linkInfo)
                }
            }
        }

        res[`/${entryName}`] = [
            {
                base: `/${entryName}`,
                text: capitalizeFirstLetter(entryName),
                items: indexFile ? [indexFile].concat(items) : items,
            }
        ]

    }

    return res;
}


export { toSideBarNav, walkDir };

// Run only if this file is executed directly
if (process.argv[1] === import.meta.filename) {
    walkDir(DOCS_DIR)
    // generateSite()
}
