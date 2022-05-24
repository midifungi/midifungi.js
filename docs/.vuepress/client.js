import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  async enhance () {
    if (!__VUEPRESS_SSR__) {
      await import ('../../node_modules/p5/lib/p5.min.js')
      await import('../../src/midifungi.js')
      new window.p5()
    }
  }
})