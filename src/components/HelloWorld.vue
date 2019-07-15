<template>
  <div class="box">
    <span class="color-colour">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'box',
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
