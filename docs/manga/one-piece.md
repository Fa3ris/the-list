---
title: One Piece
emoji: 🔄⏳📅 
excerpt: When will this end?
imgURL: one-piece-tome-61.jpg
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

<BlurryImage :srcUrl="frontmatter.imgURL" :alt="frontmatter.imgAlt" />