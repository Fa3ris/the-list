---
layout: home
hero:
  name: The List
  text: Things I did or plan to do... someday... maybe
  tagline: Just something for myself
  actions:
    - theme: brand
      text: Anime
      link: /anime
    - theme: alt
      text: Book
      link: /book
    - theme: brand
      text: Programming
      link: /dev
    - theme: alt
      text: Game
      link: /game
    - theme: brand
      text: Japanese
      link: /japanese
    - theme: alt
      text: Manga
      link: /manga
    - theme: brand
      text: Movie
      link: /movie
    - theme: alt
      text: Music
      link: /music
    - theme: brand
      text: Series
      link: /series
    - theme: alt
      text: Travel
      link: /travel
    - theme: brand
      text: Webtoon
      link: /webtoon
features:
  - title: "Been there, done that"
    details: Stuff I particularly enjoyed
  - title: TODO
    details: Stuff that I would like/need to make time to do
  - title: Mix of French and English
    details: Depends on the mood
next: false
---

<script setup lang="ts">

import Card from '@components/Card.vue';
import { Book, Camera, CassetteTape, Clapperboard, Gamepad2, Navigation, Variable } from 'lucide-vue-next';
import { useData, withBase } from 'vitepress';
import type { FunctionalComponent } from 'vue';


const iconForCategory = {
  "manga": Book,
  "book": Book,
  "anime": Camera,
  "movie": Clapperboard,
  "series": Camera,
  "music": CassetteTape,
  "webtoon": Book,
  "game": Gamepad2,
  "travel": Navigation,
  "dev" : Variable,
} satisfies Record<string, FunctionalComponent>

const emoji = {
  'japanese': '🇯🇵'
}

const {frontmatter} = useData();
</script>

<div :class="$style.grid">
  <a 
    :href="withBase(action.link)" 
    :class="$style.cardLink" 
    v-for="action in frontmatter.hero.actions"
  >
    <Card>
      <template #title>
        <h3 :class="$style.title">
          <component 
            v-if="iconForCategory[action.link.replace('/', '')]"
            :is="iconForCategory[action.link.replace('/', '')]" 
          />
          <template v-if="emoji[action.link.replace('/', '')]">
            <span>{{ emoji[action.link.replace('/', '')] }}</span>
          </template>
          {{ action.text }}
        </h3>
      </template>
    </Card>
  </a>
</div>

<style module>
  .title {
    display: flex;
    column-gap: 4px
  }

  .grid {
    margin-top: 24px;
    display: grid;
  column-gap: 8px;
    row-gap: 8px;
  }


  @media (min-width: 680px) {

.grid {

grid-template-columns: repeat(2, 1fr);
}

  }


   @media (min-width: 960px) {

.grid {
grid-template-columns: repeat(3, 1fr);
}

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
