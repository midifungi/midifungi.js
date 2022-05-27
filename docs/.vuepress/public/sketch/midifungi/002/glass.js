export default function () {
let defaultColorRange = 10
  
Layers.generate(() => {
  const cellSize = minSize * .07
  // Position of cells
  // @see https://www.redblobgames.com/grids/hexagons/#size-and-spacing
  const cells = [
    [0, -2], [1, -1], [1, 1], [0, 2], [-1, 1], [-1, -1],
    [0, -4], [1, -3], [2, -2], [2, 0], [2, 2], [1, 3], [0, 4], [-1, 3], [-2, 2], [-2, 0], [-2, -2], [-1, -3],
  ]

  new Layer({
    id: 'glass',
    noLoop: true,

    menu: {
      colorRange: {
        min: 0,
        max: 360,
        default: defaultColorRange,
        onChange: function (ev) {
          Layers.glass.menu.colorRange.default = ev.value
          
          this.setup()
          this.draw()
          Layers.filter.store.canvas.setBackground(this.canvas.elt)
        },
      },
      strokeWeight: {min: 1, max: minSize * .025, step: 1},
    },

    store: {
      cells: []
    },
    
    setup () {
      $cells = []
      
      cells.forEach(cell => {
        const col = [...this.colors[2]]
        col[0] += random(-$colorRange, $colorRange)
        col[3] = random(.5, .8)

        $cells.push({
          fill: col
        })
      })
    },

    afterGenerate () {
      this.canvas.elt.style.visibility = 'hidden'
    },

    draw () {
      // Hex width/height
      const hexW = cellSize
      const hexH = sqrt(3) * hexW/2
      const w = hexW * 3/4 * 2
      const h = hexH

      // Draw hexes
      clear()
      noStroke()
      push()
      translate(width/2, height/2)
      cells.forEach((cell, n) => {
        fill($cells[n].fill)
        polygon(cell[0]*w, cell[1]*h, cellSize, 6)
      })
      pop()
    }
  })
})
}