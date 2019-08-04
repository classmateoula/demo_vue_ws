<template>
  <div
    class="box ws-pr"
    @click="$router.push('/login')"
    :style="{ backgroundImage: `url(${require('../../../static/images/img1.png')})` }"
  >
    <audio controls="autoplay" :autoplay="true" v-show="false">
      <source src="../../assets/mp3/mp31.mp3" type="audio/mp3" />
      <span>浏览器不支持</span>
    </audio>
    <img
      src="../../assets/images/img5.png"
      :style="{
        transform: 'scale(' + imgScale + ')',
      }"
      alt="qwq"
      class="box-img">
  </div>
</template>

<script>
let timer
export default {
  name: 'welcome',
  data () {
    return {
      msg: '欢迎登陆',
      imgScale: 0.8,
    }
  },
  created () {
    timer = setInterval(() => {
      this.imgScale += 1.8
      if (this.imgScale > 5) {
        clearInterval(timer)
      }
    }, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  width: 100%;
  height: 100vh;
  background-color: #c71926;
  background-size: 100% 100%;
  &-img {
    position: absolute;
    width: .5rem;
    height: .5rem;
    top: 50%;
    left: 50%;
    margin-top: -.25rem;
    margin-left: -.25rem;
    transition: all .2s;
  }
}
</style>
