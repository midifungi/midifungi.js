export default function () {
  Layers.create(() => {
    new Layer({
      setup () {
        this.things = []
        let size = minSize*.3
        
        // Create a 3x3 grid of eyes
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            this.addEye(width/2 - (3*size/2) + x*size + size/2, height/2 - (3*size/2) + y*size + size/2, size*.8)
          }
        }
      },

      draw () {
        background($bg)
      }
    })
  })
}