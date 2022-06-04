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

    menu: {
      x: {min: -1000, max: 1000, default: 292},
      y: {min: -1000, max: 1000, default: 308},
      z: {min: -1000, max: 1000, default: 434},

      pitch: {min: -PI, max: PI, default: -3.141592653589793, step: .001},
      yaw: {min: -PI, max: PI, default: -1.458592653589793, step: .001},
      roll: {min: -PI, max: PI, default: -3.141, step: .001},
    },

    setup () {
      offscreen.textAlign(CENTER, CENTER)
      Layers.starfield.store.speed = random(.25, 1.5)
      Layers.starfield.store.size = random(minSize * .05, minSize * .025)
    },

    draw () {
      push()
        translate(-width/2, -height/2)

        // @fixme - I can't figure out how to create a transparent webgl canvas,
        // so I'm copying the starfield into this canvas
        image(Layers.starfield.canvas, 0, 0)

        // Create a new tracer
        if (frameCount%10 === 0) {
          $tracers.unshift(new Tracer())
        }

        // Draw the train into a canvas to circumvent the need to load a font
        offscreen.clear()
        offscreen.textSize(minSize * .8)
        offscreen.text('🚂', width/2, height/2)

        // Draw canvas onto a plane
        push()
          noStroke()
          texture(offscreen)
          translate($x, $y + sin(frameCount*.1), $z)
          rotateX($pitch)
          rotateY($yaw)
          rotateZ($roll)
          drawingContext.disable(drawingContext.DEPTH_TEST)
          plane(size * (offscreen.width/offscreen.height), size)
        pop()
      pop()
    }
  })
})
}