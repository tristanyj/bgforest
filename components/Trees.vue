<script setup lang="ts">
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import type { GameData, SortMode, D3SvgSelection } from '~/types';
import Forest from '~/assets/scripts/Forest';

const interactionStore = useInteractionStore();

const props = defineProps<{
  data: GameData[];
  sort: SortMode;
}>();

const SVG_MAX_WIDTH = 2000;
const SVG_MAX_HEIGHT = 8100;

const svg = ref<D3SvgSelection | undefined>(undefined);
const container = ref(undefined);
const isLoading = ref(true);

function removeForest() {
  if (!container?.value) return;

  d3.select('#container').select('svg').remove();
  svg.value = undefined;
}

function generateForest() {
  if (!container?.value) return;

  svg.value = d3.select('#container').append('svg').attr('viewBox', `0 0 ${SVG_MAX_WIDTH} ${SVG_MAX_HEIGHT}`).attr('preserveAspectRatio', 'xMidYMid meet');

  const forest = new Forest(props.data, svg.value as D3SvgSelection, interactionStore);
  forest.init();
  forest.draw();

  isLoading.value = false;
}

onMounted(() => {
  generateForest();
});

watch(
  () => props.sort,
  () => {
    if (isLoading.value) return;

    isLoading.value = true;

    window.setTimeout(() => {
      removeForest();
      generateForest();
    }, 50);
  },
);
</script>

<template>
  <Loader v-if="isLoading" />
  <Modal />
  <div
    id="container"
    ref="container"
    :class="$style.container"
  />
</template>

<style lang="scss" module>
.container {
  margin-top: 10px;
}
</style>
