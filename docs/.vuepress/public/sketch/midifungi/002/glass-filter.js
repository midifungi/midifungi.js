export default function () {
Layers.generate(() => {
  new Layer({
    id: 'filter',

    store: {
      model: null,
      canvas: null
    },
    
    setup () {
      window.pixel = create2DArray(createRadialCanvas(2,2));
			window.raindrop = create2DArray(createRadialCanvas(4,4));
			window.finger = create2DArray(createRadialCanvas(14,14));

      $model = new window.WaterModel(width, height, {
        resolution: 2,
        interpolate: false,
        damping: 0.985,
        clipping: 5,
        evolveThreshold: 0.05,
        maxFps: 0,
      })

      $canvas = new window.WaterCanvas(width, height, 'sketch-002', $model, {
        backgroundImageUrl: Layers.glass.canvas.elt,
        lightRefraction: 20,
        lightReflection: 0.5,
      })
      $canvas.canvas.style.position = 'absolute'

      // window.enableMouseInteraction($model, 'sketch-002')
      // window.finger = [
      //   [0.5, 1.0, 0.5],
      //   [1.0, 1.0, 1.0],
      //   [0.5, 1.0, 0.5]
      // ]

      // Create a bunch of touch points
      for (let i = 0; i < minSize / 10; i++) {
        $model.touchWater(random(width), random(height), 1.5, window.finger)
      }

      setTimeout(() => {
        this.store.model.setMaxFps(0)
      }, 1000)
    },

    draw () {
      // drawingContext.globalCompositeOperation = 'source-over'
      // image(Layers.starfield.canvas, 0, 0)
      // drawingContext.globalCompositeOperation = 'destination-in'
      // image(Layers.glass.canvas, 0, 0)
    }
  })
})
}