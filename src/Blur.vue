<template>
    <p :class="$style['flex']">
    SPOILER
    <div :data-tooltip="blur ? 'Click to reveal' : undefined">
        <div :class="{ [$style['blur-container']]: blur }" @click="blur = false">
            <slot />
        </div>
    </div>
    </p>
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

.flex {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}

[data-tooltip]:hover::before {
    content: attr(data-tooltip);
    position: absolute;
    transform: translateX(-100%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
}
</style>