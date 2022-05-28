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
        // Cap size at 300
        const size = min(width, height, 300)
        
        $waterModel = new window.WaterModel(size, size, {
          resolution: 1,
          interpolate: true,
          damping: 0.985,
          clipping: 5,
          evolveThreshold: 0.05,
          maxFps: 0,
        })
        
        $waterCanvas = new window.WaterCanvas(size, size, 'sketch-002', $waterModel, {
          backgroundImageUrl: Layers.glass.canvas.elt,
          lightRefraction: 20,
          lightReflection: 0.5,
        })
        $waterCanvas.canvas.style.vibility = 'hidden'
        
        // Create a bunch of touch points
        for (let i = 0; i < minSize / 10; i++) {
          $waterModel.touchWater(random(size), random(size), 1.5, window.finger)
        }
        
        $waterModel.setMaxFps(30)
      }
      
      $model = $waterModel
      $canvas = $waterCanvas
    },
    
    draw (offscreen) {
      // Stop looping
      if (!this.store.model?.evolving) return
      if ($frames++ > 90) {
        this.store.model.evolving = false
      }

      offscreen.push()
      offscreen.drawingContext.globalCompositeOperation = 'source-over'
      offscreen.drawingContext.drawImage($canvas.canvas, 0, 0)
      offscreen.drawingContext.globalCompositeOperation = 'destination-in'
      offscreen.image(Layers.glass.canvas, 0, 0)
      offscreen.pop()

      // Size fo the draw area
      const size = min(width, height, 300)
      let scale
      if (width > height) {
        scale = height / size
      } else {
        scale = width / size
      }

      let offsetX = (width - size * scale) / 2
      let offsetY = (height - size * scale) / 2
      
      clear()
      image(offscreen, offsetX, offsetY, width*scale, height*scale)
    }
  })
})
}