export default function () {
  let emojis = [
    'π§π»', 'π¦π»', 'π§π»', 'πΆπ»', 'π§πΌ', 'π¦πΌ', 'π§πΌ', 'πΆπΌ', 'π§π½', 'π¦π½', 'π§π½', 'πΆπ½', 'π§πΎ', 'π¦πΎ', 'π§πΎ', 'πΆπΎ', 'π§πΏ', 'π¦πΏ', 'π§πΏ', 'πΆπΏ',
    'π©π»', 'π¨π»', 'π§π»', 'π©π»βπ¦°', 'π¨π»βπ¦°', 'π§π»βπ¦°', 'π©π»βπ¦±', 'π¨π»βπ¦±', 'π§π»βπ¦±', 'π©π»βπ¦²', 'π¨π»βπ¦²', 'π§π»βπ¦²', 'π±π»ββοΈ', 'π±π»ββοΈ', 'π±π»', 'π³π»ββοΈ', 'π³π»ββοΈ', 'π³π»', 'π§π»', 'π§π»ββοΈ', 'π§π»ββοΈ', 'π©πΌ', 'π¨πΌ', 'π§πΌ', 'π©πΌβπ¦°', 'π¨πΌβπ¦°', 'π§πΌβπ¦°', 'π©πΌβπ¦±', 'π¨πΌβπ¦±', 'π§πΌβπ¦±', 'π©πΌβπ¦²', 'π¨πΌβπ¦²', 'π§πΌβπ¦²', 'π±πΌββοΈ', 'π±πΌββοΈ', 'π±πΌ', 'π³πΌββοΈ', 'π³πΌββοΈ', 'π³πΌ', 'π§πΌ', 'π§πΌββοΈ', 'π§πΌββοΈ', 'π©π½', 'π¨π½', 'π§π½', 'π©π½βπ¦°', 'π¨π½βπ¦°', 'π§π½βπ¦°', 'π©π½βπ¦±', 'π¨π½βπ¦±', 'π§π½βπ¦±', 'π©π½βπ¦²', 'π¨π½βπ¦²', 'π§π½βπ¦²', 'π±π½ββοΈ', 'π±π½ββοΈ', 'π±π½', 'π³π½ββοΈ', 'π³π½ββοΈ', 'π³π½', 'π§π½', 'π§π½ββοΈ', 'π§π½ββοΈ', 'π©πΎ', 'π¨πΎ', 'π§πΎ', 'π©πΎβπ¦°', 'π¨πΎβπ¦°', 'π§πΎβπ¦°', 'π©πΎβπ¦±', 'π¨πΎβπ¦±', 'π§πΎβπ¦±', 'π©πΎβπ¦²', 'π¨πΎβπ¦²', 'π§πΎβπ¦²', 'π±πΎββοΈ', 'π±πΎββοΈ', 'π±πΎ', 'π³πΎββοΈ', 'π³πΎββοΈ', 'π³πΎ', 'π§πΎ', 'π§πΎββοΈ', 'π§πΎββοΈ', 'π©πΏ', 'π¨πΏ', 'π§πΏ', 'π©πΏβπ¦°', 'π¨πΏβπ¦°', 'π§πΏβπ¦°', 'π©πΏβπ¦±', 'π¨πΏβπ¦±', 'π§πΏβπ¦±', 'π©πΏβπ¦²', 'π¨πΏβπ¦²', 'π§πΏβπ¦²', 'π±πΏββοΈ', 'π±πΏββοΈ', 'π±πΏ', 'π³πΏββοΈ', 'π³πΏββοΈ', 'π³πΏ', 'π§πΏ', 'π§πΏββοΈ', 'π§πΏββοΈ',
    'π΅π»', 'π΄π»', 'π§π»', 'π©π»βπ¦³', 'π¨π»βπ¦³', 'π§π»βπ¦³', 'π©π»βπ¦²', 'π¨π»βπ¦²', 'π§π»βπ¦²', 'π΅πΌ', 'π΄πΌ', 'π§πΌ', 'π©πΌβπ¦³', 'π¨πΌβπ¦³', 'π§πΌβπ¦³', 'π©πΌβπ¦²', 'π¨πΌβπ¦²', 'π§πΌβπ¦²', 'π΅π½', 'π΄π½', 'π§π½', 'π©π½βπ¦³', 'π¨π½βπ¦³', 'π§π½βπ¦³', 'π©π½βπ¦²', 'π¨π½βπ¦²', 'π§π½βπ¦²', 'π΅πΎ', 'π΄πΎ', 'π§πΎ', 'π©πΎβπ¦³', 'π¨πΎβπ¦³', 'π§πΎβπ¦³', 'π©πΎβπ¦²', 'π¨πΎβπ¦²', 'π§πΎβπ¦²', 'π΅πΏ', 'π΄πΏ', 'π§πΏ', 'π©πΏβπ¦³', 'π¨πΏβπ¦³', 'π§πΏβπ¦³', 'π©πΏβπ¦²', 'π¨πΏβπ¦²', 'π§πΏβπ¦²',
  ]

  class Square {
    constructor (opts) {
      Object.assign(this, opts)
      this.colorFrameCounter = 0
      this.colorOffset = 0
      
      this.emoji = random(emojis)
      this.rotateSpeed = random(.01, .1)
      this.angle = random(TWO_PI)
      this.curScale = random(1)
      this.scaleSpeed = random(.01, .1)
    }

    draw () {
      this.angle += this.rotateSpeed
      this.curScale += this.scaleSpeed
      
      // Cycle colors
      if (this.colorFrameCounter++ > this.layer.store.colorSpeed) {
        this.colorFrameCounter = 0
        this.colorOffset++
      }

      // Draw square
      let col = wrap(this.color-this.colorOffset, 0, this.layer.colors.length)
      fill(this.layer.colors[col])
      rect(this.x, this.y, this.size, this.size)

      // Draw emoji
      textSize(this.size*.5 + sin(this.curScale)*this.size*.2)
      textAlign(CENTER, CENTER)
      push()
      translate(this.x+this.size/2, this.y+this.size/2)
      rotate(this.angle)
      text(this.emoji, 0, 0)
      pop()
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
            layer: this,
          }))
        }
        // East
        for (let i = 1; i < vertCount-1; i++) {
          $squares.push(new Square({
            size,
            x: width-size,
            y: i*size,
            color: wrap(colorCount++, 0, this.colors.length),
            layer: this,
          }))
        }
        // South
        for (let i = horizCount; i > 0; i--) {
          $squares.push(new Square({
            size,
            x: i*size,
            y: height-size,
            color: wrap(colorCount++, 0, this.colors.length),
            layer: this,
          }))
        }
        // West
        for (let i = vertCount-1; i > 0; i--) {
          $squares.push(new Square({
            size,
            x: 0,
            y: i*size,
            color: wrap(colorCount++, 0, this.colors.length),
            layer: this,
          }))
        }
      },

      draw () {
        $squares.forEach(s => s.draw())
      }
    })
  })
}