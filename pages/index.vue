<script setup lang="ts">
import type { GameData } from '~/types';
const { data } = useFetch<GameData[]>('https://api-python.tristanyj.com/top');
const sortMode = ref('a-z');

const sortedData = computed(() => {
  if (!data.value) return [];
  return data.value.sort((a, b) => {
    if (sortMode.value === 'a-z') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
});
</script>

<template>
  <Trees :data="sortedData" />
</template>
