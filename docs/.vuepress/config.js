const {viteBundler} = require('@vuepress/bundler-vite')
const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')
const {themeDataPlugin} = require('@vuepress/plugin-theme-data')
// const {searchPlugin} = require('@vuepress/plugin-search')
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
      components: {
        Midifungi: path.resolve(__dirname, './components/Midifungi.vue'),
        Example: path.resolve(__dirname, './components/Example.vue'),
      }
    }),

    // @see https://v2.vuepress.vuejs.org/reference/plugin/search.html#issearchable
    // searchPlugin({
    //   locales: {
    //     '/': {
    //       placeholder: 'Search'
    //     }
    //   }
    // }),

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
            text: '🏎️ Quick Start',
            link: '/',
          },
          {
            text: '✨ Why Midifungi?',
            link: '/why.md',
          },
          {
            text: '🪄 Overview',
            link: '/overview.md',
          },
          {
            text: '🤹 Managing Layers',
            link: '/layers.md',
          },
          {
            text: '🎛️ Context Menus',
            link: '/menus.md',
          },
          {
            text: '🎹 MIDI Mapping',
            link: '/midi.md',
          },
          {
            text: '🖼️ Gallery',
            link: '/sketches/',
            collapsible: true,
            children: [
              {
                text: '001 - Lily Pads',
                link: '/sketches/midifungi/1.html'
              },
              {
                text: '002 - Billions and Billions',
                link: '/sketches/midifungi/2.html'
              },
              {
                text: '003 - Spirit Emojis',
                link: '/sketches/midifungi/3.html'
              },
              {
                text: '004 - Schrödinger\'s Train',
                link: '/sketches/midifungi/4.html'
              },
            ]
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
          {
            text: '🙋 Get involved',
            link: '/get-involved.md'
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