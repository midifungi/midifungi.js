const {viteBundler} = require('@vuepress/bundler-vite')
const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')
const {themeDataPlugin} = require('@vuepress/plugin-theme-data')
const pkg = require('../../package.json')
const {localTheme} = require('./theme')

module.exports = {
  title: 'Midifungi 🎛️🎹',
  description: 'A layer-based p5.js framework with live editing and MIDI support',
  theme: localTheme(),

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
        // Globals
        pkgVersion: pkg.version,
        env: process.env,

        // Theme
        logo: '/midifungi-title.png',
        repo: 'midifungi/midifungi.js',
        
        locales: {
          '/': {
            editLinkText: 'Edit this page on GitHub',
            lastUpdatedText: 'Last updated',
            contributorsText: 'Contributors',
          }
        },

        // @todo Automate this
        sidebar: [
          {
            text: '👋 Introduction',
            link: '/'
          },
          {
            text: '📅 Daily Devlog',
            link: '/devlog/',
            collapsible: true,
            children: [
              {
                text: '22/06/09 - Cuckoo\'s Clock',
                link: '/devlog/220609.html'
              },
              {
                text: '22/06/10 - Cuckoo\'s Clock',
                link: '/devlog/220610.html'
              },
              {
                text: '22/06/11 - Emoji Evolution',
                link: '/devlog/220611.html'
              },
            ]
          },
          {
            text: '🖼️ Gallery',
            link: '/gallery/',
            collapsible: true,
            children: [
              {
                text: '001 - Lily Pads',
                link: '/gallery/1.html'
              },
              {
                text: '002 - Billions and Billions',
                link: '/gallery/2.html'
              },
              {
                text: '003 - Spirit Emojis',
                link: '/gallery/3.html'
              },
              {
                text: '004 - Arriving Home',
                link: '/gallery/4.html'
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
                link: '/midifungi.js/',
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
                link: '/midifungi.js/ref/'
              },
              {
                text: '🚀 Migrating Sketches',
                link: '/midifungi.js/migrating.md',
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
          '&': path.resolve(__dirname, '../../'),
          '@lib': path.resolve(__dirname, '../../src'),
        }
      }
    },
  }),
}