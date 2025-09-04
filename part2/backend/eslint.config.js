import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import stylisticsJS from '@stylistic/eslint-plugin-js'

export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs,jsx}'], 
    plugins: { 
      js ,
      '@stylistic/js': stylisticsJS,
    }, 

    rules:{
      '@stylistic/js/indent':['error',2],
      '@stylistic/js/linebreak-style':['error','unix'],
      '@stylistic/js/quotes':['error','single'],
      '@stylistic/js/semi':['error','never'],
    },

    extends: ['js/recommended'], 
    languageOptions: {
      sourceType:'module',
      ecmaVersion:'latest',
      // globals: globals.browser 
      globals:{...globals.node}
    } },
  pluginReact.configs.flat.recommended,
])
