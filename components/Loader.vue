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
  border-top: 1.5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation:
    spin 0.75s linear infinite,
    colorChange 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes colorChange {
  0% {
    border-top-color: #3498db;
  }
  25% {
    border-top-color: #e74c3c;
  }
  50% {
    border-top-color: #f1c40f;
  }
  75% {
    border-top-color: #2ecc71;
  }
  100% {
    border-top-color: #3498db;
  }
}
</style>
