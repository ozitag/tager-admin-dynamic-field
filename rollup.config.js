import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
  },
  external: [
    /@babel\/runtime/,
    'vue',
    '@vue/composition-api',
    '@tager/admin-services',
    '@tager/admin-ui',
    'lodash.kebabcase',
  ],
  plugins: [
    /**
     * Must be before rollup-plugin-typescript2 in the plugin list
     * Reference:
     * https://github.com/ezolenko/rollup-plugin-typescript2#rollup-plugin-node-resolve
     */
    resolve({ extensions: ['.ts', '.tsx', '.js', '.css', '.svg', '.vue'] }),
    commonjs(),
    typescript(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    vue(),
    babel({
      /**
       * Reference:
       * https://github.com/ezolenko/rollup-plugin-typescript2#rollup-plugin-babel
       * https://github.com/rollup/plugins/tree/master/packages/babel#extensions
       */
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      /**
       * Reference:
       * https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
       */
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
};
