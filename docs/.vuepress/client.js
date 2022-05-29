import {defineClientConfig} from '@vuepress/client'
import {Layers, Layer} from '@lib/midifungi'

export default defineClientConfig({
  async enhance () {
    if (!__VUEPRESS_SSR__) {
      window.Layers = Layers
      window.Layer = Layer
      
      // We have to load p5 weirdly because it polutes the global space
      const mod = await import ('../../node_modules/p5/lib/p5.min.js')
      if (typeof mod.default === 'function') {
        window.p5 = mod.default
      }
      // new window.p5()
    }
  }
})