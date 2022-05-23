import replace from '@rollup/plugin-replace'
import pkg from './package.json'

export default {
  input: 'src/rollup.js',
  context: 'window',
  output: {
    name: 'Moar',
    file: 'dist/midifungi.js',
    format: 'umd',
    banner: `/**
 * midifungi.js
 * ---
 * https://twitter.com/midifungi
 * https://github.com/midifungi/midifungi
 * ---
 * @version ${pkg.version}
 * @license "Apache 2.0"
 * ---
 * This file was bundled with Rollup
 */`
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'NPM_PACKAGE_VERSION': pkg.version,
        // @FIXME This is to remove the annoying warning about poly-decomp
        'isConcave && !canDecomp': 'false',
      }
    })
  ]
}