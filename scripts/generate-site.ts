import path from "path";

import fs from "fs";
import type { DefaultTheme } from "vitepress";
import util from "node:util";

const DOCS_DIR = path.resolve(
  process.env.INIT_CWD || path.dirname(import.meta.dirname),
  "docs"
);

type Doc = {
  title: string;
  article: string;
};

const japan: Doc = {
  title: "Japan",
  article: "lovely",
};

function generateVitePressMarkdown(item: Doc) {
  return `---
title: ${item.title}
---
${item.article}
`;
}

function generateSite() {
  const content = generateVitePressMarkdown(japan);
  fs.writeFileSync(path.join(DOCS_DIR, `${japan.title}.md`), content);
}

type Filename = string;
export type Nav = { [entry: string]: Nav | Filename };

function walkDir(
  rootDir: string,
  options = {
    dirsToIgnore: [/\.vitepress/, /public/],
    fileExtensionsToInclude: [/md/],
  }
) {
  const entries = fs.readdirSync(rootDir, {
    recursive: true,
    withFileTypes: true,
  });

  const { dirsToIgnore, fileExtensionsToInclude } = options;

  const filtered = entries.filter((entry) => {
    if (entry.isDirectory()) {
      return (
        !dirsToIgnore.some((p) => p.test(entry.name)) &&
        !dirsToIgnore.some((p) => p.test(entry.parentPath))
      );
    }

    return (
      fileExtensionsToInclude.some((p) => p.test(path.extname(entry.name))) &&
      !dirsToIgnore.some((pattern) => pattern.test(entry.parentPath))
    );
  });

  const files: string[] = [];
  const dirs: string[] = [];
  for (const entry of filtered) {
    const fullPath = path.resolve(entry.parentPath, entry.name);
    if (entry.isFile()) {
      files.push(fullPath);
    } else if (entry.isDirectory()) {
      dirs.push(fullPath);
    }
  }

  const dirPaths = dirs
    .map((dir) => path.relative(rootDir, dir).split("/"))
    .sort((p1, p2) => p1.length - p2.length);

  const nav: Nav = {};

  for (const dirPath of dirPaths) {
    let currentDir = nav;
    for (const dir of dirPath) {
      currentDir[dir] =
        typeof currentDir[dir] === "object" ? currentDir[dir] : {};
      currentDir = currentDir[dir];
    }
  }

  const relativeFilePaths = files.map((file) =>
    path.relative(rootDir, file).split("/")
  );

  for (const relativePath of relativeFilePaths) {
    let currentDir = nav;
    for (const entry of relativePath) {
      if (typeof currentDir[entry] === "object") {
        currentDir = currentDir[entry];
      } else {
        const parsed = path.parse(entry);
        currentDir[parsed.name] = parsed.name;
      }
    }
  }

  return nav;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toSideBarNav(
  nav: Nav,
  rootDir: string | undefined = undefined
): DefaultTheme.Sidebar {
  return Object.fromEntries(
    Object.entries(nav)
      .map(([entryName, entryContent]) => {
        if (typeof entryContent !== "object") return [];
        return [
          `/${entryName}`,
          [toSideBarItem(entryName, entryContent, [], rootDir)],
        ];
      })
      .filter((keyValue) => keyValue.length > 0)
  );
}

function toSideBarItem(
  entryName: string,
  content: Filename | Nav,
  parentPath: string[],
  rootDir: string | undefined
): DefaultTheme.SidebarItem {
  if (typeof content === "string") {
    const defaultText = capitalizeFirstLetter(content);
    if (!rootDir) {
      return { text: defaultText, link: `/${content}` };
    }
    const bytesToRead = 500;
    const buffer = Buffer.alloc(bytesToRead); // Read first 500 bytes
    const pathToMarkdown = path.resolve(
      rootDir,
      ...parentPath,
      `${content}.md`
    );
    const fd = fs.openSync(pathToMarkdown, "r");
    const bytesRead = fs.readSync(fd, buffer, 0, bytesToRead, 0);

    if (bytesRead === 0) {
      return { text: defaultText, link: `/${content}` };
    }
    fs.closeSync(fd);
    const partialContent = buffer.subarray(0, bytesRead).toString("utf8");

    const metadata = Object.fromEntries(
      partialContent
        .split("\n")
        .filter((line) => line.includes(":"))
        .map((line) => {
          const [key, value] = line.split(":");
          if (!key || !value) return undefined;
          return [key.trim().toLowerCase(), value.trim()];
        })
        .filter((keyPair) => keyPair !== undefined)
    );

    const titleParts = [metadata.emoji ?? "", metadata.title ?? defaultText].filter(
      (s) => s !== ""
    );

    return { text: titleParts.join(" "), link: `/${content}` };
  }

  const items = Object.entries(content).map((entry) =>
    toSideBarItem(entry[0], entry[1], [...parentPath, entryName], rootDir)
  );

  const indexFileIdx = items.findIndex(
    ({ text }) => typeof text === "string" && text.toLowerCase() === "index"
  );
  const [indexFile] =
    indexFileIdx >= 0 ? items.splice(indexFileIdx, 1) : [undefined];

  return {
    base: `/${
      parentPath.length > 0 ? `${parentPath.join("/")}/` : ""
    }${entryName}`,
    text: capitalizeFirstLetter(entryName),
    items: indexFile ? [indexFile].concat(items) : items,
  };
}

export { toSideBarNav, walkDir };

// Run only if this file is executed directly
if (process.argv[1] === import.meta.filename) {
  const sideBar = toSideBarNav(walkDir(DOCS_DIR), DOCS_DIR);
  console.log(util.inspect(sideBar, undefined, null));
}
