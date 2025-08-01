import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The List",
  description: "Things I did or plan to do someday... maybe",
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: "when did I update this",
      formatOptions: {
        dateStyle: "full",
        forceLocale: true,
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Categories",
        items: [
          { text: "Manga", link: "/manga/" },
          { text: "Game", link: "/game/" },
          { text: "Book", link: "/book/" },
          { text: "Movie", link: "/movie/" },
          { text: "Music", link: "/music/" },
          { text: "Programming", link: "/dev/" },
        ],
      },
    ],
    search: {
      provider: "local", // local site indexing with minisearch + search bar
    },
    sidebar: {
      "/manga/": [
        {
          base: '/manga',
          text: "Manga",
          items: [
            { text: "Index", link: "/index" },
            { text: "✅ Naruto", link: "/naruto" },
            { text: "🔄⏳📅 One Piece", link: "/one-piece" },
            {
              text: 'recursive', collapsed: true, items: [
                { text: 'Naruto again', link: '/naruto' },
                { text: 'One piece again', link: '/one-piece' },
              ]
            }
          ],
        },
      ],
      "/game/": [
        {
          base: '/game',
          text: "Game",
          items: [
            { text: "Index", link: "/" },
            { text: "✅ The Last of Us", link: "/tlou" },
            {
              base: '/game/action',
              text: 'Action',
              items: [
                {text: 'KH', link: "/kingdom-hearts"}
              ]
            },
{
              base: '/game/rpg',
              text: 'RPG',
              items: [
                {text: 'Pk Silver', link: "/pokemon-silver"}
              ]
            }
          ],
        },
      ],
      "/book/": [
        {
          base: '/book',
          text: "Book",
          items: [
            { text: "Index", link: "/" },
            { text: "✅ The Fault in our Stars", link: "/the-fault-in-our-stars" },
          ],
        },

      ],
      "/movie/": [
        {
          base: '/movie',
          text: "Movie",
          items: [
            { text: "Index", link: "/" },
            { text: "✅ The Arrival", link: "/arrival" },
          ],
        },
      ],
      "/music/": [
        {
          base: '/music',
          text: "Music",
          items: [
            { text: "Index", link: "/" },
            { text: "✅ Colors", link: "/colors" },
          ],
        },
      ],
      "/dev/": [
        {
          base: '/dev',
          text: "Programming",
          items: [
            { text: "Index", link: "/" },
            { text: "🚧 Breakout", link: "/breakout" },
          ],
        },
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Fa3ris" }],
  },
  head: [["link", { rel: "icon", href: "/checklist.png" }]],
});
