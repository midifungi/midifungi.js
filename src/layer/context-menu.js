import '../../node_modules/tweakpane/dist/tweakpane.js'
import '../../node_modules/@tweakpane/plugin-essentials/dist/tweakpane-plugin-essentials.js'
import '../styles.js'

/**
 * Shows the context menu for the Moar
 */
export default {
  /**
   * Displays the clicked layer's menu, along with the other layers' menus as a context menu
   */
  showContextMenu (ev) {
    Layers.closeMenus(ev)
    this._showContextMenuEvent = ev
    this._hasDraggedMenu = false

    if (!this.$menu){
      this.$menu = new globalThis.Tweakpane.Pane()
      this.$menu.registerPlugin(globalThis.TweakpaneEssentialsPlugin)
      this.$menu.$folder = {}
      Layers.openMenus.push(this)

      // General settings
      const general = this.$menu.$folder.general = this.$menu.addFolder({
        title: `Layer: ${this.id}`,
        expanded: true
      })

      // More settings
      if (this.menu) {
        Object.keys(this.menu).forEach(key => {
          const menu = this.menu[key]
          const maybeBindControlToLayer = () => {
            // Check if currently binding
            if (Layers.isBindingMIDI && !Layers.curBindingProp) {
              Layers.curBindingProp = key
              Layers.maybeBindControlToLayer()
              setTimeout(() => {
                this.showContextMenu(ev)
              }, 0)
            }
          }

          switch (menu.type) {
            case 'slider':
              general.addInput(this.store, key, {
                min: menu.min,
                max: menu.max,
                step: menu.step
              }).on('change', ev => {
                menu.onChange.call(this, ev)
                maybeBindControlToLayer()
              })
              .on('click', ev => {
                maybeBindControlToLayer()
              })
            break              
          }
        })
      }
      if (typeof this.onMenu === 'function') {
        this.onMenu.call(this, {
          general
        })
      }

      // Regenerate
      general.addBlade({
        view: 'buttongrid',
        size: [2, 1],
        cells: (x, y) => ({
          title: [
            ['Regenerate All', 'Regenerate Current']
          ][y][x]
        }),
      }).on('click', (ev) => {
        switch (ev.index[0]) {
          // Regenerate all layers
          case 0:
            // Regenerate Layers.generate() callbacks
            document.dispatchEvent(new CustomEvent('layers-regenerate-all', {detail: this}))
            Layers.dispose()
            Layers.generateCallbacks && Layers.generateCallbacks.forEach(callback => callback())
            
            // Show context on topmost non-filter, non-hidden layer
            Layers.all.reverse().find(layer => layer.type !== 'filter' && !layer.disabled).showContextMenu(this._showContextMenuEvent)
            Layers.all.reverse()
          break
          // Regenerate layer
          case 1:
            document.dispatchEvent(new CustomEvent('layers-regenerate', {detail: this}))
            this.listeners.menu.regenerate.call(this, ev)
            Layers.updateFilters(this)
          break
        }
      })

      // Global settings
      if (typeof Layers.hooks.globalSettings === 'function') {
        const global = this.$menu.$folder.global = general.addFolder({
          title: 'Global Settings',
          expanded: true
        })
        
        Layers.hooks.globalSettings({
          general,
          global
        })
      }

      // Layer toggle
      const layerToggle = this.$menu.$folder.layerToggle = this.$menu.addFolder({
        title: 'Toggle Layers',
        expanded: false
      })

      // Generate toggles
      const layerVisibility = {}
      const layers = [...Layers.all]
      layers.reverse().forEach(layer => {
        layerVisibility[layer.id] = !layer.disabled
        layerToggle.addInput(layerVisibility, String(layer.id))
          .on('change', () => {
            layer.toggle()
          })
      })

      // Explode button
      layerToggle.addSeparator()
      layerToggle.addInput(Layers.areLayersExploded, 'Visualize layers in 3D')
      .on('change', (ev) => {
        Layers.explodeLayers(ev.value)
      })

      // MIDI
      this.addMIDIButtons(ev, general, layerToggle)

      // Save
      const save = this.$menu.$folder.save = this.$menu.addFolder({
        title: '💾 Save',
        expanded: false
      })
      const buttons = ['PNG', 'JPG']
      save.addBlade({
        view: 'buttongrid',
        size: [2, 1],
        cells: (x, y) => ({
          title: buttons[y * 2 + x], value: buttons[y * 2 + x]
        }),
      }).on('click', (ev) => {
        if (ev.index[0] === 0 && ev.index[1] === 0) {
          Layers.download('png')
        } else if (ev.index[0] === 1 && ev.index[1] === 0) {
          Layers.download('jpg')
        }
      })

      // Update filter layers above this layer
      // Persist data to localstorage
      this.$menu.on('change', () => {
        Layers.updateFilters(this)

        // Store menu states
        Layers.sessionData = {}
        Layers.all.forEach(layer => {
          Layers.sessionData[layer.id] = {
            disabled: layer.disabled
          }
        })
        localStorage.setItem('layers', JSON.stringify(Layers.sessionData))
      })
    }

    // Handle drag
    let origOffset = {x: 0, y: 0}
    const $handle = this.$menu.containerElem_.querySelector('.tp-fldv_b')
    $handle.closest('.tp-dfwv').addEventListener('click', (ev) => {
      // This can be empty when this menu is regenerated
      if (this.$menu) {
        this.$menu.$folder.general.disabled = false
        this._hasDraggedMenu = false
      }
    })
    $handle.addEventListener('mousedown', (ev) => {
      const bounds = this.$menu.containerElem_.getBoundingClientRect()
      origOffset.x = ev.x - bounds.x
      origOffset.y = ev.y - bounds.y
    })
    $handle.addEventListener('mouseup', (ev) => {
      if (this._hasDraggedMenu){
        this._hasDraggedMenu = false
        globalThis.$handle = $handle
        $handle.dispatchEvent(new MouseEvent('mouseup'))
        return
      }
    })
    $handle.addEventListener('mousemove', (ev) => {
      if (mouseIsPressed) {
        this.$menu.$folder.general.disabled = true
        this._hasDraggedMenu = true
      }
    })
    $handle.closest('.tp-dfwv').addEventListener('mousemove', (ev) => {
      if (this._hasDraggedMenu) {
        this.$menu.containerElem_.style.left = `${ev.x - origOffset.x}px`
        this.$menu.containerElem_.style.top = `${ev.y - origOffset.y}px`
      }
    })
    
    // Move the menu to the mouse position
    const bounds = this.$menu.containerElem_.getBoundingClientRect()
    this.$menu.containerElem_.style.position = 'fixed'
    if (ev.x + bounds.width > width + globalThis.innerWidth) {
      this.$menu.containerElem_.style.left = (width + globalThis.innerWidth - bounds.width) + 'px'
    } else {
      this.$menu.containerElem_.style.left = ev.x + 'px'
    }
    if (ev.y + bounds.height > height + globalThis.innerHeight) {
      this.$menu.containerElem_.style.top = (height + globalThis.innerHeight - bounds.height) + 'px'
    } else {
      this.$menu.containerElem_.style.top = ev.y + 'px'
    }
  },

  /**
   * Goes through the menu object and sets defaults
   * - Also sets a default .store value
   */
  parseMenu () {
    if (!this.menu) return

    Object.keys(this.menu).forEach(key => {
      const menu = this.menu[key]

      // Sliders
      if (menu.type === 'slider' || typeof menu === 'object') {
        Object.assign(menu, {
          min: menu.min || 0,
          max: menu.max || 1,
          type: 'slider',
        })
        if (!menu.onChange) {
          menu.onChange = function () {
            this.noLoop && this.draw()
          }
        }
        
        if (menu.step) {
          menu.step = menu.step
        } else if (menu.max > 1) {
          menu.step = 1
        } else {
          menu.step = 0.001
        }

        // Add the item to the store if it doesn't exist
        if (!(key in this.store)) {
          this.store[key] = ('default' in menu) ? menu.default : stepRound(random(menu.min, menu.max), menu.step, menu.min)
        }
      }
    })
  }
}