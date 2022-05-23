import { defineClientConfig } from '@vuepress/client'
import p5 from 'p5'
import '@lib/midifungi.js'

export default defineClientConfig({
  enhance({ app, router, siteData }){
    window.p5 = p5
  },
  setup(){},
  rootComponents: [],
})