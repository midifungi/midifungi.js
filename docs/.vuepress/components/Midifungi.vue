<template>
<div class="window window-component mb-md" ref="window">
  <div class="title-bar" v-if="hasTitlebar">
    <div class="title-bar-text" @click="onHelp" style="cursor: pointer">{{windowTitle}}</div>
    <div class="title-bar-controls" v-if="hasTitlebarControls">
      <button v-if="help" aria-label="Help" @click="onHelp"></button>
      <button v-if="minimize" aria-label="Minimize" @click="onMinimize"></button>
      <button v-if="maximize || minimize" aria-label="Restore" @click="onRestore"></button>
      <button aria-label="Maximize" @click="onMaximize"></button>
    </div>
  </div>
  <div class="window-body">
    <div class="midifungi-layers-wrap-outer" :style="{height: height ? height + 'px' : null}">
      <div class="midifungi-layers-wrap" ref="target"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  // List of paths to sketch scripts to load
  // Prefix with @username/001/path to load /sketch/midifungi/001/path.js
  props: {
    layers: Object,
    height: [Number, String],
    title: String,
    maximize: {
      type: Boolean,
      default: true
    },
    minimize: Boolean,
    help: String,
    stack: null
  },

  /**
   * Create an empty array to hold the layer modules
   * Once they are all loaded, we'll run them sequentially
   */
  data() {
    return {
      isMinimized: false,
      isMaximized: false,
      loadedLayers: Array(this.layers.length).fill(null),
      numLoadedLayers: 0,
    }
  },

  computed: {
    hasTitlebar () {
      return this.hasTitlebarControls || this.title
    },
    hasTitlebarControls () {
      return this.maximize || this.minimize
    },
    windowTitle () {return this.title || this.$page.title}
  },

  mounted () {
    this.loadLayers()
    this.stackId = this.stack || `stack${~~(Math.random() * 999999)}`
  },
  beforeUnmount () {
    Layers.dispose()
  },

  methods: {
    loadLayers () {
      const $this = this
      $this.layers && $this.layers.forEach((layer, i) => {
        // Convert to array
        if (typeof layer === 'string') {
          layer = [layer]
        }

        if (layer[0][0] === '@') {
          layer[0] = '/sketch/' + layer[0].substr(1)
        }
        $this.maybeLoadScript(layer, i)
      })
    },
    
    maybeLoadScript (layer, i) {
      if (!window.Layers) {
        setTimeout(() => this.maybeLoadScript(layer, i), 0)
      } else {
        this.loadScript(layer, i)
      }
    },
    
    async loadScript (layer, i) {
      let path = layer[0]
      let data = layer[1] || {}
      
      // Unfortunately we have to split this out with vite
      // @see https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
      const splitName = path.split('/')
      let sketch
      if (splitName.length === 1) {
        sketch = await import(`${splitName[0]}.js`)
      } else if (splitName.length === 2) {
        sketch = await import(`${splitName[0]}/${splitName[1]}.js`)
      } else if (splitName.length === 3) {
        sketch = await import(`${splitName[0]}/${splitName[1]}/${splitName[2]}.js`)
      } else if (splitName.length === 4) {
        sketch = await import(`${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}.js`)
      } else if (splitName.length === 5) {
        sketch = await import(`${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}.js`)
      } else if (splitName.length === 6) {
        sketch = await import(`${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}.js`)
      } else if (splitName.length === 7) {
        sketch = await import(`${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}/${splitName[6]}.js`)
      }

      Layers.target = this.$refs.target
      Layers.curStack = this.stackId
      layer.sketch = sketch.default
      layer.path = path
      layer.config = data
      this.loadedLayers[i] = layer

      if (++this.numLoadedLayers === this.layers.length) {
        this.loadedLayers.forEach((layer, n) => {
          // globalThis.config = layer.config
          layer.sketch(layer.config)
        })
      }
    },

    /**
     * Handle window resize
     */
    onMinimize () {
      this.$refs.window.classList.add('minimized')
      this.$refs.window.classList.remove('maximized')
      this.isMinimized = true
      this.isMaximized = false
      Layers.trigger('resize')
    },

    onMaximize () {
      this.$refs.window.classList.add('maximized')
      this.$refs.window.classList.remove('minimized')
      this.isMinimized = false
      this.isMaximized = true
      Layers.trigger('resize')
    },
    
    onRestore () {
      this.$refs.window.classList.remove('maximized', 'minimized')
      this.isMinimized = false
      this.isMaximized = false      
      Layers.trigger('resize')
    },

    onHelp () {
      if (!this.help) return
      
      // Unfortunately we have to split this out with vite
      // @see https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
      let page = ''
      let helpLink = this.help
      if (this.help[0] === '@') {
        helpLink = this.help.substr(1)
        page = `/gallery/`
      }

      const splitName = helpLink.split('/')
      // If not ending with slash, add .html
      if (splitName[splitName.length - 1] !== '/') {
        helpLink += '.html'
      }
      
      if (splitName.length === 1) {
        page += `${splitName[0]}`
      } else if (splitName.length === 2) {
        page += `${splitName[0]}/${splitName[1]}`
      } else if (splitName.length === 3) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}`
      } else if (splitName.length === 4) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}`
      } else if (splitName.length === 5) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}`
      } else if (splitName.length === 6) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}`
      } else if (splitName.length === 7) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}/${splitName[6]}`
      }

      this.$router.push(page)
    }
  }
}
</script>