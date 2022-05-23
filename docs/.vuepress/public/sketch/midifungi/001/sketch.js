export default function () {
Layers.generate(() => {
  // Number of points per lily pad
  const lilyDetail = 30
  
  new Layer({
    id: 'pads',
    noLoop: true,

    store: {
      pads: []
    },
    
    setup () {
      // Create some lily pads
      const numPads = random(8, 16)
      for (let i = 0; i < numPads; i++) {
        let angle = random(0, TWO_PI)
        let size = (random() > .2 ? random(.05, .08) : random(.05, .15)) * minSize
        let dist = random(.1, .25) * minSize
        let x = width/2 - cos(angle) * dist
        let y = height/2 - sin(angle) * dist
        
        // Create a noisy circle
        angle = 0
        const lily = []
        for (let n = 0; n < lilyDetail; n++) {
          let xx = cos(angle) * size * map(noise(i*1000+n*.25), 0, 1, .9, 1.1) + x
          let yy = sin(angle) * size * map(noise(i*1000+n*.25), 0, 1, .9, 1.1) + y
          lily.push([xx, yy])
          angle += TWO_PI / lilyDetail
        }

        $pads.push({
          points: lily,
          size: size
        })
      }

      // Sort by size
      $pads.sort((a, b) => a.size > b.size ? 1 : -1)
    },
    
    draw () {
      background(0)
      fill(255)

      // Draw lilies
      $pads.forEach(pad => {
        beginShape()
        pad.points.forEach(point => {
          vertex(point[0], point[1])
        })
        endShape(CLOSE)
      })
    }
  })
})
}