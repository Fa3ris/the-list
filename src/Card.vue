<template>
  <div :class="$style.card">
    <!-- Image Section -->
    <div :class="$style.imageSection" v-if="imageUrl || $slots.image">
      <slot name="image">
        <img 
          v-if="imageUrl" 
          :src="imageUrl" 
          :alt="imageAlt || title || 'Card image'"
          :class="$style.image"
        />
      </slot>
    </div>

    <!-- Content Section -->
    <div :class="$style.content">
      <!-- Title Section -->
      <div :class="$style.titleSection" v-if="title || $slots.title">
        <slot name="title">
          <h3 :class="$style.title">{{ title }}</h3>
        </slot>
      </div>

      <!-- Excerpt Section -->
      <div :class="$style.excerptSection" v-if="excerpt || $slots.excerpt">
        <slot name="excerpt">
          <p :class="$style.excerpt">{{ excerpt }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imageUrl: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  excerpt: {
    type: String,
    default: ''
  }
})
</script>

<style module>
.card {
  border: 1px solid;
  border-radius: 12px;
  overflow: hidden;
  /* background: white; */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.imageSection {
  width: 100%;
  max-height: 300px;
  position: relative;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.content {
  padding: 1rem;
}

.titleSection {
  margin-bottom: 0.75rem;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  /* color: #1f2937; */
  line-height: 1.3;
}

.excerptSection {
  margin-bottom: 0;
}

.excerpt {
  margin: 0;
  /* color: #6b7280; */
  line-height: 1.5;
  font-size: 0.875rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .card {
    /* background: #1f2937; */
    /* border-color: #374151; */
  }

  .title {
    /* color: #f9fafb; */
  }

  .excerpt {
    /* color: #d1d5db; */
  }
}
</style>
