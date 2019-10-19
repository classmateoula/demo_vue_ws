<template>
  <div class="box">
    <luo-header title="添加好友"></luo-header>
    <el-input
      v-model="searchName"
      @change="getDataList"
      placeholder="昵称/手机号"
    ></el-input>
    <el-row>
      <el-col
        :sm="12"
        v-for="item in dataList"
        :key="item.uid"
        class="pad10"
      >
        <el-card>
          <div class="bsgx-oh" slot="header">
            <span>{{ item.uname }}</span>
            <el-button
              size="mini"
              type="primary"
              @click="handleSubmit(item.uid)"
            >添加好友</el-button>
          </div>
          <div class="bsgx-oh">
            <el-image :src="item.avatar" class="box-img bsgx-fl"></el-image>
            <div class="bsgx-fr">
              <h2>昵称：{{ item.uname }}</h2>
              <p>手机号：{{ item.tel }}</p>
              <p>在线状态：{{ item.status }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { get_user_list, add_friend } from '@/api/user'

export default {
  name: 'friend',
  data () {
    return {
      msg: '好友页面',
      searchName: null,
      dataList: null,
    }
  },
  methods: {
    // 聊天
    handleMessage (data) {
      console.log(data)
    },
    // 添加好友
    handleSubmit (uid) {
      add_friend({
        uid
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getDataList()
        }
      })
    },
    // 获取好友列表
    getDataList () {
      if (!this.searchName) {
        return false
      }
      get_user_list({
        name: this.searchName
      }).then(res => {
        if (res.code === 200) {
          let ids = this.$store.state.userInfo.user_ids.split(',')
          this.dataList = res.info.filter(val => !ids.includes(val.uid))
        }
      })
    },
  },
  created () {
    console.log(this.$store.state.userInfo)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
  &-img {
    width: .5rem;
    height: .5rem;
  }
}
</style>