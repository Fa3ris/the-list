import { vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { toSideBarNav, walkDir } from './generate-site.js';


vi.mock("fs", async () => {
    const memfs = await vi.importActual("memfs");
    return { default: memfs, ...memfs };
});

describe('walkDir', () => {
    beforeEach(() => {
        vol.reset()
        vol.fromNestedJSON(
            {
                '/docs': {
                    '.vitepress': {},
                    'public': {
                        'icon.png': 'icon.png'
                    },
                    book: {
                        'index.md': 'index.md',
                        'foo.md': `---
Title: foo
Status: ✅
---
`
                    },
                    game: {
                        action: {
                            'baz.md': 'baz.md',
                        },
                    },
                },
            }
        )
    });

    describe('filtering directories', () => {
        it('should ignore .vitepress and public directories and non Markdown files', () => {
            expect(walkDir('/docs')).toStrictEqual({
                book: { foo: 'foo', index: 'index' },
                game: { action: { baz: 'baz' } }
            })
        });
    });
});


describe('toSideBarNav', () => {

    it('transform nav to side bar navigation', () => {
        expect(toSideBarNav({
            book: { foo: 'foo', index: 'index' },
        })).toStrictEqual({
            "/book": [
                {
                    base: '/book',
                    text: 'Book',
                    items: [
                        { text: "Index", link: "/index" },
                        { text: "Foo", link: "/foo" }
                    ]
                }
            ]
        })
    })

    it('multiple entries', () => {
        expect(toSideBarNav({
            book: { foo: 'foo', index: 'index' },
            game: { baz: 'baz' }
        })).toStrictEqual({
            "/book": [
                {
                    base: '/book',
                    text: 'Book',
                    items: [
                        { text: "Index", link: "/index" },
                        { text: "Foo", link: "/foo" }
                    ]
                }
            ],
            '/game': [{
                base: '/game',
                text: 'Game',
                items: [
                    { text: 'Baz', link: '/baz' }
                ]
            }]
        })
    })

    it('nested entries', () => {
        expect(toSideBarNav({
            game: { action: { baz: 'baz' } }
        })).toStrictEqual({
            "/game": [
                {
                    base: '/game',
                    text: 'Game',
                    items: [
                        {
                            base: '/game/action',
                            text: 'Action',
                            items: [
                                { text: 'Baz', link: "/baz" }
                            ]
                        }
                    ]
                }
            ]
        })
    })

    it('multiple nested entries', () => {
        expect(toSideBarNav({
            game: { action: { baz: 'baz' }, rpg: { japan: { pokemon: 'pokemon' } } }
        })).toStrictEqual({
            "/game": [
                {
                    base: '/game',
                    text: 'Game',
                    items: [
                        {
                            base: '/game/action',
                            text: 'Action',
                            items: [
                                { text: 'Baz', link: "/baz" }
                            ]
                        },
                        {
                            base: '/game/rpg',
                            text: 'Rpg',
                            items: [
                                {
                                    base: '/game/rpg/japan', text: 'Japan', items: [
                                        { text: 'Pokemon', link: '/pokemon' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    })

    it('ignore index if missing', () => {
        expect(toSideBarNav({
            book: { foo: 'foo', },
        })).toStrictEqual({
            "/book": [
                {
                    base: '/book',
                    text: 'Book',
                    items: [
                        { text: "Foo", link: "/foo" }
                    ]
                }
            ]
        })
    })

})