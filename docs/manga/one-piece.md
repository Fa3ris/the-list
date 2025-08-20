---
title: One Piece
emoji: 🔄⏳📅 
excerpt: When will this end?
imgURL: assets/one-piece-tome-61.jpg
tags: 
    - pirate
    - shonen 
    - big3
---

<script setup lang="ts">
import { useData } from 'vitepress'
import BlurryImage from '@components/BlurryImage.vue'

const {frontmatter} = useData();
</script>
<!-- LTeX: enabled=false -->
# {{ frontmatter.title }}
<!-- LTeX: enabled=true -->

<BlurryImage :srcUrl="frontmatter.imgURL" :alt="frontmatter.imgAlt" :width="250" :height="450" />