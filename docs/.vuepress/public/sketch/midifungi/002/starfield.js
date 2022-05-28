export default function () {
/*
"Billions and Billions 🌠"

Twinkle twinkling
Up above a world so high
Leaving past behind
---
ABOUT: This sketch uses Watercanvas.js, a surface water simulator from 2010, in a
frozen state to recreate a stained glass texture
---
Devlog: https://midifungi.notion.site/Stained-Glass-0e8c133187c14f50bca886f5d2808656
---
Sketched for @sableRaph's Weekly Creative Coding Challenge: https://openprocessing.org/curation/78544
---
Made with Midifungi.js
*/



/**
 * Star class adapted from Code Train:
 * @see https://youtu.be/17WoOqgXsRM
 * @see https://editor.p5js.org/codingtrain/sketches/1wLHIck3T
 */
const Star = class {
  constructor () {
    this.x = random(-width, width)
    this.y = random(-height, height)
    this.z = random(width)
    this.life = 0
    this.lastZ = this.z
  }

  update () {
    this.z -= Layers.starfield.store.speed
    if (this.z < 1) {
      this.x = random(-width/2, width/2)
      this.y = random(-height/2, height/2)
      this.z = random(width, width*1.2)
      this.lastZ = this.z
      this.life = 0
    }
  }

  draw () {
    noStroke()
    const sx = map(this.x / this.z, 0, 1, 0, width)
    const sy = map(this.y / this.z, 0, 1, 0, height)
    const r = map(this.z, 0, width, Layers.starfield.store.size, 0)

    // Fade in
    this.life += Layers.starfield.store.speed/50 * .1
    fill(255, min(1, this.life))
    ellipse(sx, sy, r, r)

    const px = map(this.x / this.lastZ, 0, 1, 0, width)
    const py = map(this.y / this.lastZ, 0, 1, 0, height)
    this.lastZ = this.z

    stroke(255, min(1, this.life))
    line(px, py, sx, sy)
  }
}

/**
 * Starfield layer
 */
Layers.generate(() => {
  new Layer({
    id: 'starfield',

    menu: {
      numStars: {min: 100, max: 2000, onChange () {this.setup()}},
      size: {max: minSize*.03},
      variability: {max: 1},
      speed: {max: 50},
    },
    
    store: {
      stars: []
    },

    setup () {
      $stars = []
      for (let i = 0; i < $numStars; i++) {
        $stars.push(new Star())
      }
    },

    draw () {
      background(0)
      push()
      translate(width/2, height/2)
      $stars.forEach((star, n) => {
        star.update()
        star.draw()
      })
      pop()
    }
  })
})
}