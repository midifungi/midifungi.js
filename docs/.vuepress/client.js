import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  enhance () {
    if (!__VUEPRESS_SSR__) {
      let $script = document.createElement('script')
      $script.setAttribute('src', '/packages/p5.min.js')
      document.querySelector('head').appendChild($script)

      const mod = import('../../src/midifungi.js')
      window.Layers = mod.default
    }
  }
})