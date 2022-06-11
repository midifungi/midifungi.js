export default function () {
const emojis = {
  kids: ['👧🏻', '👦🏻', '🧒🏻', '👶🏻', '👧🏼', '👦🏼', '🧒🏼', '👶🏼', '👧🏽', '👦🏽', '🧒🏽', '👶🏽', '👧🏾', '👦🏾', '🧒🏾', '👶🏾', '👧🏿', '👦🏿', '🧒🏿', '👶🏿'],
  parents: ['👩🏻', '👨🏻', '🧑🏻', '👩🏻‍🦰', '👨🏻‍🦰', '🧑🏻‍🦰', '👩🏻‍🦱', '👨🏻‍🦱', '🧑🏻‍🦱', '👩🏻‍🦲', '👨🏻‍🦲', '🧑🏻‍🦲', '👱🏻‍♀️', '👱🏻‍♂️', '👱🏻', '👳🏻‍♀️', '👳🏻‍♂️', '👳🏻', '🧔🏻', '🧔🏻‍♂️', '🧔🏻‍♀️', '👩🏼', '👨🏼', '🧑🏼', '👩🏼‍🦰', '👨🏼‍🦰', '🧑🏼‍🦰', '👩🏼‍🦱', '👨🏼‍🦱', '🧑🏼‍🦱', '👩🏼‍🦲', '👨🏼‍🦲', '🧑🏼‍🦲', '👱🏼‍♀️', '👱🏼‍♂️', '👱🏼', '👳🏼‍♀️', '👳🏼‍♂️', '👳🏼', '🧔🏼', '🧔🏼‍♂️', '🧔🏼‍♀️', '👩🏽', '👨🏽', '🧑🏽', '👩🏽‍🦰', '👨🏽‍🦰', '🧑🏽‍🦰', '👩🏽‍🦱', '👨🏽‍🦱', '🧑🏽‍🦱', '👩🏽‍🦲', '👨🏽‍🦲', '🧑🏽‍🦲', '👱🏽‍♀️', '👱🏽‍♂️', '👱🏽', '👳🏽‍♀️', '👳🏽‍♂️', '👳🏽', '🧔🏽', '🧔🏽‍♂️', '🧔🏽‍♀️', '👩🏾', '👨🏾', '🧑🏾', '👩🏾‍🦰', '👨🏾‍🦰', '🧑🏾‍🦰', '👩🏾‍🦱', '👨🏾‍🦱', '🧑🏾‍🦱', '👩🏾‍🦲', '👨🏾‍🦲', '🧑🏾‍🦲', '👱🏾‍♀️', '👱🏾‍♂️', '👱🏾', '👳🏾‍♀️', '👳🏾‍♂️', '👳🏾', '🧔🏾', '🧔🏾‍♂️', '🧔🏾‍♀️', '👩🏿', '👨🏿', '🧑🏿', '👩🏿‍🦰', '👨🏿‍🦰', '🧑🏿‍🦰', '👩🏿‍🦱', '👨🏿‍🦱', '🧑🏿‍🦱', '👩🏿‍🦲', '👨🏿‍🦲', '🧑🏿‍🦲', '👱🏿‍♀️', '👱🏿‍♂️', '👱🏿', '👳🏿‍♀️', '👳🏿‍♂️', '👳🏿', '🧔🏿', '🧔🏿‍♂️', '🧔🏿‍♀️',],
  grandparents: ['👵🏻', '👴🏻', '🧓🏻', '👩🏻‍🦳', '👨🏻‍🦳', '🧑🏻‍🦳', '👩🏻‍🦲', '👨🏻‍🦲', '🧑🏻‍🦲', '👵🏼', '👴🏼', '🧓🏼', '👩🏼‍🦳', '👨🏼‍🦳', '🧑🏼‍🦳', '👩🏼‍🦲', '👨🏼‍🦲', '🧑🏼‍🦲', '👵🏽', '👴🏽', '🧓🏽', '👩🏽‍🦳', '👨🏽‍🦳', '🧑🏽‍🦳', '👩🏽‍🦲', '👨🏽‍🦲', '🧑🏽‍🦲', '👵🏾', '👴🏾', '🧓🏾', '👩🏾‍🦳', '👨🏾‍🦳', '🧑🏾‍🦳', '👩🏾‍🦲', '👨🏾‍🦲', '🧑🏾‍🦲', '👵🏿', '👴🏿', '🧓🏿', '👩🏿‍🦳', '👨🏿‍🦳', '🧑🏿‍🦳', '👩🏿‍🦲', '👨🏿‍🦲', '🧑🏿‍🦲'],
  apes: ['🙈', '🙉', '🙊', '🐵', '🐒', '🦍', '🦧'],
  mammals: ['🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️', '🦫', '🐿️', '🦦', '🦨', '🦡'],
  lizards: ['🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖'],
  fish: ['🐳', '🐋', '🐬', '🐟', '🐠', '🐡', '🐙', '🦑', '🦈'],
  microbes: ['🐛', '🪱', '🦠', '🐌', '🐚', '🦐'],
  earth: ['🌍', '🌎', '🌏', '🪨', '☁️', '⛅', '⛈️', '🌤️', '🌥️', '🌦️', '🌧️', '🌨️', '🌩️', '🌪️', '☄️', '⚡', '🌋', '❄️', '🏔️', '⛰️', '🗻'],
  solarsystem: ['☀️', '🌞', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '🌝', '🪐'],
  space1: ['⭐', '🌟', '✨', '💫', '🛸'],
  space2: ['⭐', '🌟', '✨'],
  space3: ['⭐', '🌟'],
  space4: ['⭐'],
}

/**
 * Defines a ring of emojis
 */
class Ring {
  // opts.radius
  // opts.count
  // opts.emojiSet
  constructor (opts) {
    Object.assign(this, opts)
    this.emojis = []

    for (let i = 0; i < this.count; i++) {
      this.emojis.push(random(this.emojiSet))
    }
  }

  draw () {
    const circum = 2*PI*this.radius
    const angle = TWO_PI/this.count
    textSize(circum/this.count)
    
    for (let i = 0; i < this.count; i++) {
      const emoji = this.emojis[i]
      const x = this.radius * Math.cos(i * angle)
      const y = this.radius * Math.sin(i * angle)
      text(emoji, width/2+x, height/2+y)
    }
  }
}

Layers.create(() => {
  new Layer({
    id: 'main',
    noLoop: true,

    menu: {
      bg () {return this.colors},
    },
    store: {
      center: '',
      centerSize: 0,
      rings: []
    },

    setup () {
      textAlign(CENTER, CENTER)

      $center = random(emojis.kids)
      $centerSize = random(.2, .4) * minSize
      $bg = this.colors[6]

      $rings = []

      let extraCount = 0
      let scale = .7
      Object.keys(emojis).forEach(key => {
        $rings.unshift(new Ring({
          radius: $centerSize * scale,
          count: ~~random(10+extraCount, 50+extraCount),
          emojiSet: emojis[key]
        }))

        extraCount += 10
        scale += .25
      })
    },

    draw () {
      background($bg)

      // Draw kid
      textSize($centerSize)
      text($center, width/2, height/2)

      // Draw rings
      $rings.forEach(ring => ring.draw())
    }
  })
})
}