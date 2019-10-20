<template>
  <div class="box">
    <luo-header title="添加好友"></luo-header>
    <div class="pad20">
      <el-input
        v-model="searchName"
        @change="getDataList"
        placeholder="昵称/手机号搜索 - 全人类"
      ></el-input>
    </div>
    <el-divider v-if="!dataList || dataList.length === 0">请按昵称或手机号搜索</el-divider>
    <el-row>
      <el-col
        :sm="12"
        v-for="item in dataList"
        :key="item.uid"
        class="pad10"
      >
        <el-card>
          <div class="ws-oh" slot="header">
            <span class="ws-fl">{{ item.uname }}</span>
            <el-button
              size="mini"
              type="primary"
              class="ws-fr"
              @click="handleSubmit(item)"
            >添加好友</el-button>
          </div>
          <div class="bsgx-oh">
            <div class="ws-tc">
              <el-image :src="item.avatar" class="box-img bsgx-fl"></el-image>
            </div>
            <div class="bsgx-fr">
              <el-row>
                <el-col :span="12" class="font-md font-w">昵称：</el-col>
                <el-col :span="12" class="ws-tr font-w font-md">{{ item.uname }}</el-col>
                <el-col :span="12" class="mg-t10">手机号：</el-col>
                <el-col :span="12" class="ws-tr mg-t10">{{ item.tel }}</el-col>
                <!-- <el-col :span="12">在线状态：</el-col>
                <el-col :span="12" class="ws-tr">{{ item.uname }}</el-col> -->
              </el-row>
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
    // 添加好友
    handleSubmit (row) {
      add_friend({
        uid: row.uid,
        img: row.avatar,
        uname: row.uname
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