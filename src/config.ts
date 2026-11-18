import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  title: 'Vet Tech Solutions',
  description: 'SDVOSB Government IT Consulting',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Services', link: '/services' },
      { text: 'Booking', link: '/booking' },
      { text: 'Schedule', link: '/schedule' },
      { text: 'Contact', link: '/contact' }
    ],
    
    footer: {
      copyright: '© 2026 Vet Tech Solutions. All rights reserved.'
    }
  },

  // Disable dead link checking for inter-page links
  ignoreDeadLinks: true
})