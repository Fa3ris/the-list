---
title: Get Backers
emoji:  ✅
excerpt: The first series I completed
imgURL: get-backers-tome-15.jpg
imgAlt: Get Backers cover
tags: 
    - jagan
    - raitei
---

<script setup lang="ts">
import BlurryImage from '@components/BlurryImage.vue'

import { useData } from 'vitepress'

const {frontmatter} = useData();

</script>

<BlurryImage :srcUrl="frontmatter.imgURL" :alt="frontmatter.imgAlt" :width="250" :height="450" />