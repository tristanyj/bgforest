<template>
  <main :class="$style.main">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <Header />
    <NuxtPage />
    <Footer />
  </main>
</template>

<style lang="scss" module>
.main {
  padding: 0 80px 80px 80px;

  @media screen and (max-width: 1024px) {
    padding: 0 40px 40px 40px;
  }
}
</style>
