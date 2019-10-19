<template>
  <div
    class="box bg-w"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
  >
    <div class="box-load">
      <el-divider>{{ clientMean > 80 ? '松开刷新' : '下拉刷新' }}</el-divider>
    </div>
    <luoRoom
      @changeHeader="setActiveItem(0)"
      @message="websocketonopen"
      ref="room"
      v-if="current === 1"
      :rid="rid"
    ></luoRoom>
    <el-carousel
      ref="carousel"
      v-show="current != 1"
      :style="{
        zIndex: 3,
        marginTop: (clientMean > 10 ? clientMean : 0) + 'px'
      }"
      :autoplay="false"
      height="100vh"
      :initial-index="1"
      indicator-position="none"
      :loop="false"
      arrow="click"
      :interval="0"
    >
      <el-carousel-item class="ws-oh">
        <luoMail
          @change="changeFriend"
          ref="mail"
        ></luoMail>
      </el-carousel-item>
      <el-carousel-item>
      </el-carousel-item>
      <el-carousel-item class="ws-oh">
        <luoUser ref="user"></luoUser>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { wsUrl } from '@/api/index'
import luoRoom from './home/room'
import luoMail from './mail/index'
import luoUser from './user/index'

export default {
  name: 'index',
  data () {
    return {
      ws: null,
      rid: 1,
      clientX: null,
      clientY: null,
      clientMean: 0,
      current: 1,
      dataType: 1, // 1-登场；2-消息/图片/语音；
    }
  },
  methods: {
    // 刷新
    handleLoad () {
      this.$refs.mail.load()
      this.$refs.user.load()
      this.$refs.room.load()
    },
    // 移动开始
    handleStart ({ changedTouches }) {
      this.clientX = changedTouches[0].clientX
      this.clientY = changedTouches[0].clientY < 80 ? changedTouches[0].clientY : 10000
    },
    // 移动中
    handleMove ({ changedTouches }) {
      this.clientMean = changedTouches[0].clientY - this.clientY
    },
    // 移动结束
    handleEnd ({ changedTouches }) {
      let x = changedTouches[0].clientX - this.clientX
      if (this.clientMean > 80) {
        this.clientMean = 0
        this.handleLoad()
        return false
      }
      if (Math.abs(x) > 80 && this.clientMean < 50) {
        if (x < 0 && this.current < 2) {
          this.setActiveItem(this.current + 1)
        } else if (this.current > 0 && x > 0) {
          this.setActiveItem(this.current - 1)
        }
      }
      this.clientMean = 0
    },
    // 切换
    setActiveItem (current) {
      this.current = current
      this.$refs.carousel.setActiveItem(current)
    },
    // 选择朋友-进入聊天窗
    changeFriend (rid) {
      this.rid = rid
    },
    // 建立双向协议
    init () {
      const wsuri = wsUrl + '/api/ws/'
      this.ws = new WebSocket(wsuri)
      this.ws.onmessage = this.websocketonmessage
      this.ws.onopen = this.websocketonopen
      this.ws.onerror = this.websocketonerror
      this.ws.onclose = this.websocketonclose
    },
    // 数据接收
    websocketonmessage (e) {
      const res = JSON.parse(e.data)
      if (res.code === 200 && res.data.data) {
        if (res.data.data.rid == this.rid) {
          this.$refs.room.handleMessage(res.data)
        } else {
          this.$refs.friend.handleMessage(res.data)
        }
      }
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen (data) {
      this.websocketsend(JSON.stringify(data))
    },
    // 失败重连
    websocketonerror () {
      this.init()
    },
    // 关闭连接
    websocketonclose (e) {
      console.log('断开连接', e)
    },
    // 数据发送
    websocketsend (data) {
      this.ws.send(data)
    },
  },
  created () {
    this.init()
  },
  destroyed () {
    if (this.ws) {
      this.ws.close()
    }
  },
  components: {
    luoRoom,
    luoMail,
    luoUser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
  background: #fff;
  z-index: 1;
  &-load {
    position: fixed;
    top: .2rem;
    left: 0;
    z-index: 2;
    width: 100%;
  }
}
</style>
