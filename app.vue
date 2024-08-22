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
}
</style>
