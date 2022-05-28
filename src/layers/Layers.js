import debounce from '../../node_modules/lodash-es/debounce.js'
import p5Overrides from '../p5-overrides.js'
import {WebMidi} from '../../node_modules/webmidi/dist/esm/webmidi.esm.js'

/**
 * Throttled Filter
 */
let _throttledFilter = function (layer) {
  this.mergeLayers(layer)
  layer.draw()
}

// Default settings
export default window.Layers = {
  noLoop: false,
  hasInit: false,

  // MIDI
  midiConnected: false,
  isBindingMIDI: false,
  curBindingLayer: null,
  curBindingControl: null,
  curBindingProp: null,
  midi: {},
  
  // The original renderer/canvas context before any layers
  _context: {},
  // The current layer using global context
  _globalContextLayer: null,

  default: {
    // @see Shades of Purple theme: 
    colors: [[344, 1, .69], [37, 1, .50], [50, 1, .49], [104, 1, .32], [174, .62, .47], [252, .86, .58], [215, 1, .12]],
    colorMode: ['hsl', 360, 1, 1, 1]
  },  
  
  // Layers
  all: [],
  store: {},
  methods: {},

  // About
  version: 'NPM_PACKAGE_VERSION',
  curId: 0,

  // Menus
  openMenus: [],

  // GLobal settings
  hooks: {
    // Set this to a function to enable global settings
    globalSettings: null
  },

  /**
   * Bind listeners like clicking and right clicking
   */
  init () {
    // Menu
    this.$menu = null
    this.hasInit = true

    // Load sessionData
    this.sessionData = JSON.parse(localStorage.getItem('layers'))
    
    // Connect MIDI
    this.midi = JSON.parse(localStorage.getItem('midi')) || {}
    if (JSON.parse(localStorage.getItem('shouldConnectMIDI'))) {
      this.connectMIDI()
    }
    
    // Event listeners
    this.listeners.boundClick = this.listeners.click.bind(this)
    this.listeners.boundContextmenu = this.listeners.contextmenu.bind(this)
    window.addEventListener('click', this.listeners.boundClick)
    window.addEventListener('contextmenu', this.listeners.boundContextmenu)
  },

  /**
   * A list of functions to call whenever generateLayers() is called
   */
  generateCallbacks: [],
  generate (callback) {
    this.generateCallbacks.push(callback)
    this.hasInit && callback()
  },

  /**
   * Call the draw method
   * @param {Function} beforeDraw (Optional) A callback that runs just before each layer is drawn
   */
  draw: function (beforeDraw) {
    Layers.all.forEach(layer => {
      if (frameCount === 1 || (!layer.noLoop && !Layers.noLoop)) {
        switch (layer.type) {
          case 'filter':
            this.mergeLayers(layer)
          break
        }
        layer.draw(beforeDraw)
      }
    })
  },

  /**
   * Merges all the layers below the given layer
   */
  mergeLayers (layer) {
    // Determine the index within Layers.all
    let idx = Layers.all.findIndex(l => l.id === layer.id)
    // Loop through all layers below it and merge their canvases
    layer.canvas.clear()
    for (let i = 0; i < idx+1; i++) {
      !Layers.all[i].disabled && layer.canvas.image(Layers.all[i].canvas, 0, 0)
    }
  },

  /**
   * Free memory
   */
  dispose () {
    this.all.forEach(layer => layer.dispose())
    Layers.all = []
  },

  /**
   * Move all layers up (top layer moves to bottom)
   */
  shift () {
    const layer = Layers.all.pop()
    Layers.all.unshift(layer)
  },

  /**
   * Loops through all open menus and closes them
   */
  closeMenus (ev) {
    for (let i = Layers.openMenus.length - 1; i >= 0; i--) {
      const bounds = Layers.openMenus[i].$menu.containerElem_.getBoundingClientRect()
      if (ev.clientX < bounds.left || ev.clientX > bounds.right || ev.clientY < bounds.top || ev.clientY > bounds.bottom) {
        Layers.openMenus[i].$menu.dispose()
        Layers.openMenus[i].$menu = null
        Layers.openMenus.splice(i, 1)
      }
    }
  },

  /**
   * Updates all filter layers above a given layer
   */
  updateFilters (layer, instant = false) {
    // Find the index of the layer
    const idx = layer ? layer.id : Layers.all[0].id
    const layerIdx = Layers.all.findIndex(l => l.id === idx)
    
    for (let i = layerIdx; i < Layers.all.length; i++) {
      if (Layers.all[i]?.type === 'filter' && !Layers.all[i]?.disabled) {
        Layers.all[i].canvas.clear()

        if (instant) {
          _throttledFilter.call(this, Layers.all[i])
        } else {
          this.throttledFilter(Layers.all[i])
        }
      }
    }
  },

  /**
   * Merges all layers and downloads in given format
   * @param {String} format - The format to download as (png, jpg)
   */
  download (format = 'png') {
    const date = new Date()

    // Create a new canvas that fits the size of all layers
    let x = 0
    let xx = 0
    let y = 0
    let yy = 0
    let smallestPixelDensity = 1

    // Get dimensions and smallest pixel density
    Layers.all.forEach(layer => {
      if (x > layer.x) x = layer.x
      if (xx < layer.x + layer.width) xx = layer.x + layer.width
      if (y > layer.y) y = layer.y
      if (yy < layer.y + layer.height) yy = layer.y + layer.height
      smallestPixelDensity = layer.pixelDensity < smallestPixelDensity ? layer.pixelDensity : smallestPixelDensity
    })

    p5Overrides.forEach(key => {
      window[key] = Layers._context[key]
    })

    // Create a new canvas and merge all layers
    resizeCanvas(xx - x, yy - y)
    pixelDensity(smallestPixelDensity)
    Layers.all.forEach(layer => {
      if (layer.canvas.elt.style.visibility.toLowerCase() !== 'hidden' && !layer.disabled) {
        image(layer.canvas, layer.x, layer.y)
      }
    })
    saveCanvas(`layers-${date.getFullYear()}${date.getMonth()}${date.getDate()}`, format)
  },

  throttledFilter: debounce(_throttledFilter, 1000, {leading: false}),

  listeners: {
    /**
     * Checks if a thing was clicked
     * - If right clicked without clicking on thing then the Tweakpane is shown
     * @param {*} ev 
     */
     click (ev) {
      // Run onClick
      if (ev.x > this.x && ev.x < this.x + this.width && ev.y > this.y && ev.y < this.y + this.height) {
        this.onClick && this.onClick.call(this, ev)
      }

      // Close all open menus
      Layers.closeMenus(ev)
    },

    /**
     * Contextmenu
     */
    contextmenu (ev) {
      for (let i = this.all.length - 1; i >= 0; i--) {
        const layer = this.all[i]
        if (!layer.disabled && !layer.menuDisabled) {
          let bounds = layer.canvas.canvas.getBoundingClientRect()
          let x = layer.x + bounds.x
          let y = layer.y + bounds.y

          // Only show when clicked within the layer
          if (ev.x > x && ev.x < x + layer.width && ev.y > y && ev.y < y + layer.height) {
            // Check if the pixel is empty
            const pixel = layer.canvas.get(ev.x-bounds.x, ev.y-bounds.y)
            if (pixel[3]) {
              ev.preventDefault()
              layer.showContextMenu(ev)
              return false
            }
          }
        }
      }
    },
  },

  /**
   * Connects to MIDI devices (this affects all layers)
   * @param ev The click event that triggered the menu
   * @param layer The layer that triggered the menu
   */
  connectMIDI (ev, layer) {
    WebMidi.enable()
      .then(() => {
        // Make sure this only gets called once
        if (!this.midiConnected) {
          this.midiConnected = true
          localStorage.setItem('shouldConnectMIDI', '1')

          WebMidi.inputs.forEach(input => {
            input.addListener('controlchange', control => {
              this.onMIDIControlChange(control)
            })
          })
        }

        if (ev && layer) {
          setTimeout(() => {
            layer.listeners.menu.regenerate.call(layer, ev)
          }, 0)
        }
      })
  },
  disconnectMIDI (ev, layer) {
    this.midiConnected = false
    localStorage.removeItem('shouldConnectMIDI')
    localStorage.removeItem('midi')
    WebMidi.disable()

    if (ev && layer) {
      setTimeout(() => {
        layer.listeners.menu.regenerate.call(layer, ev)
      }, 0)
    }
  },

  /**
   * Start listening to MIDI devices
   */
  startBindingMIDI () {
    this.isBindingMIDI = true
  },

  /**
   * React to MIDI control changes (knobs, slider, etc)
   */
  onMIDIControlChange (control) {
    if (this.isBindingMIDI) {
      this.curBindingControl = control
      this.maybeBindControlToLayer()
    }

    // Loop through layers and bound properties and update to match the control
    // @FIXME Lets compare direct midi values and channels, not properties
    Object.keys(this.midi).forEach(key => {
      this.midi[key].forEach(binding => {
        if (binding.control.channel === control.message.channel
        && binding.control.command === control.message.command
        && binding.control.controller.number === control.controller.number
        && binding.control.controller.name === control.controller.name) {
          const layer = Layers[key]
          if (!layer) return console.warn(`Layer ${key} not found`)
          const prop = layer.menu[binding.prop]

          if (prop.step) {
            Layers[key].store[binding.prop] = stepRound(map(control.data[2]/127, 0, 1, prop.min, prop.max), prop.step, prop.min)
          } else {
            Layers[key].store[binding.prop] = map(control.data[2]/127, 0, 1, prop.min, prop.max)
          }
          Layers[key].noLoop && Layers[key].throttledDraw()
          prop.onChange && prop.onChange.call(layer, Layers[key].store[binding.prop])
          Layers[key].$menu?.refresh()
        }
      })
    })
  },

  /**
   * Bind the control to the layers property
   */
   maybeBindControlToLayer () {
    if (this.curBindingControl && this.curBindingProp) {
      this.bindControlToLayer()
    }
  },
  bindControlToLayer () {
    this.isBindingMIDI = false

    if (!this.midi[this.curBindingLayer.id]) {
      this.midi[this.curBindingLayer.id] = []
    }

    // Loop through existing bindings and remove and matching this control
    Object.keys(this.midi).forEach(key => {
      this.midi[key].forEach(binding => {
        if (binding.control.channel === this.curBindingControl.message.channel
        && binding.control.command === this.curBindingControl.message.command
        && binding.control.controller.number === this.curBindingControl.controller.number
        && binding.control.controller.name === this.curBindingControl.controller.name) {
          this.midi[key].splice(this.midi[key].indexOf(binding), 1)
        }
      })
    })

    // Define binding
    const binding = {
      prop: this.curBindingProp,
      control: {
        controller: this.curBindingControl.controller,
        channel: this.curBindingControl.message.channel,
        command: this.curBindingControl.message.command,
        input: {
          id: this.curBindingControl.port._midiInput.id,
          manufacturer: this.curBindingControl.port._midiInput.manufacturer,
          name: this.curBindingControl.port._midiInput.name,
        }
      }
    }
    
    this.midi[this.curBindingLayer.id].push(binding)
    localStorage.setItem('midi', JSON.stringify(this.midi))
    // console.log('🎹 Bound MIDI to layer', this.curBindingLayer.id, this.curBindingProp, this.curBindingControl)

    this.isBindingMIDI = false
    this.curBindingControl = null
    this.curBindingProp = null

    setTimeout(() => {
      Layers[this.curBindingLayer.id].showContextMenu(Layers[this.curBindingLayer.id]._showContextMenuEvent)
      this.curBindingLayer = null
    }, 0)
  }
}
