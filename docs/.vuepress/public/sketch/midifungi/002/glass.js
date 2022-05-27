export default function () {
  
Layers.generate(() => {
  const cellSize = minSize * .06
  // Position of cells
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

    draw () {
      // Hex width/height
      const hexW = cellSize
      const hexH = sqrt(3) * hexW/2
      const w = hexW * 3/4 * 2
      const h = hexH
      
      background(0)
      strokeWeight($strokeWeight)

      push()
      translate(width/2, height/2)
      cells.forEach(cell => {
        polygon(cell[0]*w, cell[1]*h, cellSize, 6)
      })
      pop()
    }
  })
})
}