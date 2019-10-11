<template>
  <div
    id="app"
    :class="'ws-oh ws-ns bg-e7eaed color-' + $store.state.color"
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
  font-family: '微软雅黑';
  font-size: .14rem;
  min-height: 100vh;
}
.el-message {
  min-width: 80%;
  font-size: .2rem;
}
</style>
