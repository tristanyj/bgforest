<script setup lang="ts">
import logo from '~/assets/images/logo.png';
</script>

<template>
  <div :class="['nav-container', $style.container]">
    <img
      :src="logo"
      alt="Logo"
      :class="$style.logo"
    />
    <div :class="$style.title">Board Game Trees</div>
    <div :class="$style.description">The 100 best board games of all-time re-imagined as trees</div>
    <div :class="$style.explanation">
      Data from the BoardGameGeek Top 100; up to date as of november 2024. <br />
      Leaf colors correpond to the game's box art. Year of publication and average rating influence tree length and leaf size. Game complexity influences number of ramifications. Popularity influences branches' spread. Click on a tree to learn more.
    </div>
  </div>
</template>

<style lang="scss" module>
.logo {
  width: 80px;
  margin: 0 auto;
}

.container {
  gap: 8px;
  padding-top: 60px;
  padding-bottom: 10px;
}

.link {
  display: grid;
  grid-auto-flow: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  padding: 7px;
  height: 100%;
  font-size: 13px;
  border-radius: 5px;
  font-weight: 400;

  &:hover {
    background-color: var(--mauve-3);
  }
}

.icon {
  width: 14px;
}

.title {
  font-size: 58px;
  text-transform: uppercase;
  font-weight: 400;
  font-family: 'Playfair Display', serif;
  color: var(--secondary-color);

  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
}

.description {
  color: var(--mauve-12);
}

.explanation {
  color: var(--mauve-9);
  max-width: 700px;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
