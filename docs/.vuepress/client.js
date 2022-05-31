import {defineClientConfig} from '@vuepress/client'
import midifungi from '@lib/midifungi'
import * as Tweakpane from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export default defineClientConfig({
  async enhance ({}) {
    if (!__VUEPRESS_SSR__) {
      window.Layers = midifungi.Layers
      window.Layer = midifungi.Layer

      // Tweakpane doesn't work within a script module so we need to manually register it
      window.Tweakpane = Tweakpane
      window.TweakpaneEssentialsPlugin = EssentialsPlugin
      
      // We have to load p5 weirdly because it polutes the global space
      const mod = await import ('../../node_modules/p5/lib/p5.min.js')
    }
  }
})