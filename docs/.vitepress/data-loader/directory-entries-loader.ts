import matter from "gray-matter";
import { type LoaderModule, defineLoader } from "vitepress";

import path from "node:path";

export type YamlMetadata = Partial<{
    title: string;
    emoji: string;
    excerpt: string;
    imgURL: string;
    tags: string[];
}> & { path: string }

export const createLoaderForDirectory = (directory: string): LoaderModule => {

return defineLoader({
    watch: [`${process.cwd()}/docs/${directory}/**/*.md`, `!${process.cwd()}/docs/${directory}/**/index.md`],
    async load(watchedFiles): Promise<YamlMetadata[]> {
        return watchedFiles.map(filePath => {
            const parsed = matter.read(filePath,)
            const resolvedPath = path.relative(`${process.cwd()}/docs/${directory}`, `${process.cwd()}/${filePath}`);
            const yaml: YamlMetadata = { ...parsed.data, path: resolvedPath.replace(/\.md$/, '') }
            return yaml
        });
    }
})
} 