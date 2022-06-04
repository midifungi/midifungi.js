export default function () {
Layers.create(() => {
  new Layer({
    id: 'starfieldClone',
    store: {
      isRightSide: false,
    },
    
    setup () {
      $isRightSide = this.id === 'starfieldClone'
    },
    
    draw () {
      // Copy the existing starfield into this one
      if ($isRightSide) {
        image(Layers.starfield.canvas, -width, 0)
      } else {
        image(Layers.starfield.canvas, 0, 0)
      }
    }
  })
})
}