import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The List",
  description: "Things I did or plan to do someday... maybe",
  base: '/the-list',
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
      { text: "Deployment", link: "/deployment" },
    ],
    search: {
      provider: "local", // local site indexing with minisearch + search bar
    },
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/Fa3ris" }],
  },
  head: [["link", { rel: "icon", href: "/checklist.png" }]],
});
