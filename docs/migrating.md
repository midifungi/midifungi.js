# OpenProcessing, NEORT, and other Processing platforms

Because every layer has their own canvas, not every platform is aware of which canvas to screenshot for your arts cover image. This will be fixed on a per-platform basis, but for now here's you can try:
- Right click and download a PNG/JPG before taking a screenshot. This resizes the main p5 canvas to the correct size and merges all visible layers onto it
- Merge everything onto the top layer and then paste it into the main canvas (you can run this in the console as well):

```js
topLayer = Layers.all[Layers.all.length-1]
Layers.mergeLayers(topLayer)
resizeCanvas(topLayer.width, topLayer.height)
image(topLayer.canvas, 0, 0)
```

# `preload()`, `setup()`, and `draw()`

These methods are no longer required but they're still useful for setting things up globally for your project. They each run before their `Layer` counterpart, so:

```js
new Layer({
  setup () {
    console.log('b')
  }
})

function setup () {
  console.log('a')
}
```

would output:

```
a
b
```

# `createCanvas()`

Midifungi already creates a fullscreen main canvas, although it's only ever really used when downloading screenshots. Instead, every layer gets a canvas sized to its containers element (or fullscreen if unspecified).