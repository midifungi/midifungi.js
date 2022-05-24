import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  async enhance () {
    if (!__VUEPRESS_SSR__) {
      const mod = await import ('../../node_modules/p5/lib/p5.min.js')
      await import('../../src/midifungi.js')

      if (typeof mod.default === 'function') {
        new mod.default()
      } else {
        new window.p5()
      }
    }
  }
})