<template>
  <div class="layers-wrap example-001"></div>
</template>

<script>
import bg from './bg'

export default {
  mounted () {
    Layers.target = document.querySelector('.layers-wrap.example-001')
    bg()
  },
}
</script>
