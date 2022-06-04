<template>
<div class="window window-component mb-md" ref="window">
  <div class="title-bar" v-if="hasTitlebar">
    <div class="title-bar-text">{{windowTitle}}</div>
    <div class="title-bar-controls" v-if="hasTitlebarControls">
      <button v-if="help" aria-label="Help" @click="onHelp"></button>
      <button v-if="minimize" aria-label="Minimize" @click="onMinimize"></button>
      <button v-if="maximize || minimize" aria-label="Restore" @click="onRestore"></button>
      <button aria-label="Maximize" @click="onMaximize"></button>
    </div>
  </div>
  <div class="window-body">
    <div class="midifungi-layers-wrap-outer">
      <div class="midifungi-layers-wrap" :style="{height: height}" ref="target"></div>
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
    help: String
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
  },
  beforeUnmount () {
    Layers.dispose()
  },

  methods: {
    loadLayers () {
      const $this = this
      $this.layers && $this.layers.forEach((path, i) => {
        if (path[0] === '@') {
          path = path.substr(1)
        }
        $this.maybeLoadScript(path, i)
      })
    },
    
    maybeLoadScript (path, i) {
      if (!window.Layers) {
        setTimeout(() => this.maybeLoadScript(path, i), 0)
      } else {
        this.loadScript(path, i)
      }
    },
    
    async loadScript (path, i) {
      // Unfortunately we have to split this out with vite
      // @see https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
      const splitName = path.split('/')
      let sketch
      if (splitName.length === 1) {
        sketch = await import(`../public/sketch/${splitName[0]}.js`)
      } else if (splitName.length === 2) {
        sketch = await import(`../public/sketch/${splitName[0]}/${splitName[1]}.js`)
      } else if (splitName.length === 3) {
        sketch = await import(`../public/sketch/${splitName[0]}/${splitName[1]}/${splitName[2]}.js`)
      } else if (splitName.length === 4) {
        sketch = await import(`../public/sketch/${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}.js`)
      } else if (splitName.length === 5) {
        sketch = await import(`../public/sketch/${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}.js`)
      } else if (splitName.length === 6) {
        sketch = await import(`../public/sketch/${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}.js`)
      } else if (splitName.length === 7) {
        sketch = await import(`../public/sketch/${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}/${splitName[6]}.js`)
      }

      Layers.target = this.$refs.target
      this.loadedLayers[i] = sketch
      this.numLoadedLayers++

      if (this.numLoadedLayers === this.layers.length) {
        this.loadedLayers.forEach(sketch => {
          sketch.default()
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

    onHelp (ev) {
      // Unfortunately we have to split this out with vite
      // @see https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
      let page = ''
      let helpLink = this.help
      if (this.help[0] === '@') {
        helpLink = this.help.substr(1)
        page = `/sketches/`
      }

      const splitName = helpLink.split('/')
      if (splitName.length === 1) {
        page += `${splitName[0]}.html`
      } else if (splitName.length === 2) {
        page += `${splitName[0]}/${splitName[1]}.html`
      } else if (splitName.length === 3) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}.html`
      } else if (splitName.length === 4) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}.html`
      } else if (splitName.length === 5) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}.html`
      } else if (splitName.length === 6) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}.html`
      } else if (splitName.length === 7) {
        page += `${splitName[0]}/${splitName[1]}/${splitName[2]}/${splitName[3]}/${splitName[4]}/${splitName[5]}/${splitName[6]}.html`
      }

      this.$router.push(page)
    }
  }
}
</script>