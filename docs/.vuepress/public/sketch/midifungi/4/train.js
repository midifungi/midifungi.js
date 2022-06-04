export default function () {
Layers.create(() => {
  new Layer({
    id: 'train',
    menu: {
      emoji: ['🚂', '🚄']
    },
    store: {
      tracers: [],
      x: 0,
      speed: 0,
      acc: .5,
      cabs: ~~random(10, 60),

      // -1 = departing, 0 = idle, 1 = arriving
      state: 0,
      waiting: 0
    },
    setup () {
      textAlign(CENTER, CENTER)
      $waiting = ~~random(this.fps*3)
    },
    draw () {
      clear()
      const size = minSize * .8
      
      switch ($state) {
        // Depart to the left
        case -1:
          $speed += $acc
          $x -= $speed

          // Wrap around on right side
          if ($x < -size*$cabs) {
            $x = $x*-1 - $speed
            $state = 1
          }
        break

        // Idling
        case 0:
          $waiting += 1
          if ($waiting > this.fps*3) {
            $waiting = 0
            $state = -1
          }
        break

        // Arraive from the right
        case 1:
          $speed -= $acc
          $x -= $speed

          if ($speed > -$acc && $speed < $acc) {
            $speed = 0
            $x = 0
            $state = 0
          }
        break
      }
      
      textSize(size)
      text($emoji, width/2 + $x, height/2)
      for (let i = 1; i < $cabs; i++) {
        text('🚃', width/2 + $x + i*size, height/2)
      }
    }
  })
})
}