
<template>
<div>
  <input type="color" :id="id" name="bg-color" value="#e66465" @change="bgColorChange" />
  <label :for="id">Background color</label>
</div>
</template>


<script setup lang="ts">
import { useId, defineProps } from 'vue';


const props = defineProps( {
  cssVar: {
    default: '--vp-c-brand-1',
    type: String,
  }
})
const id = useId();

 const bgColorChange = (event: Event ) => {
   const target = event.currentTarget as HTMLInputElement;
document.documentElement.style.setProperty(props.cssVar, target.value);
}
</script>
