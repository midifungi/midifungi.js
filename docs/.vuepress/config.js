const {viteBundler} = require('@vuepress/bundler-vite')
const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')
const {themeDataPlugin} = require('@vuepress/plugin-theme-data')
const pkg = require('../../package.json')

module.exports = {
  title: 'Midifungi 🎹🍄',
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
    themeDataPlugin({
      themeData: {
        pkgVersion: pkg.version,
        repo: 'midifungi/midifungi',
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
                text: '001 - Sillily pads',
                link: '/sketches/midifungi/001.html'
              },
              {
                text: '002 - Billions and Billions',
                link: '/sketches/midifungi/002.html'
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
          '@lib': path.resolve(__dirname, '../../src'),
        }
      }
    },
  }),
}