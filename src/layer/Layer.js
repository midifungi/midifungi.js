import contextMenu from './context-menu.js'
import p5Overrides from '../p5-overrides.js'
import midiMenu from './midi-menu.js'

class Layer {
  constructor (opts = {}) {
    // Methods
    this.showContextMenu = contextMenu.showContextMenu
    this.parseMenu = contextMenu.parseMenu
    this.addMIDIButtons = midiMenu.addMIDIButtons
    this.connectMIDI = midiMenu.connectMIDI
    
    // Default dimensions: parent size or fullscreen
    let w = Layers.target?.clientWidth || window.width
    let h = Layers.target?.clientHeight || window.height

    // Last moved target
    this._hasMovedTarget = null
    
    // Defaults
    this.opts = window.defaultsDeep(opts, {
      id: Layers.curId,
      disabled: false,
      menuDisabled: false,
      type: 'layer',
      target: Layers.target || null,
      
      fps: 30,
      noLoop: false,
      // 0 for system default
      pixelDensity: 0,

      // Dimensions
      width: w,
      height: h,
      x: 0,
      y: 0,

      // Canvas
      canvas: null,
      offscreen: null,
      colors: Layers.default.colors,
      colorMode: Layers.default.colorMode,

      // Listeners
      onClick: null,
      beforeGenerate: null,
      
      // Custom methods
      methods: {},

      // Custom store
      store: {},
    })

    // Setup canvas
    this.generate()

    // Apply session data
    if (Layers.sessionData && this.id in Layers.sessionData) {
      this.disabled = Layers.sessionData[this.id].disabled
    }
    
    // Store references
    Layers.curId++
    Layers[this.id] = this
    Layers.all.push(this)

    // Methods
    Object.keys(this.opts.methods).forEach(key => {
      if (this[key]) {
        console.error('Trying to create method "' + key + '" but it already exists in the Layer as a property or method.')
      } else {
        this[key] = this.opts.methods[key]
      }
    })

    this.callSetup()

    // Add a slight delay to draw to allow other setups() to finish
    // Add an extra delay to filters to allow for faster render on load
    if (this.type === 'filter' && !this.disabled) {
      Layers.mergeLayers(this)
      setTimeout(() => {
        this.draw()
      }, 0)
    } else if (!this.disabled) {
      this.draw()
    }
  }

  /**
   * Sets up or restores the layer to its default state
   */
  generate (callSetup) {
    // Aliases
    if (!this.id) this.id = this.opts.id
    if (!this.canvas) this.canvas = this.opts.canvas
    if (!this.offscreen) this.offscreen = this.opts.offscreen
    if (!this.x) this.x = this.opts.x
    if (!this.y) this.y = this.opts.y
    if (!this.width) this.width = this.opts.width
    if (!this.height) this.height = this.opts.height
    if (!this.disabled) this.disabled = this.opts.disabled
    if (!this.menuDisabled) this.menuDisabled = this.opts.menuDisabled
    if (!this.colors) this.colors = this.opts.colors
    if (!this.colorMode) this.colorMode = this.opts.colorMode
    if (!this.beforeGenerate) this.beforeGenerate = this.opts.beforeGenerate
    if (!this.afterGenerate) this.afterGenerate = this.opts.afterGenerate
    if (!this.setup) this.setup = this.opts.setup
    if (!this.type) this.type = this.opts.type
    if (!this.noLoop) this.noLoop = this.opts.noLoop
    if (!this.pixelDensity) {
      this.pixelDensity = this.opts.pixelDensity || 1
    }
    if (!this.fps) this.fps = this.opts.fps
    if (!this.target) this.target = this.opts.target

    // Menu
    this.menu = cloneDeep(this.opts.menu)
    this.store = cloneDeep(this.opts.store)
    this.parseMenu()

    // Canvas
    if (!this.canvas) {
      this.canvas = createGraphics(this.width, this.height) // Main layer
    }
    if (!this.offscreen) {
      this.offscreen = createGraphics(this.width, this.height) // Buffer for individual things
    }
    if (this.pixelDensity) {
      this.canvas.pixelDensity(this.pixelDensity)
      this.offscreen.pixelDensity(this.pixelDensity)
    }
    this.canvas.elt.classList.add('midifungi-layer', `midifungi-layer-${this.id}`)
    this.offscreen.elt.classList.add('midifungi-offscreen', `midifungi-layer-${this.id}`)

    // Setup the target to receive the canvases
    if (this.target && !this._hasMovedTarget) {
      this._hasMovedTarget = true
      this.canvas.elt.style.width = '100%'
      this.canvas.elt.style.height = '100%'

      this.target.appendChild(this.canvas.elt)
      this.target.appendChild(this.offscreen.elt)
      
      if (!this.target.style.position) {
        this.target.style.position = 'relative'
      }
    }
    this.canvas.elt.style.position = `absolute`
    this.canvas.elt.style.display = 'block'
    this.canvas.elt.style.left = `${this.x}px`
    this.canvas.elt.style.top = `${this.y}px`

    this.canvas.colorMode(...this.colorMode)
    this.offscreen.colorMode(...this.colorMode)
    this.canvas.clear()
    this.offscreen.clear()

    // Throttled functions
    this.throttledDraw = throttle(this.draw.bind(this), 1000/this.opts.fps)

    this.useGlobalContext()
    this.beforeGenerate && this.beforeGenerate()
    this.restoreGlobalContext()

    callSetup && this.callSetup()
    
    this.useGlobalContext()
    this.afterGenerate && this.afterGenerate()
    this.restoreGlobalContext()
  }

  /**
   * Calls the setup method if it exists
   * - Temporarily changes the _renderer target
   */
  callSetup () {
    // Call the setup
    this.useGlobalContext()
    this.setup && this.setup.call(this, this.offscreen)
    this.restoreGlobalContext()

    // Call the Layers setup hook
    Layers.setup && Layers.setup.call(this, this.offscreen)
  }

  /**
   * Toggle the layer on/off
   */
  disable () {this.hide()}
  hide () {
    this.disabled = true
    this.canvas.elt.style.display = 'none'
  }
  enable () {this.show()}
  show () {
    this.disabled = false
    this.canvas.elt.style.display = 'block'
    this.draw()
  }
  toggle () {
    if (this.disabled) this.show()
    else this.hide()
  }

  /**
   * Draw loop
   */
  draw () {
    if (!this.disabled) {
      // Update position
      if (!this._lastX !== this.x || !this._lastY !== this.y) {
        this.canvas.elt.style.left = `${this.x}px`
        this.canvas.elt.style.top = `${this.y}px`
      }
      
      // Draw
      this.useGlobalContext()
      this.opts.draw && this.opts.draw.call(this, this.offscreen)
      this.restoreGlobalContext()
  
      this._lastX = this.x
      this._lastY = this.y
    }

    // Loop drawing
    requestAnimationFrame(() => !Layers.noLoop && !this.noLoop && this.draw())
  }

  /**
   * Updates the global context so that all renders happen on current layer
   * (eg rect, circle, etc without having to type canvas.rect())
   */
  useGlobalContext () {
    this._context = {}
    this._storeContext = {}
    p5Overrides.forEach(key => {
      this._context[key] = window[key]
      window[key] = key === 'canvas' ? this.canvas.elt : this.canvas[key]
    })

    // Manual overrides
    window.loadPixels = () => {
      this.canvas.loadPixels()
      window.pixels = this.canvas.pixels
    }

    // Add this.$ variables
    Object.keys(this.store).forEach(key => {
      if (window[`$${key}`]) {
        console.warn(window[`$${key}`], `$${key} is already defined and cannot be used as a store key for Layer: ${this.id}`)
      } else {
        window[`$${key}`] = this.store[key]
        this._storeContext[key] = true
      }
    })
  }
  restoreGlobalContext () {
    p5Overrides.forEach(key => {
      window[key] = this._context[key]
    })

    // Remove this.$ variables
    Object.keys(this._storeContext).forEach(key => {
      this.store[key] = window[`$${key}`]
      delete window[`$${key}`]
    })
  }

  /**
   * Free memory and delete reference from Layers
   */
  dispose () {
    this.canvas.remove()
    this.offscreen.remove()

    const id = this.id
    const idx = Layers.all.findIndex(layer => layer.id === this.id)
    Layers.all.splice(idx, 1)
    delete Layers[id]
  }

  /**
   * Moves the layer up/down within the stack
   * @param {*} seconds 
   * @returns 
   */
  moveDown () {
    const idx = Layers.all.findIndex(layer => layer.id === this.id)
    if (idx) {
      const curCanvas = this.canvas.elt
      const curOffscreen = this.offscreen.elt
      const targetCanvas = Layers.all[idx-1].canvas.elt
      const targetOffscreen = Layers.all[idx-1].offscreen.elt
      
      this.canvas.elt.parentElement.insertBefore(curCanvas, targetCanvas)
      this.canvas.elt.parentElement.insertBefore(curOffscreen, targetOffscreen)
      
      Layers.all.splice(idx, 1)
      Layers.all.splice(idx-1, 0, this)
    }
  }
  moveUp () {
    const idx = Layers.all.findIndex(layer => layer.id === this.id)
    if (idx < Layers.all.length - 1) {
      const curCanvas = this.canvas.elt
      const curOffscreen = this.offscreen.elt
      const targetCanvas = Layers.all[idx+1].canvas.elt
      const targetOffscreen = Layers.all[idx+1].offscreen.elt

      this.canvas.elt.parentElement.insertAfter(curCanvas, targetCanvas)
      this.canvas.elt.parentElement.insertAfter(curOffscreen, targetOffscreen)

      Layers.all.splice(idx, 1)
      Layers.all.splice(idx+1, 0, this)
    }
  }
  
  /**
   * Uses frameCount to return the progress within a loop of the passed number of seconds
   * @param {*} seconds 
   * @returns 
   */
  getProgress (seconds = 4) {
    const period = +params.fps * seconds / 2
    return (frameCount % period) / period
  }

  /**
   * Core Event listeners
   */
  listeners = {
    menu: {
      regenerate: ev => {
        this.generate(true)
        this.draw()
        this.showContextMenu(this._showContextMenuEvent)
      }
    }
  }
}
window.Layer = Layer