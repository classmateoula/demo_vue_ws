<template>
  <div class="box">
    <luo-header title="通讯录" :left="false" right></luo-header>
    <el-row type="flex" v-for="item of 7" :key="item">
      <el-col :span="3" class="pad-n10 ws-tc">
        <svg t="1563200750158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4583" width=".18rem" height=".18rem"><path d="M463.744 506.88a205.44 205.44 0 0 0 205.44-205.376 205.44 205.44 0 1 0-205.44 205.376z" p-id="4584" fill="#f4ea2a"></path><path d="M615.296 755.2a206.144 206.144 0 0 1 81.6-164.48A414.848 414.848 0 0 0 49.664 907.584a19.2 19.2 0 0 0 19.2 20.48h640A206.208 206.208 0 0 1 615.296 755.2z" p-id="4585" fill="#f4ea2a"></path><path d="M820.352 601.088A154.048 154.048 0 1 0 974.4 755.2a154.048 154.048 0 0 0-154.048-154.112z m71.36 170.048h-55.36v55.36a16 16 0 0 1-32 0v-55.36H748.8a16 16 0 0 1 0-32h55.36v-55.424a16 16 0 1 1 32 0v55.424h55.36a16 16 0 0 1 0 32z" p-id="4586" fill="#f4ea2a"></path></svg>
      </el-col>
      <el-col :span="21" :class="'pad-n10 ' + (item != 1 && 'border-top')">
        <p>新的朋友</p>
      </el-col>
    </el-row>
    <luo-tab :current="2"></luo-tab>
  </div>
</template>

<script>
export default {
  name: 'mail',
  data () {
    return {
      msg: '1011sassss少时诵诗书所所所所所所所所'
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
  padding: 0;
}
</style>
