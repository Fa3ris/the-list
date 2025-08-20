
<script setup lang="ts">
import Card from '@components/Card.vue'
import BlurryImage from '@components/BlurryImage.vue'

import { withBase, } from 'vitepress'

import {data} from '@vp/data-loader/manga.data.ts'
import type {YamlMetadata} from '@vp/data-loader/directory-entries-loader'
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

/* override default them style with stronger selector */
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
<Card 
  :title="entry.title"
  :excerpt="entry.excerpt"
>
  <template #image v-if="entry.imgURL">
    <BlurryImage :srcUrl="withBase(entry.imgURL)" :alt="entry.imgURL" />
  </template>
</Card>
</a>
</template>

</section>
</template>