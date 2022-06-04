export default function () {
class Emoji {
  constructor () {
    this.emoji = random(Emojis.tag.faces)
    this.x = random(-width, width)
    this.y = height/1.5 + minSize*.3
    this.z = random(width)
    this.speed = random(2, 10)
    this.hidden = false
  }

  update () {
    this.z -= this.speed
    if (this.z < width/3) {
      // this.x = random(-width, width)
      // this.y = height/2 + minSize*.35
      // this.z = random(width)
      this.hidden = true
    }
  }

  draw () {
    if (this.hidden) return
    const sx = map(this.x / this.z, 0, 1, 0, width)
    const sy = map(this.y / this.z, 0, 1, 0, height)

    let scale = map(this.z, 0, width, minSize*.4, minSize*.05)
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
      for (let i = 0; i < width*3; i++) {
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
      $things.forEach(thing => {
        thing.update()
        thing.draw()
      })
      pop()
    }
  })
})
}