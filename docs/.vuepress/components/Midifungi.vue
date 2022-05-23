<template>
  <div class="layers-wrap" :style="{height: wrapHeight}" ref="target"></div>
</template>

<script>
export default {
  props: {
    /**
     * List of paths to sketch scripts to load
     * Prefix with @username/001/path to load /sketch/midifungi/001/path.js
     */
    layers: Array,
    height: Number
  },

  computed: {
    wrapHeight () {return (this.height || 450) + 'px'}
  },

  mounted () {
    this.layers && this.layers.forEach(path => {
      if (path[0] === '@') {
        path = path.substr(1)
      }
      import(`../public/sketch/${path}.js`).then(m => {
        Layers.target = this.$refs.target
        m.default()
      })
    })
  }
}
</script>