const {defaultTheme} = require('@vuepress/theme-default')
const {path} = require('@vuepress/utils')

module.exports = {
  localTheme: (options) => {
    return {
      name: 'vuepress-theme-local',
      extends: defaultTheme(options),
      layouts: {
        Layout: path.resolve(__dirname, './layouts/Layout.vue'),
        Devlog: path.resolve(__dirname, './layouts/Devlog.vue'),
        404: path.resolve(__dirname, './layouts/404.vue'),
      },
    }
  }
}