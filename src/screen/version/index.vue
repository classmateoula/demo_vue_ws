<template>
  <div class="box pad10 bg-w">
    <luo-header left background="#ffffff"></luo-header>
    <div class="pad-n10 ws-tc">
      <img src="../../assets/logo.png" alt="qwq" class="box-logo">
      <p class="font-w font-md mg-t10">伪信 Pseudorandom</p>
      <p class="font-mini mg-t10">Version 1.0.0</p>
    </div>
    <luo-list @change="handleUpload" :svg="false" right title="检查新版本" bottom></luo-list>
    <luo-list :svg="false" right title="功能介绍" bottom></luo-list>
    <luo-list :svg="false" right title="投诉" bottom></luo-list>
    <div class="box-bottom">
      <div class="box-bottom__fixed font-mini ws-tc">
        <p class="color-blue">《伪信软件许可及服务协议》</p>
        <p>和</p>
        <p class="color-blue">《伪信隐私保护指引》</p>
        <p>腾讯公司 版权所有</p>
        <p>Copyright &copy; 2011-2019 Luo.</p>
        <p>All Right Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'box',
  data () {
    return {
      msg: '关于伪信'
    }
  },
  methods: {
    handleUpload () {
      window.location.href = this.$store.state.server
        + '/unpackage/release/whisper-local'
        + (window.navigator.userAgent.indexOf('Android') != -1 ? '.apk' : '.ipa')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
  &-logo {
    width: 1rem;
    height: 1rem;
  }
  &-bottom {
    padding: .5rem 0;
    &__fixed {
      position: absolute;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
