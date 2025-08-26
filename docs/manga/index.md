---
next: false
---

<script setup>
import EntriesGrid from '@components/EntriesGrid.vue'
import {data} from '@vp/data-loader/manga.data.ts'

const top3 = data.slice(0, 3);
const remain = data.slice(3);
</script>


<style module>

    /* override default theme style with stronger selector */
.cardLink.cardLink {
    color: inherit;
}

.cardLink.cardLink:hover {
    color: inherit;
}

.cardLink.cardLink:visited {
    color: inherit;
}
</style>

<EntriesGrid :data="top3" />

<ul>
 <li v-for="entry in remain">
    <a :href="entry.path"  :class="$style.cardLink">
    {{ entry.emoji }} {{ entry.title }}
    </a>
</li>
</ul>