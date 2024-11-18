<template>
  <div :class="$style.container">
    <div :class="$style.loader" />
  </div>
</template>

<style lang="scss" module>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.loader {
  border-top: 1.5px solid var(--mauve-10);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
