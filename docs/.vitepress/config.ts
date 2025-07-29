import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The List",
  description: "Things I did or plan to do someday... maybe",
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: 'when did I update this',
      formatOptions: {
        dateStyle: 'full',
        forceLocale: true,
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    search: {
      provider: 'local' // local site indexing with minisearch + search bar
    },
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  head: [['link', { rel: 'icon', href: '/checklist.png' }]]
})
