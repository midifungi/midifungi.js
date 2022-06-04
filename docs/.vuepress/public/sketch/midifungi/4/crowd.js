export default function () {
class Emoji {
  constructor () {
    const size = minSize * .4
    
    this.emoji = random(Emojis.tag.people)
    this.x = random(0-size/2, width+size/2)
    this.z = random(height/1.4-size/2, height+size/2)
    this.y = height/1.5 + this.z*.35
  }
}
  
Layers.create(() => {
  new Layer({
    id: 'crowd',
    noLoop: true,

    menu: {
      size: {min: 60, max: 100},
    },
    store: {
      things: []
    },
    
    setup () {
      for (let i = 0; i < $size; i++) {
        $things.push(new Emoji())
      }
      drawingContext.shadowBlur = 5
      drawingContext.shadowColor = '#000'

      // Sort by z
      $things.sort((a, b) => a.z - b.z)
    },

    draw () {
      clear()
      $things.forEach(thing => {
        textSize(minSize * .4)
        text(thing.emoji, thing.x, thing.y)
      })
    }
  })
})
}