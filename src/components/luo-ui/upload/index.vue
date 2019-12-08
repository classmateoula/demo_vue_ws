<template>
  <div>
    <label for="file">
      <input type="file" v-show="false" id="file" @change="handleChange">
      <div>
        <slot></slot>
      </div>
    </label>
  </div>
</template>
<script>
import { uploadFile } from '../../../../static/plug/global'

export default {
  name: 'luo-upload',
  data () {
    return {
      msg: '上传'
    }
  },
  methods: {
    handleChange (e) {
      uploadFile(e.target.files[0]).then(res => {
        this.$emit('change', res)
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
}
</style>