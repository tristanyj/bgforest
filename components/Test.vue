<script setup lang="ts">
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';

import Tree from '~/assets/classes/Tree';

const SVG_MAX_WIDTH = 1600;
const SVG_MAX_HEIGHT = 1800;

const container = ref(undefined);
const trees = ref<Tree[]>([]);

onMounted(() => {
  if (!container?.value) {
    return;
  }

  for (let i = 0; i < 100; i++) {
    const data = {
      name: `Game ${i + 1}`,
      rating: 5 + Math.random() * 5,
      numRatings: Math.floor(Math.random() * 10000),
      category: ['Strategy', 'Family', 'Party', 'Abstract', 'Thematic'][Math.floor(Math.random() * 5)],
      year: 2000 + Math.floor(Math.random() * 24),
      complexity: 1 + Math.random() * 4,
    };

    trees.value.push(new Tree(i, data));
  }

  const svg = d3.select('body').append('svg').attr('viewBox', `0 0 ${SVG_MAX_WIDTH} ${SVG_MAX_HEIGHT}`).attr('preserveAspectRatio', 'xMidYMid meet');

  trees.value.forEach((tree) => {
    tree.init(svg);
    tree.draw(0, 0, 30, Math.PI / 2, 8);
  });
});
</script>

<template>
  <div ref="container">
    <div :class="$style.test">hello</div>
  </div>
</template>

<style lang="scss" module>
.test {
  color: $primary;
}
</style>
