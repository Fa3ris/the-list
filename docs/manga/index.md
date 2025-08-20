---
# hide the next navigation link
next: false
---

<script setup>
import Blur from '@components/Blur.vue'
import BlurryImage from '@components/BlurryImage.vue'
import Card from '@components/Card.vue'

import { withBase, } from 'vitepress'

import {data} from '@vp/data-loader/manga.data.ts'

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

# Manga

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

Get Backers
Naruto
One piece
Bleach
Dragon ball
Hunter x Hunter
Jujutsu Kaisen
Soul Eater
Black Clover
Bakuman
Dream land
My hero academia
Gotobun no Hanayome
Domestic girlfriend
Yu Yu hakusho
One punch man
Fire force
Tokyo ghoul
A silent voice
Le prix du reste de ma vie
300 jours avec toi
Blue box
Seven deadly sins
Kaguya sama: love is war
Magi
Fire punch
Chainsaw man
Sakamoto days
Rurouni Kenshin
We never learn
Noragami
Assassination classroom
Yozakura family
I want to eat your pancreas
Hell's paradise
Kagurabachi
Kingdom
Berserk
Air gear
Shaman King
Zom 100
Frieren - beyond journey's end
Radiant
Fairy tail
mob psycho 100
the promised neverland
Hajime no Ippo
Akame ga kill
oshi no ko
smoking behind the supermarket with you
the ancient magus bride
horimiya

Web toon
The horizon
The boxer
The God of High school
Tower of god
Solo leveling
