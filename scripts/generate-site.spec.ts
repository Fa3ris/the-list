import { vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { walkDir } from './generate-site.js';


vi.mock("fs", async () => {
    const memfs = await vi.importActual("memfs");
    return { default: memfs, ...memfs };
});

describe('walkDir', () => {
    beforeEach(() => {
        vol.reset()
    });

    describe('filtering directories', () => {
        it('should ignore .vitepress and public directories and non Markdown files', () => {
            vol.fromNestedJSON(
                {
                    '/docs': {
                        '.vitepress': {},
                        'public': {
                            'icon.png': 'icon.png'
                        },
                        book: {
                            'index.md': 'index.md',
                            'foo.md': 'foo.md'
                        },
                        game: {
                            action: {
                                'baz.md': 'baz.md',
                            },
                        },
                    },
                }
            )

            const result = walkDir('/docs');

            expect(result).toStrictEqual({
                book: { foo: 'foo', index: 'index' },
                game: { action: { baz: 'baz' } }
            })
        });

    });
});