export default function () {
Layers.generate(() => {
  const cellSize = minSize * .07
  // Position of cells
  // @see https://www.redblobgames.com/grids/hexagons/#size-and-spacing
  const cells = [
    [0, -2], [1, -1], [1, 1], [0, 2], [-1, 1], [-1, -1],
    [0, -4], [1, -3], [2, -2], [2, 0], [2, 2], [1, 3], [0, 4], [-1, 3], [-2, 2], [-2, 0], [-2, -2], [-1, -3],
  ]
  
  // Update draw to use noFill
  const opts = cloneDeep(Layers.glass.opts)

  opts.id = 'lead'
  opts.store = Layers.glass.store
  opts.menuDisabled = true
  opts.noLoop = false
  delete opts.afterGenerate

  opts.draw = function () {
    clear()
    // Hex width/height
    const hexW = cellSize
    const hexH = sqrt(3) * hexW/2
    const w = hexW * 3/4 * 2
    const h = hexH
    
    stroke(0)
    strokeWeight(Layers.glass.store.strokeWeight * 1.2)
    push()
    translate(width/2, height/2)
    cells.forEach((cell, n) => {
      noFill()
      polygon(cell[0]*w, cell[1]*h, cellSize, 6)
    })
    pop()
  }
  
  const lead = new Layer(opts)
  lead.canvas.elt.style.zIndex = 100
})
}