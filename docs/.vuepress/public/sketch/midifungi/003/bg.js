export default function () {
new Layer({
  id: 'bg',

  colors: [
    // green
    '#10D7AE'
  ],
  
  draw () {
    background(this.colors[0])
  }
})
}