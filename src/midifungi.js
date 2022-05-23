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
import './setup.js'
import './helpers.js'
import './layer/Layer.js'

import './tweakpane.theme.js'

// Globals
window.cloneDeep = cloneDeep
window.defaultsDeep = defaultsDeep
window.debounce = debounce
window.throttle = throttle

/**
 * Onready
 */
function onReady () {
  if (!window.p5) {
    setTimeout(onReady, 1)
    return
  }
  
  p5.disableFriendlyErrors = true
  Layers.init()
  
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
}

if (/complete|interactive|loaded/.test(document.readyState)) {
  onReady()
} else {
  document.addEventListener('DOMContentLoaded', onReady)
}

export default Layers