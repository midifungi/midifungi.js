# Midifungi - A layer-based p5.js framework with live editing and MIDI support 🎛️🎹

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

:::: code-group
::: code-group-item CDN
```html:no-v-pre
<!-- First add p5.js -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
<!-- Then add midifungi.js -->
<script src="https://unpkg.com/midifungi@{{$theme.pkgVersion}}/dist/midifungi.js"></script>
```
:::
::: code-group-item NPM
```bash
npm i p5
npm i midifungi
```


#### Option 1

```js
import 'p5'
import {Layers, Layer} from 'midifungi'

new Layer()
```

#### Option 2
```js
import 'p5'
import midifungi from 'midifungi'

new midifungi.Layer()
```
:::
::::



## Getting Started

Let's create a quick generative sketch that demonstrates some of the main feature of Midifungi.js. The drawing methods are still all like p5, but instead of drawing into a single canvas we'll be drawing into multiple canvases stacked on top of each other.



### The draw loop

In p5.js the action usually starts from within a single `setup()` and `draw()`, but with Midifungi.js every layer has their own `setup()` and `draw()`. When you create a new layer, a new canvas is created and when these methods are called all p5.js methods draw into that canvas automatically.

Let's start with a simple black canvas:

@[code{2-6}](./.vuepress/public/example/001/bg-1.js)
<Example id="example-001-1" :layers="['001/bg-1']" />



### Live editing

Let's spice things up by selecting a random color from a palette. `Layers.default.colors` contains a palette based on [Shades of Purple VSCode theme](https://marketplace.visualstudio.com/items?itemName=ahmadawais.shades-of-purple), which we'll pass into the layers `opts.menu`. This right-click menu system helps you explore variations within your sketch without coding, and you can even be mapped these to MIDI devices!

You can access these variables within the `setup()` and `draw()` by prefixing the property with a `$`. Try right-clicking (or tap and hold on mobile) to activate the menu:

@[code{2-9}](./.vuepress/public/example/001/bg-2.js)
<Example id="example-001-2" :layers="['001/bg-2']" />

### Stacking Layers

Now let's introduce a few new layers to demonstrate how stacking works. First, let's add a circle whose size we can adjust. We'll give it an `id` so that we can easily reference it from other layers with `Layers[id]`.

Notice how you can now right-click on either the background or the circle to edit their specefic features:

@[code{2-12}](./.vuepress/public/example/001/bg-3.js)
<Example id="example-001-3" :layers="['001/bg-2', '001/bg-3']" />

Ok! Now let's add yet another layer on top. We'll use it to place an emoji and scale it to match the size of the circle. Each layer exposes their editable variables in `Layer[id].store[prop]`, and **not** in `Layer[id].menu[prop]` (which is what holds the actual menu config). So to get the circle's size, we would do `Layer.circle.store.size`:

@[code{2-14}](./.vuepress/public/example/001/bg-4.js)
<Example id="example-001-3" :layers="['001/bg-2', '001/bg-3', '001/bg-4']" />

---

::: tip 📅 COMING SOON
This project is a work in progress, more will be here soon!
:::