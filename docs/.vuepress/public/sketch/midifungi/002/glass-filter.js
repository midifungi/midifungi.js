export default function () {
/**
* This layer applies Watercanvas.js to the canvas
*/
let $waterModel
let $waterCanvas

Layers.generate(() => {
  new Layer({
    id: 'filter',
    menuDisabled: true,
    
    store: {
      model: null,
      canvas: null,
      frames: 0
    },
    
    onDispose () {
      this.store.model = null
      this.store.canvas = null
    },
    
    setup () {
      window.pixel = create2DArray(createRadialCanvas(2,2));
      window.raindrop = create2DArray(createRadialCanvas(4,4));
      window.finger = create2DArray(createRadialCanvas(14,14));
      
      if (!$waterModel) {
        $waterModel = new window.WaterModel(width, height, {
          resolution: 1,
          interpolate: true,
          damping: 0.985,
          clipping: 5,
          evolveThreshold: 0.05,
          maxFps: 0,
        })
        
        $waterCanvas = new window.WaterCanvas(width, height, 'sketch-002', $waterModel, {
          backgroundImageUrl: Layers.glass.canvas.elt,
          lightRefraction: 20,
          lightReflection: 0.5,
        })
        $waterCanvas.canvas.style.vibility = 'hidden'
        
        // Create a bunch of touch points
        for (let i = 0; i < minSize / 10; i++) {
          $waterModel.touchWater(random(width), random(height), 1.5, window.finger)
        }
        
        $waterModel.setMaxFps(30)
      }
      
      $model = $waterModel
      $canvas = $waterCanvas
    },
    
    draw () {
      // Stop looping
      if (!this.store.model.evolving) return
      if ($frames++ > 90) {
        this.store.model.evolving = false
      }
      
      drawingContext.globalCompositeOperation = 'source-over'
      this.canvas.drawingContext.drawImage($canvas.canvas, 0, 0)
      drawingContext.globalCompositeOperation = 'destination-in'
      image(Layers.glass.canvas, 0, 0)
    }
  })
})
}