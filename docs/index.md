---
layout: home
hero:
  name: The List
  text: Things I did or plan to do... someday... maybe
  tagline: Just something for myself
  actions:
    - theme: brand
      text: Anime
      link: /anime
    - theme: alt
      text: Book
      link: /book
    - theme: brand
      text: Programming
      link: /dev
    - theme: alt
      text: Game
      link: /game
    - theme: brand
      text: Manga
      link: /manga
    - theme: alt
      text: Movie
      link: /movie
    - theme: brand
      text: Music
      link: /music
    - theme: alt
      text: Series
      link: /series
features:
  - title: 'Been there, done that'
    details: Stuff I particularly enjoyed
  - title: TODO
    details: Stuff that I would like/need to make time to do
  - title: Mix of French and English
    details: Depends on the mood
---


![Static Badge](https://img.shields.io/badge/passing-too-blue)

![Static Badge](https://img.shields.io/badge/fire-too-green)


<script setup>
import ThemeColorPicker from '@components/ThemeColorPicker.vue'
import {data} from '@vp/data-loader/style-vars.data.ts'

const toConfigure = Object.entries(data).filter(([selector, declarations]) => Object.keys(declarations).length > 0)

const handleVarChange = (name, value) => {
 document.documentElement.style.setProperty(name, value);
}
</script>

<!-- 

TODO extract as component 
put into page that explain what each color does and with example next to it
load/save from/to local storage
reset on color
reset all

 -->
<template v-for="entry in toConfigure">
<fieldset>
 <legend>{{ entry[0] }}</legend>
 <div :class="$style['grid']">
<ThemeColorPicker v-for="[name, value] in Object.entries(entry[1])"
:css-var="name" :value="value" @change="handleVarChange"/> 
 </div>
</fieldset>

</template>

<img src="./screenshot.png" alt="here is a screenshot"/>

<style module>

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
