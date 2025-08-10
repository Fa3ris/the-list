<template>
  <div :style="{display: 'flex'}">
    <input type="color" :id="id" name="bg-color" :value="value" @change="handleValue" />
    <label :for="id">{{ cssVar }} {{ value }}</label>
  </div>
</template>


<script setup lang="ts">
import { useId, defineProps, ref } from 'vue';

const props = defineProps({
  cssVar: {
    default: '--vp-c-brand-1',
    type: String,
  }
})
const id = useId();


const value = ref("#e66465" )

const handleValue = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  value.value = target.value
  document.documentElement.style.setProperty(props.cssVar, target.value);
}
</script>
