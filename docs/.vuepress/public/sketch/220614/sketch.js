export default function () {
class Square {
  constructor (opts) {
    Object.assign(this, opts)
  }

  draw () {
    rect(this.x, this.y, this.size, this.size)
  }
}

Layers.create(() => {
  new Layer({
    id: 'border',

    menu: {},
    store: {
      squares: []
    },

    setup () {
      let horizCount = ~~random(10, 20)
      let size = width/horizCount
      let vertCount = height/size
      
      $squares = []
      // North
      for (let i = 0; i < horizCount; i++) {
        $squares.push(new Square({
          size,
          x: i*size,
          y: 0
        }))
      }
      // East
      for (let i = 1; i < vertCount-1; i++) {
        $squares.push(new Square({
          size,
          x: width-size,
          y: i*size
        }))
      }
      // South
      for (let i = horizCount; i > -1; i--) {
        $squares.push(new Square({
          size,
          x: i*size,
          y: height-size
        }))
      }
      // West
      for (let i = vertCount-1; i > 0; i--) {
        $squares.push(new Square({
          size,
          x: 0,
          y: i*size
        }))
      }
    },

    draw () {
      $squares.forEach(s => s.draw())
    }
  })
})
}