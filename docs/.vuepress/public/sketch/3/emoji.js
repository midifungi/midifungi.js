export default function () {
  const busts = [
    ['👩🏻','👨🏻','🧑🏻','👵🏻','👴🏻','🧓🏻','👩🏻‍🦰','👨🏻‍🦰','🧑🏻‍🦰','👩🏻‍🦱','👨🏻‍🦱','🧑🏻‍🦱','👩🏻‍🦲','👨🏻‍🦲','🧑🏻‍🦲','👩🏻‍🦳','👨🏻‍🦳','🧑🏻‍🦳','👱🏻‍♀️','👱🏻‍♂️','👱🏻','👳🏻‍♀️','👳🏻‍♂️','👳🏻','🧔🏻','🧔🏻‍♂️','🧔🏻‍♀️'],
    ['👩🏼','👨🏼','🧑🏼','👵🏼','👴🏼','🧓🏼','👩🏼‍🦰','👨🏼‍🦰','🧑🏼‍🦰','👩🏼‍🦱','👨🏼‍🦱','🧑🏼‍🦱','👩🏼‍🦲','👨🏼‍🦲','🧑🏼‍🦲','👩🏼‍🦳','👨🏼‍🦳','🧑🏼‍🦳','👱🏼‍♀️','👱🏼‍♂️','👱🏼','👳🏼‍♀️','👳🏼‍♂️','👳🏼','🧔🏼','🧔🏼‍♂️','🧔🏼‍♀️'],
    ['👩🏽','👨🏽','🧑🏽','👵🏽','👴🏽','🧓🏽','👩🏽‍🦰','👨🏽‍🦰','🧑🏽‍🦰','👩🏽‍🦱','👨🏽‍🦱','🧑🏽‍🦱','👩🏽‍🦲','👨🏽‍🦲','🧑🏽‍🦲','👩🏽‍🦳','👨🏽‍🦳','🧑🏽‍🦳','👱🏽‍♀️','👱🏽‍♂️','👱🏽','👳🏽‍♀️','👳🏽‍♂️','👳🏽','🧔🏽','🧔🏽‍♂️','🧔🏽‍♀️'],
    ['👩🏾','👨🏾','🧑🏾','👵🏾','👴🏾','🧓🏾','👩🏾‍🦰','👨🏾‍🦰','🧑🏾‍🦰','👩🏾‍🦱','👨🏾‍🦱','🧑🏾‍🦱','👩🏾‍🦲','👨🏾‍🦲','🧑🏾‍🦲','👩🏾‍🦳','👨🏾‍🦳','🧑🏾‍🦳','👱🏾‍♀️','👱🏾‍♂️','👱🏾','👳🏾‍♀️','👳🏾‍♂️','👳🏾','🧔🏾','🧔🏾‍♂️','🧔🏾‍♀️'],
    ['👩🏿','👨🏿','🧑🏿','👵🏿','👴🏿','🧓🏿','👩🏿‍🦰','👨🏿‍🦰','🧑🏿‍🦰','👩🏿‍🦱','👨🏿‍🦱','🧑🏿‍🦱','👩🏿‍🦲','👨🏿‍🦲','🧑🏿‍🦲','👩🏿‍🦳','👨🏿‍🦳','🧑🏿‍🦳','👱🏿‍♀️','👱🏿‍♂️','👱🏿','👳🏿‍♀️','👳🏿‍♂️','👳🏿','🧔🏿','🧔🏿‍♂️','🧔🏿‍♀️']   
  ]

  Layers.create(() => {
    const size = minSize*.3
    let numGuardians = ~~random(1, 6)

    // if (random() < .7) {
    //   numGuardians = 2
    // } else if (random() < .90) {
    //   numGuardians = 1
    // } else {
    //   numGuardians = ~~random(3, 5)
    // }
    
    new Layer({
      id: 'family',
      renderer: WEBGL,
      noLoop: true,

      menu: {
        numFamily: {
          max: 5,
          default: numGuardians
        }
      },
      
      store: {
        family: []
      },

      setup () {
        // Reset things
        $family = []
        
        // Canvas
        offscreen.textSize(size)
        offscreen.textAlign(CENTER, CENTER)
        canvas.setAttributes('alpha', true)
        canvas.drawingContext.disable(canvas.drawingContext.DEPTH_TEST)

        // Create family and create smear points for each face
        for (let i = 0; i < $numFamily; i++) {
          // Create family member
          let tone = ~~random(5)
          const fam = {
            emoji: random(busts[tone]),
            x: random(size, width-size),
            height: random(size*.75, size*1.25),
            z: random(-size*2, 0),
            tone,
          }
          $family.push(fam)

          // Pick a bunch of random points to smear
          const smear = []
          for (let j = 0; j < 1000; j++) {
            const x = random(fam.x-size*2, fam.x+size*2)
            const y = random(height/2-size/2, height/2+size/6)
            const thickness = random(size*.01, size*.05)
  
            for (let k = 0; k < thickness; k++) {
              smear.push({
                x, y,
                height: random(size*.3, size*.5),
              })
            }
          }

          // Sort smear by y
          fam.smear = smear
          fam.smear.sort((a, b) => a.y - b.y)
        }

        // Sort family by z for transparent buffer drawing
        $family.sort((a, b) => b.z - a.z)
      },

      draw () {
        clear()
        background(0,0)
        
        // Draw family
        for (let i = 0; i < $numFamily; i++) {
          const fam = $family[i]
          offscreen.clear()
          offscreen.text(fam.emoji, fam.x, height/2)
          console.log(fam)

          // Get the points
          fam.smear.forEach((point, n) => {
            // @todo use pixels bc faster
            point.color = offscreen.get(point.x, point.y)
            if (!point.color[3]) {
              delete fam.smear[n]
            }
          })
  
          // Draw lines from points to smear height
          offscreen.strokeWeight(minSize*.01)
          offscreen.colorMode(RGB)
          fam.smear.forEach(point => {
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
  
          texture(offscreen)
          noStroke()
          push()
          translate(fam.x-width/2, fam.height-height/2, random(-size, 0))
          rotateY(random(-PI/6, PI/6))
          plane(width, height)
          pop()
        }
      }
    })
  })
}