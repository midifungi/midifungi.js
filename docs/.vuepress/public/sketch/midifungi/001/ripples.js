export default function () {
  Layers.generate(() => {
    new Layer({
      id: 'ripples',
      noLoop: true,
  
      // We create the lilies before the ripples so we shift this layer below them
      setup () {
        this.moveDown()
      },
  
      beforeGenerate () {
        // Layers.lilies.generate()
        // Layers.lilies.draw()
      },

      draw () {
        background(this.colors[4])
        noFill()
        
        Layers.lilies.store.pads.forEach(pad => {
          for (let i = 1; i < 5; i++) {
            stroke(255, 1 - i/5)
            circle(pad.x, pad.y, pad.size * 1.5*i)
          }
        })
      }
    })
  })
}