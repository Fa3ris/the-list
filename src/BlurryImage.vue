<script setup lang="ts">
import Blur from '@components/Blur.vue'
import { ref } from 'vue'

const isBlurred = ref(true)

const handleHover = () => {
    isBlurred.value = false
}

defineProps({
  srcUrl: String,
  alt: String 
})
</script>

<template>
    <img :src="srcUrl" :alt="alt"
        :class="{ [$style['blurrable']]: true, [$style['blurry']]: isBlurred }" @mouseenter="handleHover" />
</template>

<style module>
img.blurrable {
    transition: filter 0.5s;
}

img.blurry {
    filter: blur(5px);
}
</style>
