---
next: false
---

<script setup>
import EntriesGrid from '@components/EntriesGrid.vue'
import {data} from '@vp/data-loader/manga.data.ts'
</script>

# Manga

<EntriesGrid :data="data" />
