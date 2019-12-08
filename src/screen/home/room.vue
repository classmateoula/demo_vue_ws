<template>
  <div class="box">
    <luo-header v-if="roomInfo" :title="roomInfo.rname || ''" more>
      <svg slot="left" @click="$emit('changeHeader')" t="1563099198923" class="icon ws-fl mg-l10" viewBox="0 0 1024 1024" version="1.1" p-id="1106" width=".15rem" height=".38rem"><path d="M736 960c-9 0-18.1-3.2-25-9.6L263 535.2c-13.8-12.8-13.8-33.6 0-46.4L711 73.6c13.8-12.8 36.2-12.8 50 0 13.8 12.8 13.8 33.6 0 46.4L338 512l423 392c13.8 12.8 13.8 33.6 0 46.4-6.9 6.4-16 9.6-25 9.6z" p-id="1107" fill="#2f2f36"></path></svg>
    </luo-header>
    <div class="box-body  pad-n20" ref="msgBox">
      <div
        v-for="(item, i) in dataList"
        :key="i"
        class="mg-t20 animated bounceInUp"
      >
        <p :class="'ws-t' + (item.uid == formData.uid ? 'r' : 'l') + ' pad10'">{{ item.uname }}</p>
        <div class="ws-oh">
          <div :style="{ float: item.uid == formData.uid ? 'right' : 'left' }">
            <el-image
              :src="item.user_img"
              class="box-img__user radius-5"
            >
              <img slot="error" :src="require('../../assets/logo.png')" alt="罗" class="img-block">
            </el-image>
          </div>
          <div :style="{ float: item.uid == formData.uid ? 'right' : 'left' }" class=" box-body__content">
            <el-dropdown
              trigger="click"
              v-if="item.img"
            >
              <el-image
                :src="item.img"
                class="box-img"
              ></el-image>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" @click.native="handlePlus(item.img)">收藏</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div
              v-else
              :class="(item.uid == formData.uid ? 'bg-blue' : 'bg-gray color-white') + ' pad10 radius-5'"
            >{{ item.msg }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-bottom">
      <div class="box-bottom-fixed bg-w">
        <el-row class="pad-n5 border-bottom" type="flex" align="middle" justify="space-between">
          <el-col :span="3" class="ws-tc">
            <svg t="1563549277277" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14200" width=".2rem" height=".2rem"><path d="M347.136 649.216c43.008-34.816 67.584-84.48 67.584-136.192 0-51.712-24.576-101.376-67.584-136.192-12.8-10.24-32.768-9.728-44.544 2.048-5.632 5.632-8.192 12.288-8.192 18.944 0 7.68 3.584 15.36 10.24 20.992 29.696 24.064 47.104 58.368 47.104 94.208 0 35.84-16.896 70.144-46.592 94.208-12.8 10.24-13.824 28.16-2.048 39.936 11.264 11.776 31.232 12.288 44.032 2.048m120.32 93.184c68.096-61.44 105.984-142.848 105.984-229.376s-37.888-167.936-105.984-229.376c-12.288-11.264-32.256-11.264-45.056 0-6.144 5.632-9.216 12.8-9.216 19.968s3.072 14.336 9.216 19.968c56.32 50.688 87.552 117.76 87.552 189.44s-31.232 138.752-87.552 189.44c-12.288 11.264-12.288 29.184 0 39.936 12.288 11.264 32.768 10.752 45.056 0m118.784 93.696c93.696-87.04 145.408-201.728 145.408-323.072 0-120.832-51.712-235.52-145.408-322.56-12.288-11.264-32.256-11.776-45.056-1.024-6.656 5.632-9.728 12.8-9.728 20.48 0 7.168 3.072 14.336 8.704 19.456 82.432 76.8 127.488 177.152 127.488 283.648 0 106.496-45.056 207.36-127.488 283.648-12.288 11.264-11.776 29.184 1.024 39.936 13.312 10.752 33.28 10.752 45.056-0.512" p-id="14201" fill="#2f2f36"></path></svg>
          </el-col>
          <el-col :span="15">
            <el-input v-model="formData.msg" placeholder="罗家机密" @keyup.enter.native.stop="handleSubmit"></el-input>
          </el-col>
          <el-col :span="2" class="ws-tr">
            <svg @click="setMoreHeight(1)" t="1563549539673" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15064" width=".2rem" height=".2rem"><path d="M355.508306 323.189369c27.215947 0 40.82392 54.431894 44.225913 81.64784 0 13.607973 13.607973 23.813953 27.215947 23.813954h3.401993c13.607973-3.401993 23.813953-13.607973 23.813954-30.61794-6.803987-47.627907-34.019934-129.275748-98.657807-129.275748s-91.853821 81.647841-95.255814 129.275748c0 13.607973 10.20598 27.215947 23.813953 30.61794 13.607973 0 27.215947-10.20598 30.61794-23.813954 0-27.215947 13.607973-81.647841 40.823921-81.64784z m163.295681 462.671096c176.903654 0 190.511628-129.275748 190.511628-129.275747 0-13.607973-10.20598-27.215947-23.813954-30.617941-13.607973 0-27.215947 10.20598-30.61794 23.813954 0 3.401993-10.20598 81.647841-136.079734 81.64784s-136.079734-78.245847-136.079735-81.64784c0-13.607973-13.607973-23.813953-30.61794-23.813954-13.607973 0-27.215947 13.607973-23.813953 30.617941 0 3.401993 13.607973 129.275748 190.511628 129.275747z m244.943521-381.023256c0 13.607973 13.607973 23.813953 27.215947 23.813954h3.401994c13.607973-3.401993 23.813953-13.607973 23.813953-30.61794-6.803987-47.627907-34.019934-129.275748-98.657807-129.275748s-91.853821 81.647841-95.255814 129.275748c0 13.607973 10.20598 27.215947 23.813953 30.61794 13.607973 0 27.215947-10.20598 30.61794-23.813954 3.401993-23.813953 17.009967-81.647841 40.823921-81.64784s40.82392 54.431894 44.225913 81.64784z m0 0" fill="" p-id="15065"></path><path d="M168.398671 731.428571c-54.431894-71.44186-85.049834-159.893688-85.049834-251.747508C86.750831 244.943522 277.262458 54.431894 512 54.431894c234.737542 0 425.249169 190.511628 425.249169 425.249169 0 95.255814-30.61794 183.707641-85.049833 251.747508 20.41196 0 37.421927 6.803987 54.431893 13.607974C957.66113 670.192691 988.27907 578.33887 988.27907 476.27907c3.401993-261.953488-210.923588-476.27907-476.27907-476.27907S32.318937 214.325581 32.318937 479.681063c0 98.657807 30.61794 190.511628 81.64784 268.757475 17.009967-10.20598 37.421927-17.009967 54.431894-17.009967z m0 0" fill="" p-id="15066"></path><path d="M845.395349 731.428571c-74.843854 0-136.079734 54.431894-142.883721 125.873755v0c-57.833887 27.215947-122.471761 44.225914-190.511628 44.225913-68.039867 0-132.677741-17.009967-190.511628-44.225913v0c-10.20598-71.44186-71.44186-125.873754-142.883721-125.873755-78.245847 0-146.285714 64.637874-146.285714 146.285715 0 78.245847 64.637874 146.285714 146.285714 146.285714 64.637874 0 122.471761-44.225914 139.481728-105.461794 3.401993-10.20598 3.401993-20.41196 3.401993-27.215947 0 10.20598-3.401993 20.41196-3.401993 27.215947 61.23588 27.215947 125.873754 40.82392 193.913621 40.82392s136.079734-13.607973 193.913621-40.82392c-3.401993-10.20598-3.401993-20.41196-3.401993-27.215947 0 10.20598 3.401993 20.41196 3.401993 27.215947 17.009967 61.23588 74.843854 105.461794 139.481728 105.461794 78.245847 0 146.285714-64.637874 146.285714-146.285714s-64.637874-146.285714-146.285714-146.285715zM178.604651 966.166113c-51.0299 0-91.853821-40.82392-91.85382-91.853821 0-51.0299 40.82392-91.853821 91.85382-91.85382 51.0299 0 91.853821 40.82392 91.853821 91.85382-3.401993 51.0299-44.225914 91.853821-91.853821 91.853821z m666.790698 0c-51.0299 0-91.853821-40.82392-91.853821-91.853821 0-51.0299 40.82392-91.853821 91.853821-91.85382 51.0299 0 91.853821 40.82392 91.85382 91.85382 0 51.0299-40.82392 91.853821-91.85382 91.853821z m0 0" fill="" p-id="15067"></path></svg>
          </el-col>
          <el-col :span="3" class="ws-tc">
            <el-button v-if="formData.msg" size="mini" type="success" @click="handleSubmit">确定</el-button>
            <svg v-else @click="setMoreHeight(2)" t="1563549583745" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15802" width=".2rem" height=".2rem"><path d="M489.472 1024c-86.272-3.84-166.656-28.416-240.64-72.448-18.944-11.264-25.088-33.28-14.336-50.944 10.752-17.92 32.768-23.296 51.456-12.032 53.248 31.744 110.592 52.224 172.032 59.392 117.504 13.568 225.024-14.08 319.232-85.76 93.44-71.168 150.272-165.632 168.704-281.6 28.416-178.688-54.528-358.912-219.392-451.328-73.984-41.472-153.856-61.44-238.08-54.784-174.848 13.312-300.8 100.864-376.32 258.816-31.232 65.024-42.496 134.656-37.888 206.592 4.608 73.984 26.624 142.848 66.304 205.568 11.776 18.688 10.496 36.352-3.328 49.664-16.896 16.384-43.264 13.056-56.32-7.424-30.464-46.848-52.992-97.536-65.536-152.064C-22.016 473.6 8.704 325.376 111.36 194.304c80.896-103.424 187.392-166.656 316.928-186.88C605.44-20.48 757.76 31.488 883.2 158.976c75.008 76.288 118.784 169.216 135.424 274.944 2.816 17.664 4.864 35.584 5.376 53.504 0 9.728-0.512 19.712 0 29.44 0.256 5.12 0 26.112-0.256 28.16-1.536 22.016-4.352 43.776-8.704 65.536-44.544 230.144-242.688 401.92-476.928 413.184-16.128 0.256-32.512 0.256-48.64 0.256z m64.768-363.264v103.936c0 22.784-15.104 39.424-36.096 39.68-21.248 0.256-37.12-16.64-37.12-39.68-0.256-70.912-0.512-141.568-0.256-212.48 0-7.68-2.048-9.216-9.472-9.216-69.888 0.256-139.776 0.256-209.664 0-27.136 0-45.312-23.808-37.12-48.384 5.12-15.36 18.944-25.088 36.608-25.088 69.632 0 139.264-0.256 208.896 0.256 8.704 0 10.752-2.304 10.752-10.752-0.768-69.12-1.024-137.984-1.28-207.104 0-26.368 19.712-43.52 44.032-38.912 17.152 3.072 28.928 17.92 29.184 36.864 0.256 44.032 0.256 87.808 0.512 131.84 0 26.624 0.768 53.248 0.512 79.872 0 6.912 2.048 8.448 8.448 8.448 70.4-0.256 141.056-0.256 211.456 0 22.528 0 38.656 14.848 38.912 35.584 0.512 22.016-15.616 37.632-38.656 37.632h-189.952c-6.912 0-13.824 0.512-20.48-0.256-7.168-0.768-9.728 1.536-9.472 9.216 0.512 36.096 0.256 72.192 0.256 108.544-0.256 0-0.256 0 0 0z" fill="#2C2C2C" p-id="15803"></path></svg>
          </el-col>
        </el-row>
        <div :style="{ height: moreHeight + 'rem' }" class="box-bottom-more bg-f2">
          <div v-if="moreStatus === 1">
            <RoomLook ref="roomLook" @change="handleChangeLook" />
          </div>
          <div v-else>
            <room-more
              @changeAddress="changeAddress"
              @changeImg="handleChangeLook"
            ></room-more>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  RoomLook,
  RoomMore,
} from '@/components/room'
import { get_msg_list, post_add_msg, get_room_info } from '@/api/room'
import { post_img_add } from '@/api/img'
import 'animate.css'

let timer

export default {
  name: 'room',
  props: {
    rid: {
      type: Number,
    }
  },
  data () {
    return {
      formData: {
        user_img: this.$store.state.userInfo.avatar,
        uname: this.$store.state.userInfo.uname,
        msg: null,
        img: null,
        rid: null,
        uid: this.$store.state.userInfo.uid,
      },
      moreHeight: 0,
      moreStatus: null, // 1 - 表情； 2 - 更多
      dataList: [],
      roomInfo: {
        rname: null,
      },
    }
  },
  methods: {
    changeAddress () {
      console.log('显示位置')
      this.$message('制作中...')
    },
    // 收藏图片
    handlePlus (url) {
      post_img_add({
        url
      }).then(res => {
        if (res.code === 200) {
          if (this.$refs.roomLook) {
            this.$refs.roomLook.getDataList()
          }
          this.$message({
            type: 'success',
            message: '收藏成功'
          })
        }
      })
    },
    // 刷新
    load () {
      this.getDataList()
    },
    // 收到消息
    handleMessage (data) {
      switch (data.type) {
        case 1:
          const h = this.$createElement
          if (!data.data.uname) {
            data.data.uname = '游客' + new Date().getTime().toString(16)
          }
          this.$notify({
            title: '提示',
            message: h('i', { style: 'color: teal'}, data.data.uname + '登场'),
            offset: 50
          })
          break
        case 2:
          this.dataList.push(data.data)
          break
        default: break
      }
      timer = setTimeout(() => {
        document.body.scrollTop = document.documentElement.scrollTop = this.$refs.msgBox.scrollHeight
      }, 0);
    },
    // 获取房间详情
    getRoomInfo () {
      get_room_info({
        rid: this.rid
      }).then(res => {
        if (res.code === 200) {
          res.info[0].rname = JSON.parse(res.info[0].rname).filter(v => v != this.formData.uname)[0]
          this.roomInfo = res.info[0]
          this.$emit('message', {
            type: 1,
            data: this.formData,
            token: this.$store.state.token
          })
          this.getDataList()
        }
      })
    },
    // 获取列表
    getDataList () {
      get_msg_list({
        rid: this.rid
      }).then(res => {
        if (res.code === 200) {
          this.dataList = res.info
        }
      })
    },
    // 发送图片
    handleChangeLook (url) {
      console.log(url)
      this.formData.img = url
      this.handleSubmit()
    },
    // 发送消息
    handleSubmit () {
      if (!this.formData.img && /^\s*$/.test(this.formData.msg)) {
        // console.log('发送失败', this.formData)
        return false
      }
      post_add_msg(this.formData).then(res => {
        if (res.code === 200) {
          let actions = {
            type: 2,
            data: this.formData,
            token: this.$store.state.token
          }
          this.$emit('message', actions)
          this.formData.msg = null
        }
      })
    },
    // 展示 / 隐藏 图片框
    setMoreHeight (status) {
      if (this.moreStatus === status) {
        this.moreStatus = null
        this.moreHeight = 0
        return false
      }
      this.moreHeight = 1.3
      this.moreStatus = status
    },
  },
  created () {
    this.formData.rid = this.rid
    this.getRoomInfo()
  },
  destroyed () {
    clearTimeout(timer)
  },
  components: {
    RoomLook,
    RoomMore,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  &-body {
    min-height: 80vh;
    &__content {
      max-width: 60%;
      word-wrap: break-word;
    }
  }
  &-bottom {
    padding: .2rem 0;
    &-fixed {
      position: absolute;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    &-more {
      transition: all .2s;
    }
  }
  &-img {
    max-width: 1rem;
    max-height: 1rem;
    &__user {
      width: .5rem;
      height: .5rem;
      margin: 0 .1rem;
    }
  }
}
</style>
