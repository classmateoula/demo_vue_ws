<template>
  <div class="box">
    <span class="color-colour">{{ msg }}</span>
  </div>
</template>
<script>
export default {
  name: 'add_group',
  data () {
    return {
      msg: 'VUE新页面'
    }
  },
  methods: {
    getDataList () {
      console.log(this)
    },
  },
  created () {
    this.getDataList()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
}
</style>