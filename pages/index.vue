<script setup lang="ts">
import type { GameData } from '~/types';
const { data } = useFetch('https://api-python.tristanyj.com/top');
</script>

<template>
  <Trees :data="data as GameData[]" />
</template>
