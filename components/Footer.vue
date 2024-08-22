<template>
  <div :class="['nav-container', $style.container]">
    <div :class="$style.waive">👋</div>
    <div :class="$style.inspired">
      Inspired by
      <NuxtLink
        to="https://shirleywu.studio/filmflowers/"
        target="_blank"
        >Shirley Wu's Films Flowers
      </NuxtLink>
    </div>
    <div :class="$style.inspired">
      Data source :
      <NuxtLink
        to="https://boardgamegeek.com/browse/boardgame"
        target="_blank"
        >BoardGameGeek
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 0px;
}

.waive {
  font-size: 24px;
}
</style>
