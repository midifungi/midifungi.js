export default function () {
Layers.create(() => {
  class Tree {
    constructor () {
      this.emoji = random(['🌴', '🌳', '🌲', '🌵'])
      this.size = random(minSize*.1, minSize*.5)
      this.x = random(-this.size, width + this.size)
      this.y = height/2 + minSize*.35 - this.size
    }
  }
  
  new Layer({
    id: 'train',
    noLoop: true,

    store: {
      trees: []
    },
    
    setup () {
      drawingContext.shadowBlur = 5
      drawingContext.shadowColor = '#000'

      for (let i = 0; i < 1000; i++) {
        $trees.push(new Tree())
      }
    },
    
    draw () {
      clear()
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