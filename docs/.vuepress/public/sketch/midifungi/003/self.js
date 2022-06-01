export default function () {
new Layer({
  id: 'self',

  menu: {
    emoji: ['🧘‍♂️', '🧘‍♀️', '🧘'],
    spacing: {min: .025, max: .1}
  },
  
  setup () {
    textAlign(CENTER, CENTER)
  },
  
  draw () {
    const size = minSize * .7

    for (let i = 0; i < 20; i++) {
      textSize(size * .8 - i * size * $spacing)
      text($emoji, width/2, height/2)
    }

    textSize(size * .1)
    text('👁️', width/2, height/2)
  }
})
}