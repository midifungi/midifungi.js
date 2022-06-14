export default function () {
class Square {
  constructor (opts) {
    Object.assign(this, opts)
  }

  draw () {
    fill(this.color)
    rect(this.x, this.y, this.size, this.size)
  }
}

Layers.create(() => {
  new Layer({
    id: 'border',

    menu: {
      bg () {return this.colors}
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
          color: this.colors[wrap(colorCount++, 0, this.colors.length)]
        }))
      }
      // East
      for (let i = 1; i < vertCount-1; i++) {
        $squares.push(new Square({
          size,
          x: width-size,
          y: i*size,
          color: this.colors[wrap(colorCount++, 0, this.colors.length)]
        }))
      }
      // South
      for (let i = horizCount; i > 0; i--) {
        $squares.push(new Square({
          size,
          x: i*size,
          y: height-size,
          color: this.colors[wrap(colorCount++, 0, this.colors.length)]
        }))
      }
      // West
      for (let i = vertCount-1; i > 0; i--) {
        $squares.push(new Square({
          size,
          x: 0,
          y: i*size,
          color: this.colors[wrap(colorCount++, 0, this.colors.length)]
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