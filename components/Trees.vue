<script setup lang="ts">
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import type { GameData } from '~/types';
import Forest from '~/assets/classes/Forest';

const props = defineProps<{ data: GameData[] }>();

const SVG_MAX_WIDTH = 2000;
const SVG_MAX_HEIGHT = 8500;

const container = ref(undefined);

onMounted(() => {
  if (!container?.value) return;

  const svg = d3.select('body').append('svg').attr('viewBox', `0 0 ${SVG_MAX_WIDTH} ${SVG_MAX_HEIGHT}`).attr('preserveAspectRatio', 'xMidYMid meet');

  const forest = new Forest(props.data, svg);
  forest.init();
  forest.draw();
});
</script>

<template>
  <div
    ref="container"
    :class="$style.container"
  />
</template>

<style lang="scss" module>
.container {
  margin: 60px;
}
</style>
