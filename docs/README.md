# Midifungi - A layer-based p5.js framework with live editing and MIDI support 🎹🍄

<div style="height: 450px">
<example001 />
</div>

Midifungi is [p5.js](https://p5js.org/reference/) framework designed around the idea of creative coding in "layers of code" instead of "lines of code". You still sketch in a similar way, but instead of writing code into a single `draw()` you layer code across multiple draw loops each containing:
- their own canvas and offscreen buffer
- individual framerates and looping states
- context/right-click menus to update variables in real time
- a no-code, customizable MIDI mapping system
- and a lot more!

## Installing midifungi

### Include from CDN
```html:no-v-pre
<!-- First add p5.js -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
<!-- Then add midifungi.js -->
<script src="https://unpkg.com/midifungi@0.1.8/dist/midifungi.js"></script>
```

### Or import from NPM
```bash
npm i p5
npm i midifungi
```
```js
import p5 from 'p5'
import {Layers, Layer} from 'midifungi'
window.p5 = p5 // @fixme
```

## Getting Started

### The first layer

<!-- :::tip By the way, you can still do things the old way!
In fact, you can add it to existing sketches just for the [MIDI mapping system](/midi) with zero modifcation to your existing code...but here we'll explore new ways to sketch 🧑‍🎨
::: -->

<div style="height: 300px">
  <example001 />
</div>

@[code{2-28}](./.vuepress/components/example/001-simple-layer/bg.js)

### Stacking layers

<div style="height: 400px">
  <example001x2 />
</div>