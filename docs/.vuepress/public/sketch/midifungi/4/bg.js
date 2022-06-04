export default function () {
Layers.create(() => {
  class Tree {
    constructor () {
      this.emoji = random(['🌴', '🌳', '🌲', '🌵'])
      this.size = random(minSize*.1, minSize*.5)
      this.x = random(-this.size, width + this.size)
      this.y = height/1.35 - this.size
    }
  }
  
  new Layer({
    id: 'trees',
    noLoop: true,

    store: {
      trees: []
    },
    
    setup () {
      drawingContext.shadowBlur = 5
      drawingContext.shadowColor = '#000'

      for (let i = 0; i < maxSize; i++) {
        $trees.push(new Tree())
      }
    },
    
    draw () {
      background(Layers.default.colors[~~random(4, 7)])
      // sort by size
      $trees.sort((a, b) => b.size - a.size)
      
      $trees.forEach(tree => {
        textSize(tree.size)
        text(tree.emoji, tree.x, tree.y)
      })
    }
  })      
})
}