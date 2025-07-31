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
        ],
      },
    ],
    search: {
      provider: "local", // local site indexing with minisearch + search bar
    },
    sidebar: {
      "/manga/": [
        {
          text: "Manga",
          items: [
            { text: "Index", link: "/manga/" },
            { text: "✅ Naruto", link: "/manga/naruto" },
            { text: "🔄⏳📅 One Piece", link: "/manga/one-piece" },
            {
              text: 'recursive', collapsed: true, items: [
                { text: 'Naruto again', link: '/manga/naruto' },
                { text: 'One piece again', link: '/manga/one-piece' },
              ]
            }
          ],
        },
      ],
      "/game/": [
        {
          text: "Game",
          items: [
            { text: "Index", link: "/game/" },
            { text: "✅ The Last of Us", link: "/game/tlou" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Fa3ris" }],
  },
  head: [["link", { rel: "icon", href: "/checklist.png" }]],
});
