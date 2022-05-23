/**
 * Midifungi 🎹🍄
 * A p5js library that helps you organize your code into layers
 * ---
 * @version NPM_PACKAGE_VERSION
 * @license "Apache 2.0" with the addendum that you cannot use this or its output for NFTs without permission
 */

// Dependencies
import '../node_modules/tweakpane/dist/tweakpane.js'
import '../node_modules/@tweakpane/plugin-essentials/dist/tweakpane-plugin-essentials.js'
import cloneDeep from '../node_modules/lodash-es/cloneDeep.js'
import defaultsDeep from '../node_modules/lodash-es/defaultsDeep.js'
import debounce from '../node_modules/lodash-es/debounce.js'
import throttle from '../node_modules/lodash-es/throttle.js'

// Midifungi
import Layers from './layers/Layers.js'
import './helpers.js'
import './layer/Layer.js'
import p5Overrides from './p5-overrides.js'

// UI
import './tweakpane.theme.js'

// Globals
window.cloneDeep = cloneDeep
window.defaultsDeep = defaultsDeep
window.debounce = debounce
window.throttle = throttle

/**
 * Run Layers.generate callbacks
 */
const onSetup = function () {
  if (!window.p5) {
    setTimeout(onSetup, 1)
    return
  }

  p5.disableFriendlyErrors = true
  Layers.init()

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
 * Onready
 */
function onReady () {
  if (window.setup) {
    const _setup = window.setup
    window.setup = function () {
      _setup()
      onSetup()
    }
  } else {
    window.setup = onSetup
  }

  /**
   * Run boilerplate code
   */
  window.generateLayers = function (refresh) {
    if (refresh) {
      Layers.dispose()
      reseed()
    } else {
      randomSeed(window._seed)
      noiseSeed(window._seed)
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
}

if (/complete|interactive|loaded/.test(document.readyState)) {
  onReady()
} else {
  document.addEventListener('DOMContentLoaded', onReady)
}

export default Layers