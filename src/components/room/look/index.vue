<template>
  <el-carousel
    ref="carousel"
    :autoplay="false"
    height="2rem"
    indicator-position='none'
    @touchstart.native="handleStart"
    @touchend.native="handleMove"
  >
    <el-carousel-item class="ws-oh">
      <div
        class="ws-fl box-img__body"
        v-for="i of 8"
        :key="i"
      >
        <img src="../../../assets/logo.png" @click="handleClick" alt="qwq" class="box-img">
      </div>
    </el-carousel-item>
    <el-carousel-item class="ws-oh">
      <div
        class="ws-fl box-img__body"
        v-for="i of 8"
        :key="i"
      >
        <img src="../../../assets/logo.png" alt="qwq" class="box-img">
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'RoomLook',
  data () {
    return {
      msg: '表情',
      clientStart: null,
      current: 0
    }
  },
  methods: {
    // 单机图片
    handleClick () {
      this.$emit('change', 'img')
    },
    // 移动开始
    handleStart ({ changedTouches }) {
      this.clientStart = changedTouches[0].clientX
    },
    // 易懂结束
    handleMove ({ changedTouches }) {
      let p = changedTouches[0].clientX - this.clientStart
      if (!(Math.abs(p) > 100)) {
        return false
      }
      if (p < 0 && this.current < 1) {
        this.setActiveItem(this.current + 1)
      } else if (this.current > 0 && p > 0) {
        this.setActiveItem(this.current - 1)
      }
    },
    // 切换
    setActiveItem (current) {
      this.current = current
      this.$refs.carousel.setActiveItem(current)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
  &-img {
    width: 100%;
    &__body {
      width: .8rem;
      height: .8rem;
      margin: .1rem .13rem;
    }
  }
}
</style>
