export default function () {
Layers.generate(() => {
  new Layer({
    id: 'pads',
    noLoop: true,
    
    draw () {
      background(0)
    }
  })
})
}