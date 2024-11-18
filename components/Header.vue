<template>
  <div :class="['nav-container', $style.container]">
    <div :class="$style.title">Board Game Trees</div>
    <div :class="$style.description">Games from the BoardGameGeek Top 100 re-imagined as trees.</div>
    <div :class="$style.explanation">Leaf colors correpond to the game's box art. Year of publication influences tree length. Average rating influences tree length and leaf size. Game complexity influences number of ramifications. Number of games owned and category rarity influence branches' spread.</div>
  </div>
</template>

<style lang="scss" module>
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
