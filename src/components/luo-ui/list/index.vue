<template>
  <el-row type="flex" class="box ws-sn" align="middle" @click.native="handleClick">
    <el-col :span="3" class="pad-n10 ws-tc">
      <slot></slot>
    </el-col>
    <el-col :span="21" :class="'pad-n10 ' + (bottom && ' border-bottom')">
      <div class="ws-oh">
        <span class="ws-fl">{{ title }}</span>
        <svg v-show="right" t="1563377285238" class="ws-fr mg-r10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10422" width=".1rem" height=".2rem"><path d="M764.89697 538.375758l-449.939394 442.181818c-15.515152 15.515152-40.339394 15.515152-54.303031 0-15.515152-15.515152-15.515152-38.787879 0-54.303031l449.939394-442.181818c15.515152-15.515152 40.339394-15.515152 54.303031 0 13.963636 15.515152 13.963636 40.339394 0 54.303031z" p-id="10423" fill="#2f2f36"></path><path d="M314.957576 41.890909l449.939394 442.181818c15.515152 15.515152 15.515152 38.787879 0 54.303031s-40.339394 15.515152-54.303031 0l-449.939394-442.181819c-15.515152-15.515152-15.515152-38.787879 0-54.30303 13.963636-13.963636 38.787879-13.963636 54.303031 0z" p-id="10424" fill="#2f2f36"></path></svg>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'luoList',
  methods: {
    handleClick () {
      this.$emit('change', this)
    }
  },
  props: {
    bottom: {
      type: [Boolean, String],
      default: false
    },
    right: {
      type: [Boolean, String],
      default: false
    },
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.box {
  background: #ffffff;
  transition: all .15s;
  &:active {
    background: #f2f2f2;
  }
}
</style>
