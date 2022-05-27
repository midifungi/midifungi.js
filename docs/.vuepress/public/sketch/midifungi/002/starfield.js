export default function () {
/**
 * Star
 * @see https://youtu.be/17WoOqgXsRM
 * @see https://editor.p5js.org/codingtrain/sketches/1wLHIck3T
 */
const Star = class {
  constructor () {
    this.x = random(-width, width)
    this.y = random(-height, height)
    this.z = random(width)
    this.lastZ = this.z
  }

  update () {
    this.z -= Layers.starfield.store.speed
    if (this.z < 1) {
      this.x = random(-width/2, width/2)
      this.y = random(-height/2, height/2)
      this.z = random(width, width*1.2)
      this.lastZ = this.z
    }
  }

  draw () {
    noStroke()

    const sx = map(this.x / this.z, 0, 1, 0, width)
    const sy = map(this.y / this.z, 0, 1, 0, height)
    const r = map(this.z, 0, width, 16, 0)
    fill(255)
    ellipse(sx, sy, r, r)

    const px = map(this.x / this.lastZ, 0, 1, 0, width)
    const py = map(this.y / this.lastZ, 0, 1, 0, height)
    this.lastZ = this.z

    stroke(255)
    line(px, py, sx, sy)
  }
}

Layers.generate(() => {
  new Layer({
    id: 'starfield',

    menu: {
      numStars: {min: 100, max: 2000, step: 1, onChange () {this.setup()}},
      speed: {min: 0, max: 50}
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