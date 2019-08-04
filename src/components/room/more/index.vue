<template>
  <div class="box">
    <span class="color-colour">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'RoomMore',
  data () {
    return {
      msg: 'RoomMore'
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
