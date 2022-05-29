/**
 * Midifungi 🎹🍄
 * A p5js library that helps you organize your code into layers
 * ---
 * @version NPM_PACKAGE_VERSION
 * @license "Apache 2.0" with the addendum that you cannot use this or its output for NFTs without permission
 */

// Midifungi
import Layers from './layers/Layers.js'
import Layer from './layer/Layer.js'
import './helpers.js'
import p5Overrides from './p5-overrides.js'

// These are being added from somewhere but I can't pin point it yet
let _set, _get

/**
 * Run Layers.generate callbacks
 */
const onSetup = function () {
  if (!globalThis.p5) {
    setTimeout(onSetup, 1)
    return
  }

  // Exports
  globalThis.Layers = Layers
  globalThis.Layer = Layer

  globalThis.p5.disableFriendlyErrors = true
  Layers.init()

  // Restore funky _get, _set
  if (_get) {
    globalThis.get = _get
  }
  if (_set) {
    globalThis.set = _set
  }

  globalThis.params = Object.assign({
    fps: 30,
    seed: null,
    skipnoise: 0,
    
    // Width of canvas, centered
    width: 0,
    height: 0,
  }, globalThis.getURLParams())

  // ccapture
  if (+params.record) {
    globalThis.capturer = new CCapture({
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
  globalThis.windowRatio = min(w, h) / max(w, h)

  noLoop()
  createCanvas(w, h)
  recenter()
  canvas.style.display = 'none'

  /**
   * Handle keypressed across multiple files
   */
  globalThis.windowResized = globalThis.throttle(function () {
    let w = +params.width || windowWidth
    let h = +params.height || windowHeight

    resizeCanvas(w, h)
    generateLayers()
  }, 1000/60, {trailing: true})

  // Seed
  randomSeed(globalThis._seed)
  noiseSeed(globalThis._seed)
  reseed()

  // Global helpers
  globalThis.minSize = min(width, height)
  globalThis.maxSize = max(width, height)

  // Backup default states before any p5 overrides
  p5Overrides.forEach(key => {
    Layers._context[key] = window[key]
  })
  
  // Generate layers
  Layers.generateCallbacks && Layers.generateCallbacks.forEach(callback => callback())
  generateLayers()
}

/**
 * Onready
 */
function onReady () {
  if (globalThis.setup) {
    const _setup = globalThis.setup
    globalThis.setup = function () {
      _setup()
      onSetup()
    }
  } else {
    globalThis.setup = onSetup
  }

  /**
   * Run boilerplate code
   */
  globalThis.generateLayers = function (refresh) {
    if (refresh) {
      Layers.dispose()
      reseed()
    } else {
      randomSeed(globalThis._seed)
      noiseSeed(globalThis._seed)
    }
  
    // Remove all layers and apply some basic setup
    Layers.setup = function (canvas) {
      let minSize = min(this.width, this.height)
      let strokeKilos = max(2, minSize * .01)
      canvas.stroke(0)
      canvas.strokeWeight(strokeKilos)
    }
  }

  /**
   * Reseeds seeds
   * @params {Int} seed (optional) Defaults to fxrand()
   */
  globalThis.reseed = function (s) {
    if (typeof fxrand === 'function') {
      globalThis._seed = s || globalThis.params.seed || floor(fxrand() * 9999999)
    } else {
      globalThis._seed = s || globalThis.params.seed || floor(random(9999999))
    }
    randomSeed(globalThis._seed)
    noiseSeed(globalThis._seed)
  }

  /**
   * Recenter
   */
  globalThis.recenter = function () {
    _renderer.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2, 'fixed')
  }
}

if (globalThis.p5) {
  globalThis.p5.disableFriendlyErrors = true
  if (globalThis.get) {
    _get = globalThis.get
    delete globalThis.get
  }
  if (globalThis.set) {
    _set = globalThis.set
    delete globalThis.set
  }
}

if (typeof document !== 'undefined') {
  if (/complete|interactive|loaded/.test(document.readyState)) {
    onReady()
  } else {
    document.addEventListener('DOMContentLoaded', onReady)
  }
}

export {
  Layers,
  Layer
}