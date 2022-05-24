<template>
  <div class="layers-wrap" :style="{height: wrapHeight}" ref="target"></div>
</template>

<script>
export default {
  props: [
    // List of paths to sketch scripts to load
    // Prefix with @username/001/path to load /sketch/midifungi/001/path.js
    'layers',
    'height',
  ],

  computed: {
    wrapHeight () {return (this.height || 450) + 'px'}
  },

  mounted () {
    this.layers && this.layers.forEach(path => {
      if (path[0] === '@') {
        path = path.substr(1)
      }
      this.maybeLoadScript(path)
    })
  },

  methods: {
    maybeLoadScript (path) {
      if (!window.Layers) {
        setTimeout(() => this.maybeLoadScript(path), 0)
      } else {
        this.loadScript(path)
      }
    },
    
    async loadScript (path) {
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
      sketch.default()
    }
  }
}
</script>