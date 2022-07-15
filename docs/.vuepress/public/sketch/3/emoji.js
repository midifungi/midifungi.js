export default function () {
  const busts = [
    ['👩🏻','👨🏻','🧑🏻','👵🏻','👴🏻','🧓🏻','👩🏻‍🦰','👨🏻‍🦰','🧑🏻‍🦰','👩🏻‍🦱','👨🏻‍🦱','🧑🏻‍🦱','👩🏻‍🦲','👨🏻‍🦲','🧑🏻‍🦲','👩🏻‍🦳','👨🏻‍🦳','🧑🏻‍🦳','👱🏻‍♀️','👱🏻‍♂️','👱🏻','👳🏻‍♀️','👳🏻‍♂️','👳🏻','🧔🏻','🧔🏻‍♂️','🧔🏻‍♀️'],
    ['👩🏼','👨🏼','🧑🏼','👵🏼','👴🏼','🧓🏼','👩🏼‍🦰','👨🏼‍🦰','🧑🏼‍🦰','👩🏼‍🦱','👨🏼‍🦱','🧑🏼‍🦱','👩🏼‍🦲','👨🏼‍🦲','🧑🏼‍🦲','👩🏼‍🦳','👨🏼‍🦳','🧑🏼‍🦳','👱🏼‍♀️','👱🏼‍♂️','👱🏼','👳🏼‍♀️','👳🏼‍♂️','👳🏼','🧔🏼','🧔🏼‍♂️','🧔🏼‍♀️'],
    ['👩🏽','👨🏽','🧑🏽','👵🏽','👴🏽','🧓🏽','👩🏽‍🦰','👨🏽‍🦰','🧑🏽‍🦰','👩🏽‍🦱','👨🏽‍🦱','🧑🏽‍🦱','👩🏽‍🦲','👨🏽‍🦲','🧑🏽‍🦲','👩🏽‍🦳','👨🏽‍🦳','🧑🏽‍🦳','👱🏽‍♀️','👱🏽‍♂️','👱🏽','👳🏽‍♀️','👳🏽‍♂️','👳🏽','🧔🏽','🧔🏽‍♂️','🧔🏽‍♀️'],
    ['👩🏾','👨🏾','🧑🏾','👵🏾','👴🏾','🧓🏾','👩🏾‍🦰','👨🏾‍🦰','🧑🏾‍🦰','👩🏾‍🦱','👨🏾‍🦱','🧑🏾‍🦱','👩🏾‍🦲','👨🏾‍🦲','🧑🏾‍🦲','👩🏾‍🦳','👨🏾‍🦳','🧑🏾‍🦳','👱🏾‍♀️','👱🏾‍♂️','👱🏾','👳🏾‍♀️','👳🏾‍♂️','👳🏾','🧔🏾','🧔🏾‍♂️','🧔🏾‍♀️'],
    ['👩🏿','👨🏿','🧑🏿','👵🏿','👴🏿','🧓🏿','👩🏿‍🦰','👨🏿‍🦰','🧑🏿‍🦰','👩🏿‍🦱','👨🏿‍🦱','🧑🏿‍🦱','👩🏿‍🦲','👨🏿‍🦲','🧑🏿‍🦲','👩🏿‍🦳','👨🏿‍🦳','🧑🏿‍🦳','👱🏿‍♀️','👱🏿‍♂️','👱🏿','👳🏿‍♀️','👳🏿‍♂️','👳🏿','🧔🏿','🧔🏿‍♂️','🧔🏿‍♀️']   
  ]
  const children = [
    ['👧🏻','👦🏻','🧒🏻'],
    ['👧🏼','👦🏼','🧒🏼'],
    ['👧🏽','👦🏽','🧒🏽'],
    ['👧🏾','👦🏾','🧒🏾'],
    ['👧🏿','👦🏿','🧒🏿']
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
        },
      },
      
      store: {
        family: [],
        self: {}
      },

      setup () {
        // Reset things
        $family = []
        
        // Canvas
        offscreen.textAlign(CENTER, CENTER)
        canvas.setAttributes('alpha', true)
        canvas.drawingContext.disable(canvas.drawingContext.DEPTH_TEST)

        // Create family and create smear points for each face
        for (let i = 0; i < $numFamily+1; i++) {
          let emoji
          let tone = ~~random(5)
          let emojiHeight
          let isChild = false
          let z

          // Different settings for guardians and children
          if (i < $numFamily) {
            emoji = random(busts[tone])
            emojiHeight = random(size*.75, size*1.25)
            z = random(-size*2, -size*.5)
          } else {
            emoji = random(children[tone])
            emojiHeight = random(height/2+size*.15, height/2+size*1.25)
            isChild = true
            z = random(-size*.25, size*.25)
          }
          
          // Create family member
          const fam = {
            emoji,
            x: random(size, width-size),
            height: emojiHeight,
            z,
            tone,
            isChild
          }
          $family.push(fam)

          // Pick a bunch of random points to smear
          if (!isChild) {
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
        }

        // Sort family by z for transparent buffer drawing
        $family.sort((a, b) => b.z - a.z)
      },

      draw () {
        clear()
        background(0,0)
        
        // Draw family
        for (let i = 0; i < $numFamily+1; i++) {
          const fam = $family[i]
          offscreen.clear()

          // Set size
          if (fam.isChild) {
            offscreen.textSize(size*.75)
          } else {
            offscreen.textSize(size)
          }
          offscreen.text(fam.emoji, fam.x, height/2)

          // Get the points
          if (!fam.isChild) {
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
          }
  
          texture(offscreen)
          noStroke()
          push()
          translate(fam.x-width/2, fam.height-height/2, fam.z)
          rotateY(random(-PI/6, PI/6))
          plane(width, height)
          pop()
        }
      }
    })
  })
}