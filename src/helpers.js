import cloneDeep from '../node_modules/lodash-es/cloneDeep.js'
import defaultsDeep from '../node_modules/lodash-es/defaultsDeep.js'
import set from '../node_modules/lodash-es/set.js'
import get from '../node_modules/lodash-es/get.js'
import throttle from '../node_modules/lodash-es/throttle.js'

window.cloneDeep = cloneDeep
window.defaultsDeep = defaultsDeep
window.set = set
window.get = get
window.throttle = throttle

// @see https://github.com/jamestalmage/normalize-range/blob/master/index.js
window.wrap = function (value, min, max) {
  var maxLessMin = max - min;
  return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
}

/**
 * Uses frameCount to return the progress within a loop of the passed number of seconds
 * @param {*} seconds 
 * @returns 
 */
window.getProgress = function (seconds = 7) {
  const period = +params.fps * seconds / 2
  return (frameCount % period) / period
} 

/**
 * @see https://stackoverflow.com/questions/5294955/how-to-scale-down-a-range-of-numbers-with-a-known-min-and-max-value
 * @param {*} unscaledNum The number to be scaled
 * @param {*} minAllowed  The minimum allowed value of the scaled number
 * @param {*} maxAllowed  The maximum allowed value of the scaled number
 * @param {*} min         The minimum value of the original number
 * @param {*} max         The maximum value of the original number
 * @returns 
 */
  window.scaleBetween = function (unscaledNum, minAllowed, maxAllowed, min, max) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

/**
 * @see https://stackoverflow.com/a/14627826
 * @param {*} number The number to round
 * @param {*} increment The increment to round to
 * @param {*} offset The number to start stepping from
 * @returns 
 */
window.stepRound = function (number, increment, offset) {
  return Math.ceil((number - offset) / increment ) * increment + offset;
}