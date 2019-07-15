<template>
  <div
    id="app"
    :class="'ws-oh bg-f3 color-' + $store.state.color"
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
}
</style>
