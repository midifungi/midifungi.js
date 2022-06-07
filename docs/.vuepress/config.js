const {viteBundler} = require('@vuepress/bundler-vite')
const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')
const {themeDataPlugin} = require('@vuepress/plugin-theme-data')
const pkg = require('../../package.json')

module.exports = {
  title: 'Midifungi 🎛️🎹',
  description: 'A layer-based p5.js framework with live editing and MIDI support',

  head: [
    ['link', {rel: 'icon', type: 'image/png', href: '/midifungi.png'}]
  ],

  plugins: [
    // @see https://snippetors.github.io/plugins/vuepress-plugin-tabs.html
    registerComponentsPlugin({
      // componentsDir: path.resolve(__dirname, './components/'),
      components: {
        Midifungi: path.resolve(__dirname, './components/Midifungi.vue'),
        Example: path.resolve(__dirname, './components/Example.vue'),
        Window: path.resolve(__dirname, './components/Window.vue'),
      }
    }),

    themeDataPlugin({
      themeData: {
        logo: '/midifungi-title.png',
        
        pkgVersion: pkg.version,
        repo: 'midifungi/midifungi',
        locales: {
          '/': {
            editLinkText: 'Edit this page on GitHub',
            lastUpdatedText: 'Last updated',
            contributorsText: 'Contributors',
          }
        },
        sidebar: [
          {
            text: '👋 Introduction',
            link: '/'
          },
          {
            text: '📅 Daily Devlog',
            link: '/devlog/'
          },
          {
            text: '🖼️ Gallery',
            link: '/gallery/',
            collapsible: true,
            children: [
              {
                text: '001 - Lily Pads',
                link: '/gallery/midifungi/1.html'
              },
              {
                text: '002 - Billions and Billions',
                link: '/gallery/midifungi/2.html'
              },
              {
                text: '003 - Spirit Emojis',
                link: '/gallery/midifungi/3.html'
              },
              {
                text: '004 - Arriving Home',
                link: '/gallery/midifungi/4.html'
              },
            ]
          },
          {
            text: '🧑‍💻 Midifungi.js',
            link: '/midifungi.js/',
            collapsible: true,
            children: [
              {
                text: '🏎️ Quick Start',
                link: '/midifunigi.js/',
              },
              {
                text: '✨ Why Midifungi?',
                link: '/midifungi.js/why.md',
              },
              {
                text: '🪄 Overview',
                link: '/midifungi.js/overview.md',
              },
              {
                text: '🤹 Managing Layers',
                link: '/midifungi.js/layers.md',
              },
              {
                text: '🎛️ Context Menus',
                link: '/midifungi.js/menus.md',
              },
              {
                text: '🎹 MIDI Mapping',
                link: '/midifungi.js/midi.md',
              },
              {
                text: '📚 Reference',
                link: '/ref/'
              },
              {
                text: '🚀 Migrating Sketches',
                link: '/migrating.md',
              },
              {
                text: '🗺️ Roadmap',
                link: '/roadmap.md'
              },
            ]
          },
          {
            text: '🤝 Support Midifungi',
            link: '/support.md'
          },
        ]
      }
    })
  ],

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@examples': path.resolve(__dirname, './public/exampl'),
          '@sketches': path.resolve(__dirname, './public/sketch'),
          '@lib': path.resolve(__dirname, '../../src'),
        }
      }
    },
  }),
  
}