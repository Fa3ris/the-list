
<script setup lang="ts">
import Card from '@components/Card.vue'

import { withBase, } from 'vitepress'

import type { YamlMetadata } from '@vp/data-loader/directory-entries-loader'
import type { PropType } from 'vue'


defineProps({
    data: {
        type: Array as PropType<YamlMetadata[]>
    } ,
})
</script>

<style module>
section.grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 4px;
    row-gap: 4px;
}

/* override default theme style with stronger selector */
.cardLink.cardLink {
    text-decoration: none;
    color: inherit;
}

.cardLink.cardLink:hover {
    text-decoration: none;
    color: inherit;
}

.cardLink.cardLink:visited {
    color: inherit;
}
</style>

<template>
    <section :class="$style.grid">
        <template v-for="entry in data">
            <a :href="entry.path" :class="$style.cardLink">
                <Card :title="entry.title" :excerpt="entry.excerpt" :emoji="entry.emoji" :tags="entry.tags" :imageUrl="entry.imgURL ? withBase(entry.imgURL) : undefined" :imageAlt="entry.imgAlt" />
            </a>
        </template>
    </section>
</template>