export default function () {
class Square {
  constructor (opts) {
    Object.assign(this, opts)
    this.colorFrameCounter = 0
    this.colorOffset = 0
  }

  draw () {
    if (this.colorFrameCounter++ > this.layer.store.colorSpeed) {
      this.colorFrameCounter = 0
      this.colorOffset++
    }
    
    let col = wrap(this.color-this.colorOffset, 0, this.layer.colors.length)
    
    fill(this.layer.colors[col])
    rect(this.x, this.y, this.size, this.size)
  }
}

Layers.create(() => {
  new Layer({
    id: 'border',

    menu: {
      bg () {return this.colors},
      colorSpeed () {return {
        min: ~~this.fps/15,
        max: ~~this.fps*.8,
        // default: .5
      }}
    },
    store: {
      squares: []
    },

    setup () {
      // Find a size that fills the border with squares perfectly
      // @see https://stackoverflow.com/questions/62015484/grid-of-squares-that-fits-within-any-width-height-container
      let minSquareSize = maxSize *.05
      let maxSquareSize = maxSize * .1
      let ratio = width/height
      if (ratio > 1) {
        ratio = 1/ratio
      }
      let size = maxSquareSize*ratio
      if (size < minSquareSize) {
        size = minSquareSize
      }
      
      let horizCount = width/size
      let vertCount = height/size
      
      let colorCount = 0
      $squares = []
      // North
      for (let i = 0; i < horizCount; i++) {
        $squares.push(new Square({
          size,
          x: i*size,
          y: 0,
          color: wrap(colorCount++, 0, this.colors.length),
          layer: this
        }))
      }
      // East
      for (let i = 1; i < vertCount-1; i++) {
        $squares.push(new Square({
          size,
          x: width-size,
          y: i*size,
          color: wrap(colorCount++, 0, this.colors.length),
          layer: this
        }))
      }
      // South
      for (let i = horizCount; i > 0; i--) {
        $squares.push(new Square({
          size,
          x: i*size,
          y: height-size,
          color: wrap(colorCount++, 0, this.colors.length),
          layer: this
        }))
      }
      // West
      for (let i = vertCount-1; i > 0; i--) {
        $squares.push(new Square({
          size,
          x: 0,
          y: i*size,
          color: wrap(colorCount++, 0, this.colors.length),
          layer: this
        }))
      }
    },

    draw () {
      background($bg)
      $squares.forEach(s => s.draw())
    }
  })
})
}