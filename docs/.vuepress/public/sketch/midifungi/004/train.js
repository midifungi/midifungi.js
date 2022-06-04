export default function () {
Layers.create(() => {
  new Layer({
    id: 'train',
    menu: {
      emoji: ['🚂', '🚄', '🚆']
    },
    store: {
      tracers: []
    },
    setup () {
      textAlign(CENTER, CENTER)
    },
    draw () {
      textSize(minSize * .8)
      text($emoji, width/2, height/2)
    }
  })
})
}