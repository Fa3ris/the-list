<script setup lang="ts">
import { ref } from "vue";

const isBlurred = ref(true);

const handleHover = () => {
  isBlurred.value = false;
};

defineProps({
  srcUrl: String,
  alt: String,
  width: Number,
  height: Number,
});
</script>

<template>
  <img
    :src="srcUrl"
    :alt="alt"
    :width="width"
    :height="height"
    :class="{ [$style['blurrable']]: true, [$style['blurry']]: isBlurred }"
    @mouseenter="handleHover"
  />
</template>

<style module>
img.blurrable {
  transition: filter 0.5s;
}

img.blurry {
  filter: blur(5px);
}
</style>
