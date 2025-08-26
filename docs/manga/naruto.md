---
title: Naruto
emoji: ✅
excerpt: We never see him becoming Hokage
imgURL: naruto-tome-42.jpg
imgAlt: Naruto cover
tags: 
    - ninja
    - shonen 
    - big3
---

<script setup lang="ts">
import Blur from '@components/Blur.vue'
import BlurryImage from '@components/BlurryImage.vue'
import { useData } from 'vitepress'

const {frontmatter} = useData();
</script>


<!-- magic comment to set LTeX settings -->
<!-- LTeX: enabled=false -->

![Naruto is GOAT](https://img.shields.io/badge/Rank-GOAT-blue)

<!-- Citation -->
> {{ frontmatter.excerpt }}
<!-- LTeX: enabled=true -->

<Blur>
Naruto is the son of the 4th Hokage.
Tobi is Obito.
Itachi is a good guy.
</Blur>


<BlurryImage :srcUrl="frontmatter.imgURL" :alt="frontmatter.imgAlt" />