<template>
  <div
    class="box bg-w"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
  >
    <div
      class="box-load ws-tc"
      :style="{
        top: ((clientMean > 100 ? 100 : clientMean) - 100) + 'px'
      }"
    >
      <i :class="clientMean > 100 ? 'el-icon-refresh-right' : 'el-icon-arrow-down'"></i>
      <p class="font-mini">{{ clientMean > 100 ? '放手刷新' : '下拉刷新' }}</p>
    </div>
    <luoRoom
      @changeHeader="setActiveItem(0)"
      @message="websocketsend"
      ref="room"
      v-if="current === 1"
      :rid="rid"
    ></luoRoom>
    <el-carousel
      ref="carousel"
      v-show="current != 1"
      :autoplay="false"
      height="100vh"
      :initial-index="currentStart"
      indicator-position="none"
      :loop="false"
      arrow="click"
      :interval="0"
    >
      <el-carousel-item>
        <luoHome
          @change="changeFriend"
          ref="home"
        ></luoHome>
      </el-carousel-item>
      <el-carousel-item>
      </el-carousel-item>
      <el-carousel-item>
        <luoUser ref="user"></luoUser>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getCache, setCache } from '../../static/plug/global'
import { wsUrl } from '@/api/index'
import luoRoom from './home/room'
import luoHome from './home/index'
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
      currentStart: 1,
      dataType: 1, // 1-登场；2-消息/图片/语音；
    }
  },
  methods: {
    // 刷新
    handleLoad () {
      switch (this.current) {
        case 0:
          this.$refs.home.load()
          break
        case 1:
          this.$refs.room.load()
          break
        case 2:
          this.$refs.user.load()
          break
        default: break
      }
    },
    // 移动开始
    handleStart ({ changedTouches }) {
      this.clientX = changedTouches[0].clientX
      this.clientY = changedTouches[0].clientY < 100 ? changedTouches[0].clientY : 10000
    },
    // 移动中
    handleMove ({ changedTouches }) {
      this.clientMean = changedTouches[0].clientY - this.clientY
    },
    // 移动结束
    handleEnd ({ changedTouches }) {
      let x = changedTouches[0].clientX - this.clientX
      if (this.clientMean > 100) {
        this.clientMean = 0
        this.handleLoad()
        return false
      }
      if (Math.abs(x) > 100 && this.clientMean < 50) {
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
      setCache('current', current)
      this.$refs.carousel.setActiveItem(current)
    },
    // 选择朋友-进入聊天窗
    changeFriend (rid) {
      this.rid = rid
      this.setActiveItem(1)
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
          if (this.current === 1) {
            this.$refs.room.handleMessage(res.data)
          }
        }
        if (this.current === 0) {
          this.$refs.home.handleMessage(res.data.data)
        }
      }
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen (data) {
      this.websocketsend(data)
    },
    // 失败重连
    websocketonerror () {
      if (!this.ws) {
        this.init()
      }
    },
    // 关闭连接
    websocketonclose (e) {
      console.log('断开连接', e)
    },
    // 数据发送
    websocketsend (data) {
      this.ws.send(JSON.stringify(data))
    },
  },
  created () {
    if (!this.ws) {
      this.init()
    }
    this.current = typeof getCache('current') === "string" ? Number(getCache('current')) : 1
    this.currentStart = this.current
  },
  destroyed () {
    if (this.ws) {
      this.ws.close()
    }
  },
  components: {
    luoRoom,
    luoHome,
    luoUser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  margin: 0;
  background: #fff;
  &-load {
    position: fixed;
    left: 0;
    z-index: 9999;
    width: 100%;
    font-size: .3rem;
    padding: .15rem 0;
    background: linear-gradient(to top, #fff, rgb(64, 219, 219));
  }
}
</style>
