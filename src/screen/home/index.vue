<template>
  <div class="box">
    <luo-header title="微信" search :left="false" right></luo-header>
    <el-row
      class="box-list ws-oh"
      type="flex"
      justify="space-between"
      style="min-width: 3rem;"
      @click.native="$router.push('/room')"
      v-for="item of 6"
      :key="item"
    >
      <el-col :span="4">
        <div class="pad-n10 box-img-user ws-mc">
          <img src="../../assets/images/img1.png" class="img-block radius-10" alt="qwq" />
        </div>
      </el-col>
      <el-col :span="20" class="border-bottom pad-l10">
        <div class="ws-fl">
          <h3 class="mg-t10">假二姐</h3>
          <p class="color-9f font-mini mg-t5">我要成为海贼王的男人</p>
        </div>
        <div class="ws-fr">
          <p class="ws-tr font-mini mg-t5">周五</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      msg: '我要成为海贼王的男人',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  // padding: 0;
  &-list {
    transition: all .15s;
    background: #ffffff;
    &:active {
      background: #f2f2f2;
    }
  }
  &-img {
    &-user {
      width: .4rem;
      height: .4rem;
    }
  }
}
</style>
