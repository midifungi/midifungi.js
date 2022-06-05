export default function () {
Layers.create(() => {
  new Layer({
    id: 'traffic',
    menu: {
      emoji: Emojis.tag.cars
    },
    store: {
      x: 0,
      y: 0,
      size: 0
    },
    methods: {
      /**
       * Drive by and clear reset the audience
       */
      resetCrowd () {
        $size = minSize * 3
        $y = height-$size/6
        $x = $size
      }
    },
    setup () {
      // Drive from left to right, so flip the emojis
      scale(-1, 1)
      textAlign(CENTER, CENTER)
      this.resetCrowd()
    },
    draw () {
      clear()
      $x -= $size*.05
      textSize($size)
      text($emoji, $x-$size*.35, $y)
    }
  })
})
}