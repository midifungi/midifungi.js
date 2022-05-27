export default function () {
  
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
      strokeWeight: {min: 1, max: minSize * .025, step: 1}
    },

    store: {
      cells: []
    },
    
    setup () {
      $cells = []
      
      cells.forEach(cell => {
        const col = [...this.colors[2]]
        col[0] += random(-10, 10)
        col[3] = random(.5, 1)

        $cells.push({
          fill: col
        })
      })
    },

    draw () {
      clear()
      // Hex width/height
      const hexW = cellSize
      const hexH = sqrt(3) * hexW/2
      const w = hexW * 3/4 * 2
      const h = hexH
      
      stroke(0)
      strokeWeight($strokeWeight)
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