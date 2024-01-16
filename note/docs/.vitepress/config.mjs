import { defineConfig } from 'vitepress';
import getMarkdown from './utils';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Interview Note",
  description: "Personal Interview Note",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/JavaScript/Array.md' }
    ],

    sidebar: [
      {
        text: 'JavaScript',
        items: getMarkdown('JavaScript')
      },
      {
        text: 'compiler',
        items: getMarkdown('compiler')
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
