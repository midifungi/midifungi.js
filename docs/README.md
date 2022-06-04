# <img src="/midifungi-title.png" alt="Midifungi" style="height:32px; position: relative; top: 5px"> - A fantasy p5.js framework, digital art gallery, and daily devlog
<!-- A layer-based p5.js framework with live editing and MIDI support 🎛️🎹 -->

:::warning 📅 Announcing Mid June 2022
Midifungi is the result of asking "what if the library itself is the medium?". This project is a fantasy framework and monorepo that contains Midifungi.js, this site and documentation, my daily art gallery, and technical blog all in one package.

It's more of a creative expression than an [open sourced project](https://github.com/midifungi/midifungi) that should be taken seriously. Eventually I may sell some of the examples as NFTs so that I can continue to explore this project 🌈
:::

<Midifungi title="Chewie Choo" :layers="['@midifungi/2/starfield', '@midifungi/4/starfield-clone', '@midifungi/4/train', '@midifungi/4/crowd']" />

<div class="row">
  <div class="col-6">
    <Midifungi title="Spirit Emojis" :layers="['@midifungi/3/bg', '@midifungi/3/shapes', '@midifungi/3/checker', '@midifungi/3/self', '@midifungi/3/squid']" />
  </div>
  <div class="col-6">
    <Midifungi title="Billions and Billions" :layers="['@midifungi/2/starfield', '@midifungi/2/glass', '@midifungi/2/watercanvas', '@midifungi/2/glass-filter', '@midifungi/2/lead']" />
  </div>
  <div class="col-6">
    <Midifungi title="Lily Pads" :layers="['@midifungi/1/lilies', '@midifungi/1/ripples']" />
  </div>
</div>


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

::: warning ⚠️ Troubleshooting
It depends on which bundler you're using but if you get a blank screen or `p5 is undefined` then try making p5 global with `window.p5 = p5` or `globalThis.p5 = p5`. 

```js
// Import
import p5 from 'p5'
import midifungi from 'midifungi'
window.p5 = p5
```
:::
::: code-group-item Clone this site
::: tip Cloning this site locally
Because this is a fantasy framework I'm not running ads or analytics (outside of what's provided by [hosting on Netlify](https://www.netlify.com/products/analytics/)). It's a completely self contained static [vuepress@next](https://v2.vuepress.vuejs.org/) site and JavaScript framework and everything is rendered locally. Cloning this site for play, collaboration, or research is highly encouraged (commercial `/LICENSE` is generally MIT)

To clone this site locally you'll need [NodeJS](https://nodejs.org/en/) installed on your system. It's also helpful to have [git](https://git-scm.com/) so that you can clone [from Github](https://github.com/midifungi/midifungi) and install the dependencies:
```bash
git clone https://github.com/midifungi/midifungi
cd midifungi
npm i
npm start
```

After that's done, you can start things off with `npm start` and end things by closing the terminal or hitting <kbd>CONTROL + C</kbd>. Visit `//localhost:8080` in your browser to start exploring this site offline. The content on this site matches the directory structure in `/docs/`, with the index pages labeled as `README.md`. This page is generated from `/docs/README.md`

If you're interested in the sketches and examples, they are located in `/docs/public/sketch/`. To see how they are assembled, view the corresponding pages in `/docs/sketches/`
:::
:::

:::
::::



## Getting Started

Let's create a quick generative sketch that demonstrates some of the main feature of Midifungi.js. The drawing methods are still all like p5, but instead of drawing into a single canvas we'll be drawing into multiple canvases stacked on top of each other.



### The draw loop

In p5.js the action usually starts from within a single `setup()` and `draw()`, but with Midifungi.js every layer has their own `setup()` and `draw()`. When you create a new layer, a new canvas is created and when these methods are called all p5.js methods draw into that canvas automatically.

Let's start with a simple black canvas:

@[code{2-6}](./.vuepress/public/example/1/bg-1.js)
<Example id="example-1-1" :layers="['1/bg-1']" />



### Live editing

Let's spice things up by selecting a random color from a palette. `Layers.default.colors` contains a palette based on [Shades of Purple VSCode theme](https://marketplace.visualstudio.com/items?itemName=ahmadawais.shades-of-purple), which we'll pass into the layers `opts.menu`. This right-click menu system helps you explore variations within your sketch without coding, and you can even be mapped these to MIDI devices!

You can access these variables within the `setup()` and `draw()` by prefixing the property with a `$`. Try right-clicking (or tap and hold on mobile) to activate the menu:

@[code{2-9}](./.vuepress/public/example/1/bg-2.js)
<Example id="example-1-2" :layers="['1/bg-2']" />

### Stacking Layers

Now let's introduce a few new layers to demonstrate how stacking works. First, let's add a circle whose size we can adjust. We'll give it an `id` so that we can easily reference it from other layers with `Layers[id]`.

Notice how you can now right-click on either the background or the circle to edit their specefic features:

@[code{2-12}](./.vuepress/public/example/1/bg-3.js)
<Example id="example-1-3" :layers="['1/bg-2', '1/bg-3']" />

Ok! Now let's add yet another layer on top. We'll use it to place an emoji and scale it to match the size of the circle. Each layer exposes their editable variables in `Layer[id].store[prop]`, and **not** in `Layer[id].menu[prop]` (which is what holds the actual menu config). So to get the circle's size, we would do `Layer.circle.store.size`:

@[code{2-22}](./.vuepress/public/example/1/bg-4.js)
<Example id="example-1-4" :layers="['1/bg-2', '1/bg-3', '1/bg-4']" />

---

# Mapping variables to MIDI

::: tip 📅 COMING SOON
This project is a work in progress, more will be here soon!
:::