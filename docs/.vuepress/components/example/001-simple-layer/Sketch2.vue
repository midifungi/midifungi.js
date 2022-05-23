<template>
  <div class="layers-wrap example-002"></div>
</template>

<script>
import bg from './bg'
import shapes from './shapes'

export default {
  mounted () {
    Layers.target = document.querySelector('.layers-wrap.example-002')
    bg()
    shapes()
  },
}
</script>
