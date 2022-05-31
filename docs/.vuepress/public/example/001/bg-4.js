export default function () {
new Layer({
  menu: {
    emoji: ['😀', '🥳', '💖']
  },
  setup () {
    textAlign(CENTER, CENTER)
  },
  draw () {
    clear()
    textSize(Layers.circle.store.size * .5)
    text($emoji, width/2, height/2)
  }
})
}