/**
* Scaly Slugs 🛡️🐌
* Ellipses curved on a path to give the appereance of "slugs with scales", with a
* variable width transparent path to represent a "slime trail". The Scaly Slugs
* slither on a bed of paths designed to look like "shattered porcelain"
* ---
* 👋 Hello! This is a very early preview of Layers.p5. It'll be documented soon
* ---
* 🙏 Acknowledgements:
* - The curving algorithm was inspired from "Candy Curves" by Vamoss: https://www.openprocessing.org/sketch/1056707
*/
Layers.noLoop = true

/**
* Generate the wallpaper
*/
// Called automatically and whenever you press "Regenerate All"
Layers.generate(function () {
  const numWallpapers = ~~random(3, Layers.default.colors.length)
  const wallpaperColors = [...Array(Layers.default.colors.length).keys()]
  
  /**
  * Create a new layer for each wallpaper
  */
  for (let i = 0; i < numWallpapers; i++) {
    new Layer({
      id: `bg${i}`,
      
      // Create a menu
      menu: {
        // Access/set value with this.store.bg
        bg: {step: 1, max: Layers.default.colors.length - 1},
      },
      
      // Called whenever you press "Regenerate Layer"
      setup () {
        const availableColors = [...wallpaperColors]
        
        // Create wallpapers
        // Extract a color and make it unselectable for the next
        let col = availableColors.splice(~~random(availableColors.length), 1)[0]
        let size = minSize*.1
        
        // Setup store
        this.store = {
          bg: col,
          size: size,
          scale: random(.8, 1.15),
          spaceY: 3.5,
          cols: width/size+2,
          offset: {x: random(size*.5), y: random(size*.5)},
        }
        
        // Add holes to the wallpaper
        this.store.holes = []
        for (let j = 0; j < ~~random(1, 6); j++) {
          let hole = {
            x: random(width),
            y: random(height),
            size: random(minSize*.01, minSize*.8),
            depth: ~~random(1, 3),
            points: []
          }
          this.store.holes.push(hole)
          
          for (let k = 0; k < TWO_PI; k += TWO_PI/32) {
            let x = cos(k) * random(minSize*.01, minSize*.8)
            let y = sin(k) * random(minSize*.01, minSize*.8)
            hole.points.push([x, y])
          }
        }
      },
      
      // Eventually each layer will have its own controllable fps
      // `offscreen` is an extra offscreen canvas unique to this layer
      // All draw commands are now mapped to this.canvas so draw like normal
      draw (offscreen) {
        // First write to offscreen
        // then cut out a chunk of wallpaper
        // then paste to main canvas
        let size = this.store.size
        let cols = this.store.cols
        let spaceY = this.store.spaceY
        
        // Draw offscreen, set a shadow to the main canvas, then paste the offscreen onto the canvas
        clear()
        offscreen.clear()
        offscreen.strokeWeight(minSize*.003)
        offscreen.fill(this.colors[this.store.bg])
        
        // Circular pattern
        for (let y = -1; y < height/size*spaceY + 1; y++) {
          for (let x = -1; x < cols; x++) {
            let col1 = [...this.colors[this.store.bg]]
            col1[0] += 50 - noise(x*.25, y*.25)*100
            col1[1] += noise(x*.25+10*this.store.offset.x, y*.25+10*this.store.offset.x)*.4
            col1[2] += noise(x*.25+30*this.store.offset.x, y*.25+30*this.store.offset.y)*.4
            offscreen.stroke(col1)
            
            offscreen.push()
            offscreen.translate(this.store.offset.x, this.store.offset.y)
            offscreen.translate(x*size + (floor(y)%2 * size/2), y*size/spaceY)
            offscreen.circle(0, 0, this.store.size*this.store.scale)
            offscreen.circle(0, 0, this.store.size*this.store.scale*.75)
            offscreen.circle(0, 0, this.store.size*this.store.scale*.5)
            offscreen.circle(0, 0, this.store.size*this.store.scale*.25)
            offscreen.circle(0, 0, 0)
            offscreen.pop()
          }
        }
        
        // Cut out a chunk of wallpaper
        if (this.id !== 'bg0') {
          offscreen.noStroke()
          offscreen.erase()
          
          for (let i = 0; i < this.store.holes.length; i++) {
            let hole = this.store.holes[i]
            offscreen.push()
            offscreen.translate(hole.x, hole.y)
            offscreen.beginShape()
            hole.points.forEach(point => {
              offscreen.vertex(point[0], point[1])
            })
            offscreen.endShape(CLOSE)
            offscreen.pop()
          }
          
          offscreen.noErase()
        }
        
        // Add shadow
        drawingContext.shadowColor = 'black'
        drawingContext.shadowBlur = minSize*.01
        image(offscreen, 0, 0)
        drawingContext.shadowBlur = 0
      }
    })
  }
})
