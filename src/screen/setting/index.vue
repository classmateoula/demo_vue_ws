<template>
  <div class="box">
    <luo-header title="设置" left></luo-header>
    <luo-list :svg="false" title="账号与安全" right></luo-list>
    <luo-list :svg="false" title="新消息提醒" bottom class="mg-t10" right></luo-list>
    <luo-list :svg="false" title="勿扰模式" bottom right></luo-list>
    <luo-list :svg="false" title="聊天" bottom right></luo-list>
    <luo-list :svg="false" title="隐私" bottom right></luo-list>
    <luo-list :svg="false" title="通用" right></luo-list>
    <luo-list @change="$router.push('/version')" :svg="false" title="关于伪信" class="mg-t10" bottom right></luo-list>
    <luo-list :svg="false" title="帮助与反馈" right></luo-list>
    <luo-list :svg="false" title="插件" class="mg-t10" right></luo-list>
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
