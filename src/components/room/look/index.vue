<template>
  <div class=" pad10" style="overflow-y: auto;height: 1rem">
    <div class="ws-oh">
      <img
        v-for="(item, i) in dataList"
        :key="i"
        :src="item.url"
        class="ws-fl mg5"
        style="width: .55rem;height: .5rem;"
        @click="$emit('change', item.url)"
      >
    </div>
    <div v-if="dataList && dataList.length === 0">未收藏表情包</div>
  </div>
</template>
<script>
import { get_img_list } from '@/api/img'

export default {
  name: 'RoomLook',
  data () {
    return {
      msg: '图片列表',
      dataList: null,
    }
  },
  methods: {
    getDataList () {
      get_img_list().then(res => {
        if (res.code === 200) {
          this.dataList = res.info
        }
      })
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