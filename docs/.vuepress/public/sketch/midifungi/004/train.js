export default function () {
Layers.create(() => {
  // Size of emoji
  const size = minSize * .2

  // Represents the tracer
  const Tracer = class {
    constructor () {
      this.size = size
    }
  }  
  
  new Layer({
    id: 'train',
    renderer: WEBGL,

    store: {
      emoji: '🚂',
      tracers: []
    },

    setup () {
      offscreen.textAlign(CENTER, CENTER)
    },

    draw () {
      push()
      translate(-width/2, -height/2)
      image(Layers.starfield.canvas, 0, 0)

      offscreen.clear()
      offscreen.textSize(minSize * .8)
      offscreen.text('🚂', width/2, height/2)
      image(offscreen, 0, 0)

      pop()
    }
  })
})
}