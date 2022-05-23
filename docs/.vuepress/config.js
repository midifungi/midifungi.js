const { viteBundler } = require('@vuepress/bundler-vite')
const { path } = require('@vuepress/utils')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  title: 'Midifungi 🎹🍄',
  description: 'A layer-based p5.js framework with live editing and MIDI support',

  plugins: [
    [
      registerComponentsPlugin({
        components: {
          // Home page getting started
          example001: path.resolve(__dirname, './components/example/001-simple-layer/Sketch.vue'),
          example001x2: path.resolve(__dirname, './components/example/001-simple-layer/Sketch2.vue'),
        }
      }),
    ],
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

  theme: defaultTheme({
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
        text: '🖼️ Example Sketches',
        link: '/sketches/'
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
  })
}