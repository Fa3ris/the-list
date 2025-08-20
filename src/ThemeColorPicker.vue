<template>
  <div :style="{display: 'flex'}">
    <input type="color" :id="id" name="bg-color" :value="value" @change="handleValue" />
    <label :for="id">{{ cssVar }} {{ value }}</label>
  </div>
</template>


<script setup lang="ts">
import { useId, ref } from 'vue';

const props = defineProps({
  cssVar: {
    default: '--vp-c-brand-1',
    type: String,
  },
  value: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{
  change: [name: string, value: string ]
}>()
const id = useId();


const value = ref(props.value)

const handleValue = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  value.value = target.value
  emit('change', props.cssVar, target.value)
}
</script>
