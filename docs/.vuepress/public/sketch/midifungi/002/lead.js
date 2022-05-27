export default function () {
Layers.generate(() => {
  // Update draw to use noFill
  const opts = cloneDeep(Layers.glass.opts)

  opts.id = 'lead'
  opts.store = Layers.glass.store

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
  
  const lead = new Layer(Layers.glass.opts)
  lead.canvas.elt.style.zIndex = 100
})
}