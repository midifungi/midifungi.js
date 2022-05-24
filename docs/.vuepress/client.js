import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  async enhance () {
    if (!__VUEPRESS_SSR__) {
      const mod = await import ('../../node_modules/p5/lib/p5.min.js')
      await import('../../src/midifungi.js')

      if (typeof mod.default === 'function') {
        window.p5 = new mod.default
      }
      new window.p5()
    }
  }
})