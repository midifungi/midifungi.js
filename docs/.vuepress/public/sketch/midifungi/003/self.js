export default function () {
// Size of emoji
const size = minSize * .5

// Represents the tracer
const Tracer = class {
  constructor () {
    this.size = size
  }
}

new Layer({
  id: 'self',

  menu: {
    emoji: ['🧘‍♂️', '🧘‍♀️', '🧘'],
    spacing: {min: .005, max: .03}
  },

  store: {
    tracers: []
  },

  setup () {
    textAlign(CENTER, CENTER)
  },
  
  draw () {
    clear() 
    
    // Create a new tracer
    if (frameCount%10 === 0) {
      $tracers.unshift(new Tracer())
    }

    // Main emoji
    drawingContext.shadowBlur = 0
    textSize(size)
    text($emoji, width/2, height/2)

    // Tracers
    $tracers.forEach((tracer, n) => {
      tracer.size -= size * $spacing
      textSize(tracer.size)
      text($emoji, width/2, height/2)

      if (tracer.size < minSize * .001) {
        $tracers.splice(n, 1)
      }
    })

    drawingContext.shadowBlur = 5
    drawingContext.shadowColor = '#000'
    textSize(size * .2 + size * sin(frameCount/this.fps) * .1)
    text('👁️', width/2, height/2)
  }
})
}

