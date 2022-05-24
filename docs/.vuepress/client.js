import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  enhance () {
    if (!__VUEPRESS_SSR__) {
      import ('../../node_modules/p5/lib/p5.min.js').then(() => {
        import('../../src/midifungi.js').then(() => {
          new window.p5()
        })
      })
    }
  }
})