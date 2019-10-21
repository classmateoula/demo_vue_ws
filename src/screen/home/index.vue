<template>
  <div class="box">
    <luo-header title="微信" :left="false" right @addFriend="$router.push('/friend')"></luo-header>
    <div class="box-container">
      <el-row
        class="box-list ws-oh"
        type="flex"
        justify="space-between"
        style="min-width: 3rem;"
        v-for="item in dataList"
        :key="item.rid"
        @click.native="handleChange(item)"
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
            <h3 class="mg-t10">{{ item.rname | nameFilter($store.state.userInfo.uname) }}</h3>
            <p class="color-9f font-mini mg-t5">{{ item.title | titleFilter }}</p>
          </div>
          <div class="ws-fr">
            <p class="ws-tr font-mini mg-t5">{{ item.time | time }}</p>
            <p v-if="item.count" class="mg-t10">
              <el-tag type="danger">{{ item.count }}</el-tag>
            </p>
          </div>
        </el-col>
      </el-row>
      <el-divider class="mg-t40" v-if="dataList && dataList.length > 10">已经到底了</el-divider>
    </div>
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
    load () {
      this.getDataList()
    },
    handleChange (row) {
      row.count = 0
      this.$emit('change', row.rid)
    },
    handleMessage (data) {
      console.log(data)
      this.dataList.forEach((v, k) => {
        if (v.rid == data.rid) {
          v.count++
          v.title = data.msg || '[图片]'
          this.dataList.splice(k, 1, v)
        }
      })
    },
    // 获取房间列表
    getDataList () {
      get_room_list().then(res => {
        if (res.code === 200) {
          res.info.forEach(v => {
            v.count = 0
          })
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
  filters: {
    // 姓名过滤
    nameFilter (arr, n) {
      return JSON.parse(arr).filter(v => v != n)[0]
    },
    // 消息长度过滤
    titleFilter (val) {
      if (!val) {
        return ''
      }
      return val.length > 14 ? (val.slice(0, 14) + '...') : val
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  &-container {
    height: 80vh;
    padding-bottom: 1rem;
    background-color: #fff;
    overflow-y: auto;
  }
  &-list {
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
