# Midifungi - A layer-based p5.js framework with live editing and MIDI support 🎹🍄

:::warning 📅 Coming soon
Midifungi is an experimental framework and still in development. The goal is to announce quietly in Discords in June 2022 🌈
:::

<!-- <Midifungi :layers="['@midifungi/001/lilies', '@midifungi/001/ripples']" height=600 /> -->
<Midifungi id="sketch-002" :layers="['@midifungi/002/starfield', '@midifungi/002/glass', '@midifungi/002/watercanvas', '@midifungi/002/glass-filter', '@midifungi/002/lead']" />

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
<script src="https://unpkg.com/midifungi@{{$theme.pkgVersion}}/dist/midifungi.js"></script>
```

### Or import from NPM
#### Install dependencies
```bash
npm i p5
npm i midifungi
```

#### Option 1
```js
import p5 from 'p5'
import {Layers, Layer} from 'midifungi'
new Layer()
```

#### Option 2
```js
import p5 from 'p5'
import midifungi from 'midifungi'
new midifungi.Layer()
```

## Getting Started

### The first layer

<!-- :::tip By the way, you can still do things the old way!
In fact, you can add it to existing sketches just for the [MIDI mapping system](/midi) with zero modifcation to your existing code...but here we'll explore new ways to sketch 🧑‍🎨
::: -->

<!-- 
<div style="height: 300px">
  <example001 />
</div>

@[code{2-28}](./.vuepress/components/example/001-simple-layer/bg.js)

### Stacking layers

<div style="height: 400px">
  <example001x2 />
</div> -->