import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  async enhance () {
    if (!__VUEPRESS_SSR__) {
      const p = await import ('../../node_modules/p5/lib/p5.min.js')
      console.log(p)
      await import('../../src/midifungi.js')
      new window.p5()
    }
  }
})