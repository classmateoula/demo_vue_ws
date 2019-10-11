<template>
  <div class="box">
    <luo-header title="微信" search :left="false" right></luo-header>
    <el-row
      class="box-list ws-oh"
      type="flex"
      justify="space-between"
      style="min-width: 3rem;"
      v-for="item in dataList"
      :key="item.rid"
      @click.native="handleNavtoRoom(item.rid)"
    >
      <el-col :span="4">
        <div class="pad-n10 box-img-user ws-mc">
          <el-image :src="item.img">
            <img
              slot="error"
              src="../../assets/images/img1.png"
              class="img-block radius-10"
              alt="qwq"
            />
          </el-image>
        </div>
      </el-col>
      <el-col :span="20" class="border-bottom pad-l10">
        <div class="ws-fl">
          <h3 class="mg-t10">{{ item.rname }}</h3>
          <p class="color-9f font-mini mg-t5">{{ item.title }}</p>
        </div>
        <div class="ws-fr">
          <p class="ws-tr font-mini mg-t5">{{ item.time | time }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_room_list } from '@/api/room'

export default {
  name: 'home',
  data () {
    return {
      msg: '我要成为海贼王的男人',
      dataList: null,
      page: 1,
      pre: 10
    }
  },
  methods: {
    // 获取房间列表
    getDataList () {
      get_room_list().then(res => {
        if (res.code === 200) {
          this.dataList = res.info
        }
      })
    },
    handleNavtoRoom (rid) {
      this.$router.push({
        name: 'room',
        path: '/room',
        params: { rid }
      })
    },
  },
  created () {
    this.getDataList()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  // padding: 0;
  &-list {
    background-color: #fff;
    min-height: 85vh;
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
