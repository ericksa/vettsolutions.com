import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vet Tech Solutions',
  description: 'SDVOSB Government IT Consulting',
  base: '/',
  themeConfig: {
    siteName: 'Vet Tech Solutions (VTS Consulting)',
    logo: '/logo.png',
    anchor: {
      level: [2, 3]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Services', link: '/services/' },
      { text: 'Past Performance', link: '/past-performance/' },
      { text: 'Contact', link: '/contact/' },
    ],
    sidebar: [
      {
        text: 'Content',
        items: [
          { text: 'Home', link: '/' },
          { text: 'About Us', link: '/about/' },
          { text: 'Services', link: '/services/' },
          { text: 'Past Performance', link: '/past-performance/' },
          { text: 'Contact', link: '/contact/' },
        ],
      },
    ],
    footer: {
      copyright: '© 2026 Vet Tech Solutions LLC. SBA-Verified SDVOSB.',
    },
  },
})