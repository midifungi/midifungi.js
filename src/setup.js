import p5Overrides from './p5-overrides.js'

document.addEventListener('DOMContentLoaded', function(event) {
  /**
   * Run Layers.generate callbacks
   */
  const onSetup = function () {
    window.params = Object.assign({
      fps: 30,
      seed: null,
      skipnoise: 0,
      
      // Width of canvas, centered
      width: 0,
      height: 0,
    }, getURLParams())
  
    // ccapture
    if (+params.record) {
      window.capturer = new CCapture({
        format: 'webm',
        framerate: +params.fps,
        verbose: true,
        display: true,
        timeLimit: +params.recordTime
      })

      !params.record && params.fps && frameRate(params.fps)
    }

    // let w = +params.width || min(windowWidth, windowHeight)
    // let h = +params.height || min(windowWidth, windowHeight)
    let w = +params.width || windowWidth
    let h = +params.height ||windowHeight
    window.windowRatio = min(w, h) / max(w, h)

    noLoop()
    createCanvas(w, h)
    recenter()
    canvas.style.display = 'none'
  
    /**
     * Handle keypressed across multiple files
     */
    window.windowResized = window.throttle(function () {
      let w = +params.width || windowWidth
      let h = +params.height || windowHeight
  
      resizeCanvas(w, h)
      generateLayers()
    }, 1000/60, {trailing: true})
  
    // Seed
    randomSeed(window._seed)
    noiseSeed(window._seed)
    reseed()

    // Global helpers
    window.minSize = min(width, height)
    window.maxSize = max(width, height)

    // Backup default states before any p5 overrides
    p5Overrides.forEach(key => {
      Layers._context[key] = window[key]
    })
    
    // Generate layers
    Layers.generateCallbacks && Layers.generateCallbacks.forEach(callback => callback())
    generateLayers()
  }

  /**
   * Reseeds seeds
   * @params {Int} seed (optional) Defaults to fxrand()
   */
  window.reseed = function (s) {
    if (typeof fxrand === 'function') {
      window._seed = s || window.params.seed || floor(fxrand() * 9999999)
    } else {
      window._seed = s || window.params.seed || floor(random(9999999))
    }
    randomSeed(window._seed)
    noiseSeed(window._seed)
  }

  /**
   * Recenter
   */
  window.recenter = function () {
    _renderer.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2, 'fixed')
  }

  // Run Layers.generate()
  if (window.setup) {
    const _setup = window.setup
    window.setup = function () {
      _setup()
      onSetup()
    }
  } else {
    window.setup = onSetup
  }
})