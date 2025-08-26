import { defineConfig } from "vitepress";
import sidebar from "./sidebar";
import nav from "./nav";
import path from "path";

// https://vitepress.dev/reference/site-config

const base = '/the-list'
export default defineConfig({
  title: "The List",
  description: "Things I did or plan to do someday... maybe",
  base,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    lastUpdated: {
      text: "when did I update this",
      formatOptions: {
        dateStyle: "full",
        forceLocale: true,
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    search: {
      provider: "local", // local site indexing with minisearch + search bar
    },
    sidebar,
    aside: false,
    socialLinks: [{ icon: "github", link: "https://github.com/Fa3ris" }],
  },
  head: [["link", { rel: "icon", href: `${base}/checklist.png`, type: "image/png" }]],
  markdown: {
    config(md) {
      // automatically add the title to the markdown page
      md.core.ruler.before('normalize', 'custom_title', (state) => {
        const { title, emoji } = state.env.frontmatter || {}
        if (!title) { return }
        state.src = `# ${emoji ? `${emoji} ` : ''}${title}\n${state.src}`
      })
    }
  },
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve(import.meta.dirname, '..', '..', 'src'),
        '@vp': path.resolve(import.meta.dirname)
      }
    }
  }
});
