<script setup lang="ts">
import ThemeColorPicker from "@components/ThemeColorPicker.vue";
import { data } from "@vp/data-loader/style-vars.data.ts";

const toConfigure = Object.entries(data).filter(
  ([selector, declarations]) => Object.keys(declarations).length > 0,
);

const handleVarChange = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};
</script>

<!-- 

TODO
put into page that explain what each color does and with example next to it
load/save from/to local storage
reset on color
reset all
-->

<template>
  <fieldset v-for="entry in toConfigure">
    <legend>{{ entry[0] }}</legend>
    <div :class="$style['grid']">
      <ThemeColorPicker
        v-for="[name, value] in Object.entries(entry[1])"
        :css-var="name"
        :value="value"
        @change="handleVarChange"
      />
    </div>
  </fieldset>
</template>

<style module>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
