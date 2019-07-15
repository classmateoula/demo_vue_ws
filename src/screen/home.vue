<template>
  <div class="box">
    <luo-header title="微信" :left="false" right></luo-header>
    <el-row
      class="bg-f2 ws-oh"
      type="flex"
      justify="space-between"
      style="min-width: 3rem;"
      v-for="item of 6"
      :key="item"
    >
      <el-col :span="4">
        <div class="pad-n10 box-img-user ws-mc">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563111964393&di=e4a2b88e28f13e361abf936cc81d3729&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F13%2F20151113192758_A85HY.jpeg" class="img-block radius-10" alt="qwq" />
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
    <luo-tab :current="1"></luo-tab>
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
  mounted () {
    console.log(this.$store)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  padding: 0;
  &-img {
    &-user {
      width: .4rem;
      height: .4rem;
    }
  }
}
</style>
