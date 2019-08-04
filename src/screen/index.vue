<template>
  <div class="box">
    <router-view />
    <luo-tab :current="current" @change="handleChange" />
  </div>
</template>

<script>
import { getCache } from '../../static/plug/global'

export default {
  name: 'index',
  data () {
    return {
      current: null
    }
  },
  methods: {
    // 切换页面
    handleChange (current) {
      if (current === this.current) {
        return false
      }
      this.current = current
      switch (current) {
        case 1:
          this.$router.push('/home')
          break
        case 2:
          this.$router.push('/mail')
          break
        case 3:
          this.$router.push('/space')
          break
        case 4:
          this.$router.push('/user')
          break
        default: break
      }
    }
  },
  created () {
    if (!getCache('token')) {
      this.$router.replace('/welcome')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
}
</style>
