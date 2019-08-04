<template>
  <div class="box">
    <luo-header title="设置" left></luo-header>
    <luo-list :svg="false" align="center" title="切换账号" class="mg-t10"></luo-list>
    <luo-list @change="handleLogout" :svg="false" align="center" title="退出" class="mg-t10"></luo-list>
  </div>
</template>

<script>
import { removeCache } from '../../../static/plug/global'

export default {
  name: 'setting',
  data () {
    return {
      msg: '设置'
    }
  },
  methods: {
    handleLogout () {
      removeCache('token')
      this.$router.replace('/login')
    }
  },
  mounted () {
    console.log(this.$store.state.userId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
}
</style>
