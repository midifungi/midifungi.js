import cloneDeep from '../node_modules/lodash-es/cloneDeep.js'
import defaultsDeep from '../node_modules/lodash-es/defaultsDeep.js'
import throttle from '../node_modules/lodash-es/throttle.js'

// Lodash helpers
globalThis.clone = cloneDeep
globalThis.defaults = defaultsDeep
globalThis.throttle = throttle

/**
 * Wrap numbers between a range (pacman style)
 * @see https://github.com/jamestalmage/normalize-range/blob/master/index.js
 * 
 * @param {*} value The value to wrap
 * @param {*} min The min value to reset to when value is larger than max
 * @param {*} max The maximum value before wrapping back to min
 * @returns 
 */
globalThis.wrap = function (value, min, max) {
  var maxLessMin = max - min;
  return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
}

/**
 * Uses frameCount to return the progress within a loop of the passed number of seconds
 * @param {*} seconds 
 * @returns 
 */
globalThis.getProgress = function (seconds = 7) {
  const period = +params.fps * seconds / 2
  return (frameCount % period) / period
} 

/**
 * @see https://stackoverflow.com/a/14627826
 * @param {*} number The number to round
 * @param {*} increment The increment to round to
 * @param {*} offset The number to start stepping from
 * @returns 
 */
globalThis.stepRound = function (number, increment, offset) {
  return Math.ceil((number - offset) / increment ) * increment + offset;
}

/**
 * Polygons
 * @see https://p5js.org/examples/form-regular-polygon.html
 */
globalThis.polygon = function (x, y, radius, npoints, canv) {
  if (!canv) canv = window
  
  const angle = TWO_PI / npoints
  canv.beginShape()
  for (let a = 0; a < TWO_PI; a += angle) {
    const sx = x + cos(a) * radius
    const sy = y + sin(a) * radius
    canv.vertex(sx, sy)
  }
  canv.endShape(CLOSE)
}
