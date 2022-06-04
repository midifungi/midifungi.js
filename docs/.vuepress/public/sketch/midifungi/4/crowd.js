export default function () {
class Emoji {
  constructor () {
    this.emoji = random(Emojis.tag.faces)
    this.x = random(-width, width)
    this.y = height/1.5
    this.z = height-random(minSize*.7)
    this.speed = random(2, 10)
    this.hidden = false
  }

  draw () {
    const sx = map(this.x / this.z, 0, 1, 0, width)
    const sy = map(this.y / this.z, 0, 1, 0, height)

    let scale = map(this.z, 0, maxSize, minSize*.4, minSize*.05)
    textSize(max(0, scale))
    text(this.emoji, sx, sy)
  }
}
  
Layers.create(() => {
  new Layer({
    id: 'crowd',
    noLoop: true,

    store: {
      things: []
    },
    
    setup () {
      $things = []
      for (let i = 0; i < minSize*1.5; i++) {
        $things.push(new Emoji())
      }
      drawingContext.shadowBlur = 5
      drawingContext.shadowColor = '#000'
    },

    draw () {
      clear()
      $things.sort((a, b) => b.z - a.z)

      push()
      translate(width/2, 0)
      fill(Layers.default.colors[6])
      rect(-width/2, height/1.35, width, height)
      $things.forEach(thing => {
        thing.draw()
      })
      pop()
    }
  })
})
}