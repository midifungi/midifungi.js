export default function () {
Layers.create(() => {
  // Size of emoji
  const size = minSize * .75

  // Represents the tracer
  const Tracer = class {
    constructor () {
      this.size = size
    }
  }

  new Layer({
    id: 'stationFg',

    menu: {
      emoji: ['🌴', '🌲', '🌳', '🌵']
    },

    store: {
      eyeHeight: random(1),
      tracers: []
    },

    setup () {
      textAlign(CENTER, CENTER)
      drawingContext.shadowBlur = 5
      drawingContext.shadowColor = '#000'
    },
    
    draw () {
      clear()
      push()
        // // Create a new tracer
        if (frameCount%10 === 0) {
          $tracers.unshift(new Tracer())
        }

        // Main emoji
        textSize(size)
        // text($emoji, width/2, height/2)

        // Tracers
        // $tracers.forEach((tracer, n) => {
        //   tracer.size -= size * .01
        //   textSize(tracer.size)
        //   text($emoji, width/2, height/2)

        //   if (tracer.size < minSize * .001) {
        //     $tracers.splice(n, 1)
        //   }
        // })

        textSize(size * .2)// + size * sin(frameCount/this.fps) * .1)
        // text('👁️👁️', 0, height/2 - $eyeHeight)
      pop()
    }    
  })
})
}