<template>
  <div :class="['nav-container', $style.container]">
    <div :class="$style.entry">
      Created by
      <NuxtLink
        to="https://tristanyj.com"
        target="_blank"
        :class="$style.link"
        >Tristan Lanoye
      </NuxtLink>
    </div>
    <div :class="$style.entry">
      Source code on
      <NuxtLink
        to="https://github.com/tristanyj/gametrees"
        target="_blank"
        :class="$style.link"
        >Github
      </NuxtLink>
    </div>
    <div :class="$style.entry">
      Inspired by
      <NuxtLink
        to="https://shirleywu.studio/filmflowers/"
        target="_blank"
        rel="noopener noreferrer"
        :class="$style.link"
        >Shirley Wu's Films Flowers
      </NuxtLink>
    </div>
    <div :class="$style.entry">
      Data from
      <NuxtLink
        to="https://boardgamegeek.com/browse/boardgame"
        target="_blank"
        rel="noopener noreferrer"
        :class="$style.link"
        >BoardGameGeek
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.entry {
  color: var(--mauve-11);
}

.link {
  background-color: var(--mauve-3);
  padding: 2px;
  margin-left: 2px;
  border-radius: 5px;
  color: var(--mauve-12);

  &:hover {
    background-color: var(--mauve-4);
  }
}
</style>
