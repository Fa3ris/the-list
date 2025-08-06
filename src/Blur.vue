<template>
    <div :data-tooltip="blur ? 'Click to reveal' : undefined">
        <div :class="{ [$style['blur-container']]: blur }" @click="blur = false">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const blur = ref(true)
</script>

<style module>
.blur-container {
    filter: blur(5px);
    cursor: pointer;
}

[data-tooltip]:hover::before {
    content: attr(data-tooltip);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
}
</style>