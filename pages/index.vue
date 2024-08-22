<script setup lang="ts">
import type { GameData, SortMode } from '~/types';

const { data } = useFetch<GameData[]>('https://api-python.tristanyj.com/top');

const sortModes: SortMode[] = ['name', 'rating', 'weight', 'year', 'owned'];
const sortMode = ref(sortModes[0]);

const sortedData = computed(() => {
  if (!data.value) return [];
  return data.value.sort((a, b) => {
    switch (sortMode.value) {
      case 'rating':
        return b.rating_average - a.rating_average;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'weight':
        return b.weight_average - a.weight_average;
      case 'year':
        return b.yearpublished - a.yearpublished;
      case 'owned':
        return b.owned_number - a.owned_number;
      default:
        return 0;
    }
  });
});
</script>

<template>
  <div>
    <div :class="$style.wrapper">
      <div :class="$style.selectWrapper">
        <div :class="$style.label">Sort by :</div>
        <select
          id="select-sort"
          v-model="sortMode"
          name="select"
          :class="$style.select"
        >
          <option
            v-for="mode in sortModes"
            :key="mode"
            :value="mode"
          >
            {{ mode }}
          </option>
        </select>
      </div>
    </div>
    <Trees
      :data="sortedData"
      :sort="sortMode"
    />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.selectWrapper {
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
}

.label {
  text-transform: uppercase;
  font-size: 14px;
}

.select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;
  text-transform: uppercase;
}
</style>
