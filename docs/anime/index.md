---
title: Anime
emoji: 🌸
next: false
---

<script setup>
import EntriesGrid from '@components/EntriesGrid.vue'
import {data} from '@vp/data-loader/anime.data.ts'
</script>

# Anime

<EntriesGrid :data="data" />