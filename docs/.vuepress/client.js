import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
  async enhance() {
    if (!__VUEPRESS_SSR__) {
      const mod = await import('../../src/midifungi.js')
      window.Layers = mod.default

      let $script = document.createElement('script')
      $script.setAttribute('src', '/packages/p5.js')
      document.querySelector('head').appendChild($script)
    }
  }
})