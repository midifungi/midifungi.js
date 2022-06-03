/**
 * Midifungi 🎹🍄
 * A p5js library that helps you organize your code into layers
 * ---
 * @version NPM_PACKAGE_VERSION
 * @license "Apache 2.0" with the addendum that you cannot use this or its output for NFTs without permission
 */

// Midifungi
import './helpers.js'
import Layers from './layers/Layers.js'
import Layer from './layer/Layer.js'
import p5Overrides from './p5-overrides.js'

// Global exports
globalThis.Layers = Layers
globalThis.Layer = Layer

/**
 * Initialize Midifungi
 * - Create or hook into setup()
 * --- Hooking into setup() is effectively like p5.prototype.registerMethod('init')
 *     but without the need to load p5 first (useful in SSR where p5 is not available)
 * - Create or hook into draw()
 * --- We need at least a blank draw() for p5 plugins to hook into (eg p5.recorder)
 */
function init () {
  // Setup
  if (globalThis.setup) {
    const _setup = globalThis.setup
    globalThis.setup = function () {
      _setup()
      onSetup()
    }
  } else {
    globalThis.setup = onSetup
  }

  // Draw
  if (globalThis.draw) {
    const _draw = globalThis.draw
    globalThis.draw = function () {
      _draw()
      Layers._onP5Draw()
    }
  } else {
    globalThis.draw = Layers._onP5Draw
  }
}

/**
 * Configures globals and initializes Midifungi
 */
const onSetup = function () {
  if (!globalThis.p5) {
    setTimeout(onSetup, 0)
    return
  }

  globalThis.p5.disableFriendlyErrors = true

  // Create main canvas for 
  Layers._renderer = createCanvas(1, 1)
  canvas.style.display = 'none'

  // Backup default states before any p5 overrides
  p5Overrides.forEach(key => {
    Layers._context[key] = window[key]
  })
  
  Layers.init()
}

// Either wait for the dom to load or initialize right away if it's already loaded
if (typeof document !== 'undefined') {
  if (/complete|interactive|loaded/.test(document.readyState)) {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
}

// Named exports
export {
  Layers,
  Layer
}
// Default export
export default {
  Layers,
  Layer
}