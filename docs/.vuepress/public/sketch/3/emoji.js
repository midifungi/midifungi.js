export default function () {
  const busts = ['👩🏻','👨🏻','🧑🏻','👵🏻','👴🏻','🧓🏻','👩🏻‍🦰','👨🏻‍🦰','🧑🏻‍🦰','👩🏻‍🦱','👨🏻‍🦱','🧑🏻‍🦱','👩🏻‍🦲','👨🏻‍🦲','🧑🏻‍🦲','👩🏻‍🦳','👨🏻‍🦳','🧑🏻‍🦳','👱🏻‍♀️','👱🏻‍♂️','👱🏻','👳🏻‍♀️','👳🏻‍♂️','👳🏻','🧔🏻','🧔🏻‍♂️','🧔🏻‍♀️','👩🏼','👨🏼','🧑🏼','👵🏼','👴🏼','🧓🏼','👩🏼‍🦰','👨🏼‍🦰','🧑🏼‍🦰','👩🏼‍🦱','👨🏼‍🦱','🧑🏼‍🦱','👩🏼‍🦲','👨🏼‍🦲','🧑🏼‍🦲','👩🏼‍🦳','👨🏼‍🦳','🧑🏼‍🦳','👱🏼‍♀️','👱🏼‍♂️','👱🏼','👳🏼‍♀️','👳🏼‍♂️','👳🏼','🧔🏼','🧔🏼‍♂️','🧔🏼‍♀️','👩🏽','👨🏽','🧑🏽','👵🏽','👴🏽','🧓🏽','👩🏽‍🦰','👨🏽‍🦰','🧑🏽‍🦰','👩🏽‍🦱','👨🏽‍🦱','🧑🏽‍🦱','👩🏽‍🦲','👨🏽‍🦲','🧑🏽‍🦲','👩🏽‍🦳','👨🏽‍🦳','🧑🏽‍🦳','👱🏽‍♀️','👱🏽‍♂️','👱🏽','👳🏽‍♀️','👳🏽‍♂️','👳🏽','🧔🏽','🧔🏽‍♂️','🧔🏽‍♀️','👩🏾','👨🏾','🧑🏾','👵🏾','👴🏾','🧓🏾','👩🏾‍🦰','👨🏾‍🦰','🧑🏾‍🦰','👩🏾‍🦱','👨🏾‍🦱','🧑🏾‍🦱','👩🏾‍🦲','👨🏾‍🦲','🧑🏾‍🦲','👩🏾‍🦳','👨🏾‍🦳','🧑🏾‍🦳','👱🏾‍♀️','👱🏾‍♂️','👱🏾','👳🏾‍♀️','👳🏾‍♂️','👳🏾','🧔🏾','🧔🏾‍♂️','🧔🏾‍♀️','👩🏿','👨🏿','🧑🏿','👵🏿','👴🏿','🧓🏿','👩🏿‍🦰','👨🏿‍🦰','🧑🏿‍🦰','👩🏿‍🦱','👨🏿‍🦱','🧑🏿‍🦱','👩🏿‍🦲','👨🏿‍🦲','🧑🏿‍🦲','👩🏿‍🦳','👨🏿‍🦳','🧑🏿‍🦳','👱🏿‍♀️','👱🏿‍♂️','👱🏿','👳🏿‍♀️','👳🏿‍♂️','👳🏿','🧔🏿','🧔🏿‍♂️','🧔🏿‍♀️']

  Layers.create(() => {
    const size = minSize*.6
    new Layer({
      id: 'emoji',
      renderer: WEBGL,
      noLoop: true,

      menu: {
        emoji: {
          options: busts,
          type: 'slider'
        }
      },
      store: {
        smear: []
      },

      setup () {
        offscreen.textAlign(CENTER, CENTER)
        canvas.setAttributes('alpha', true)

        // Pick a bunch of random points to smear
        $smear = []
        for (let i = 0; i < 1000; i++) {
          const x = random(width/2-size/2, width/2+size/2)
          const y = random(height/2-size/2, height/2+size/6)
          const thickness = random(size*.01, size*.05)

          for (let j = 0; j < thickness; j++) {
            $smear.push({
              x, y,
              height: random(size*.3, size*.3),
            })
          }
        }

        // Sort by y
        $smear.sort((a, b) => a.y - b.y)
      },

      draw () {
        offscreen.clear()
        offscreen.textSize(size)
        offscreen.text($emoji, width/2, height/2)

        // Get the points
        $smear.forEach((point, n) => {
          point.color = offscreen.get(point.x, point.y)
          if (!point.color[3]) {
            delete $smear[n]
          }
        })

        // Draw lines from points to smear height
        offscreen.strokeWeight(minSize*.01)
        offscreen.colorMode(RGB)
        $smear.forEach(point => {
          const col = [...point.color]
          const darken = 255
          col[0] -= darken
          col[1] -= darken
          col[2] -= darken
          col[3] = 0

          const gradient = offscreen.drawingContext.createLinearGradient(point.x, point.y, point.x, point.y-point.height)
          gradient.addColorStop(0, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, ${point.color[3]})`)
          gradient.addColorStop(1, `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`)
          offscreen.drawingContext.strokeStyle = gradient

          offscreen.drawingContext.beginPath()
          offscreen.drawingContext.moveTo(point.x, point.y)
          offscreen.drawingContext.lineTo(point.x, point.y-point.height)
          offscreen.drawingContext.stroke()
        })
        offscreen.colorMode(...this.colorMode)

        clear()
        background(0,0)
        texture(offscreen)
        noStroke()
        push()
        translate(0, size*.2)
        rotateY(random(-PI/6, PI/6))
        plane(width, height)
        pop()
      }
    })
  })
}