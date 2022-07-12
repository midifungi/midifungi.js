export default function () {
  Layers.create(() => {
    new Layer({
      setup () {
        this.addEye(width/2, height/2)
      },

      draw () {
        background($bg)
      }
    })
  })
}