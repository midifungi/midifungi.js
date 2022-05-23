export default function () {
// Create a new layer
new Layer({
  // Optional, but it'll let us target this layer with Layers.bg
  id: 'bg',

  // Exposes variables through a right-click menu
  // and to the MIDI mapping system
  menu: {
    // These will now be available as $color and $stroke
    color: {max: 360},
    stroke: {max: 360},
  },

  // p5 methods all now point to this layer
  setup () {
    rectMode(CENTER)
    strokeWeight(20)
  },
  
  // With noLoop this will only be called after this.setup()
  // and when any of the $variables change
  draw () {
    fill($color, .5, .5)
    stroke($stroke, .5, .5)
    rect(width/2, height/2, width/1.5, height/1.5)
  }
})
}