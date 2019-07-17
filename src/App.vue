<template>
  <div
    id="app"
    :class="'ws-oh bg-e7eaed color-' + $store.state.color"
    :style="{ color: $store.state.color }"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/index.scss';
#app {
  font-family: 'Medium';
  font-size: .12rem;
  min-height: 100vh;
}
</style>
