import matter from "gray-matter";
import { type LoaderModule, defineLoader } from "vitepress";

import path from "node:path";

export type YamlMetadata = Partial<{
    title: string;
    emoji: string;
    excerpt: string;
    imgURL: string;
    imgAlt: string;
    tags: string[];
    highlight: boolean;
    score: number;
}> & { path: string }

const splitEmoji = (s: string) => [...new Intl.Segmenter().segment(s)].map(x => x.segment)


const emojiWeights: Record<string, number> = {
    "✅": 1,
    "⭐️": 3,
} as const


const calculateEmojiWeight = (emoji: string | undefined): number => {
    if (!emoji) return 0;

    return splitEmoji(emoji)
        .map(emoji => emojiWeights[emoji] ?? 0)
        .reduce((acc, weight) => acc + weight, 0);
};

const calculateTagWeight = (tags: string[] | undefined): number => {
    if (!tags) return 0;

    return tags
        .map(tag => tagWeights[tag] ?? 0)
        .reduce((acc, weight) => acc + weight, 0);
};

const WEIGHTS = {
    emoji: 2,
    tags: 1.5,
    highlight: 10,
    score: 1
} as const;

const calculateWeightedScore = (item: YamlMetadata): number => {

    const emojiScore = calculateEmojiWeight(item.emoji) * WEIGHTS.emoji;
    const tagScore = calculateTagWeight(item.tags) * WEIGHTS.tags;
    const highlightScore = item.highlight ? WEIGHTS.highlight : 0;
    const baseScore = (item.score ?? 0) * WEIGHTS.score;

    return emojiScore + tagScore + highlightScore + baseScore;
};


const weightedComparer = (a: YamlMetadata, b: YamlMetadata): number => {
    const weightA = calculateWeightedScore(a);
    const weightB = calculateWeightedScore(b);

    return weightB - weightA; // Higher weights first
};

const tagWeights: Record<string, number> = {
    "goat": 1,
    "big3": 3,
} as const

export const createLoaderForDirectory = (directory: string): LoaderModule => {


    return defineLoader({
        watch: [`${process.cwd()}/docs/${directory}/**/*.md`, `!${process.cwd()}/docs/${directory}/**/index.md`],
        load(watchedFiles): YamlMetadata[] {
            const data = watchedFiles.map(filePath => {
                const parsed = matter.read(filePath,)
                const resolvedPath = path.relative(`${process.cwd()}/docs/${directory}`, `${process.cwd()}/${filePath}`);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const yaml: YamlMetadata = { ...parsed.data, path: resolvedPath.replace(/\.md$/, ''), imgURL: (parsed.data.imgURL && `/${directory}/${parsed.data.imgURL}`) || undefined }
                return yaml
            });
            return [...data].sort(weightedComparer)
        }
    })
} 