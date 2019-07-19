<template>
  <div class="box pad20">
    <luo-header title="主题" />
    <div class="pad-n10">
      <p class="pad-n20">选择主题</p>
      <el-select v-model="color" @change="$store.dispatch('setColor', color)">
        <el-option
          v-for="(item, i) in colorList"
          :key="i"
          :value="item.color"
          :label="item.text"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theme',
  data () {
    return {
      msg: '1011sassss少时诵诗书所所所所所所所所',
      color: this.$store.state.color,
      colorList: [
        { text: '蕾姆蓝', color: '#98c6ff' },
        { text: '拉姆粉', color: '#ffabbe' },
        { text: '莱茵红', color: '#e45252' },
        { text: '女王黄', color: '#ffe39c' },
        { text: '怠惰绿', color: '#4c725e' },
        { text: '486黑', color: '#2f2f36' },
        { text: '商人紫', color: '#a179b4' },
        { text: '奇异彩', color: 'colour' },
        { text: '低调灰', color: '#6d6d6d' },
      ]
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
