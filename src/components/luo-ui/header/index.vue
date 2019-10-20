<template>
  <div class="box ws-pr ws-sn">
    <div class="box-header border-bottom" :style="{ background, color }">
      <div class="ws-oh">
        <slot name="left">
          <svg v-if="left" @click="$router.back()" t="1563099198923" class="icon ws-fl mg-l10" viewBox="0 0 1024 1024" version="1.1" p-id="1106" width=".15rem" height=".38rem"><path d="M736 960c-9 0-18.1-3.2-25-9.6L263 535.2c-13.8-12.8-13.8-33.6 0-46.4L711 73.6c13.8-12.8 36.2-12.8 50 0 13.8 12.8 13.8 33.6 0 46.4L338 512l423 392c13.8 12.8 13.8 33.6 0 46.4-6.9 6.4-16 9.6-25 9.6z" p-id="1107" fill="#2f2f36"></path></svg>
        </slot>
        <slot v-if="custom"></slot>
        <span v-else class="font-w ws-fl mg-l10">{{ title || $route.name }}</span>
        <svg v-if="right" @click="setShowContent" t="1563105431428" class="box-icon-right ws-fr pad-l10" viewBox="0 0 1024 1024" version="1.1" p-id="2085" width=".19rem" height=".38rem"><path d="M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-938.692923A426.692923 426.692923 0 1 0 938.692923 512 426.692923 426.692923 0 0 0 512 85.307077zM748.307692 551.384615H551.384615v196.923077a39.384615 39.384615 0 1 1-78.76923 0V551.384615H275.692308a39.384615 39.384615 0 1 1 0-78.76923H472.615385V275.692308a39.384615 39.384615 0 0 1 78.76923 0V472.615385h196.923077a39.384615 39.384615 0 0 1 0 78.76923z" p-id="2086" fill="#2f2f36"></path></svg>
        <svg v-if="search" @click="$router.push('/search')" class="box-icon-right ws-fr pad-l10" t="1563546334257" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11594" width=".19rem" height=".38rem"><path d="M222.6944 222.7968A323.1488 323.1488 0 0 0 133.6832 512c19.2512-87.3728 64.512-172.7488 135.0144-243.3024C339.2512 198.1184 424.6272 152.8832 512 133.632c-101.632-19.1488-210.688 10.5216-289.3056 89.1648z" fill="#2f2f36" p-id="11595"></path><path d="M989.44 822.1184l-121.7024-121.7024a118.016 118.016 0 0 0-92.8-34.1248c114.4576-165.5552 97.92-394.3936-49.4848-541.824-165.9392-165.9904-435.0464-165.9904-601.0368 0-165.9392 165.9904-165.9392 435.1232 0 601.1136 147.4048 147.4304 376.064 163.84 541.7216 49.3824-2.56 33.28 8.8576 67.5328 34.1248 92.8l121.7024 121.728c46.08 45.9776 121.3696 45.9776 167.3472 0 46.208-45.9776 46.208-121.2928 0.128-167.3728zM676.096 676.096c-138.6752 138.6752-363.392 138.6752-502.016 0-138.6752-138.6752-138.6752-363.4432 0-502.1184 138.624-138.6752 363.3408-138.6752 502.016 0 138.6496 138.5728 138.6496 363.4432 0 502.1184z" fill="#2f2f36" p-id="11596"></path></svg>
        <svg v-if="more" @click="$emit('moreClick')" t="1563548345635" class="box-icon-right ws-fr pad-l10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13302" width=".19rem" height=".38rem"><path d="M512 512m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z" p-id="13303" fill="#2f2f36"></path><path d="M256 512m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z" p-id="13304" fill="#2f2f36"></path><path d="M768 512m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z" p-id="13305" fill="#2f2f36"></path></svg>
      </div>
      <div :class="'box-icon-right-content ' + (contentActive && 'active')" v-show="showContent">
        <div class="box-icon-right-content-top"></div>
        <ul class="box-icon-right-content-box bg-black radius-5 color-white">
          <li>
            <svg t="1563106073039" class="icon" viewBox="0 0 1115 1024" version="1.1" p-id="3022" width=".2rem" height=".1rem"><path d="M331.851852 512m-84.775599 0a84.775599 84.775599 0 1 0 169.551198 0 84.775599 84.775599 0 1 0-169.551198 0Z" p-id="3023" fill="#e3e3e3"></path><path d="M557.734205 512m-84.775599 0a84.775599 84.775599 0 1 0 169.551198 0 84.775599 84.775599 0 1 0-169.551198 0Z" p-id="3024" fill="#e3e3e3"></path><path d="M783.616558 512m-84.775599 0a84.775599 84.775599 0 1 0 169.551198 0 84.775599 84.775599 0 1 0-169.551198 0Z" p-id="3025" fill="#e3e3e3"></path><path d="M557.734205 111.546841c245.960784 0 446.187364 167.320261 446.187364 376.470588s-200.22658 376.470588-446.187364 376.470588a508.095861 508.095861 0 0 1-174.570806-27.88671 152.261438 152.261438 0 0 0-48.522876-10.59695 386.509804 386.509804 0 0 0-167.320262 46.291939c21.1939-127.721133 12.270153-177.359477-10.596949-215.843137a326.27451 326.27451 0 0 1-47.407408-167.320261C111.546841 278.867102 311.77342 111.546841 557.734205 111.546841m0-111.546841C249.864924 0 0 218.631808 0 488.017429a440.052288 440.052288 0 0 0 63.023965 225.882353c17.28976 28.444444 0 142.779956-22.867102 237.037037a60.235294 60.235294 0 0 0 58.562091 73.063181 61.908497 61.908497 0 0 0 27.88671-6.69281A643.625272 643.625272 0 0 1 334.640523 937.551198a46.291939 46.291939 0 0 1 13.385621 0 618.527233 618.527233 0 0 0 209.708061 38.48366c307.869281 0 557.734205-218.631808 557.734205-488.017429S865.603486 0 557.734205 0z" p-id="3026" fill="#e3e3e3"></path></svg>
            <span class="pad-n5 box-icon-right-content-text">发起群聊</span>
          </li>
          <li @click="$emit('addFriend')">
            <svg t="1563108306552" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3993" width=".2rem" height=".1rem"><path d="M62.309 1022c-17.366 0-31.491-14.124-31.491-31.484 0-98.4 31.374-191.889 90.722-270.361a452.54 452.54 0 0 1 101.377-97.745c34.448-24.129 71.823-43.196 111.331-56.801a303.255 303.255 0 0 1-107.21-100.827c-31.04-48.313-47.452-104.258-47.452-161.783C179.586 137.026 314.618 2 480.584 2c165.972 0 300.992 135.026 300.992 300.999 0 57.519-16.401 113.446-47.428 161.752a303.192 303.192 0 0 1-107.186 100.833 447.662 447.662 0 0 1 100.157 49.234l8.711 6.038c14.235 10.06 17.639 29.739 7.641 43.907-5.927 8.358-15.56 13.339-25.774 13.339-6.502 0-12.757-1.986-18.096-5.741l-7.171-4.986c-63.012-41.439-136.375-63.347-212.156-63.347-213.104 0-386.48 173.378-386.48 386.487 0 17.361-14.126 31.485-31.485 31.485zM480.584 64.98c-131.247 0-238.025 106.771-238.025 238.018 0 131.259 106.778 238.055 238.025 238.055 131.246 0 238.017-106.796 238.017-238.055 0-131.247-106.771-238.018-238.017-238.018z m0 0M982.145 823.628h-118.13V708.146c0-5.841-4.956-10.592-11.043-10.592h-42.317c-6.045 0-10.976 4.751-10.976 10.592v115.482H681.48c-6.075 0-11.037 4.794-11.037 10.703v41.191c0 5.877 4.955 10.635 11.037 10.635h118.198v115.451c0 5.878 4.931 10.629 10.976 10.629h42.317c6.081 0 11.043-4.751 11.043-10.629V886.157h118.13c6.082 0 11.037-4.758 11.037-10.635v-41.198c-0.03-5.871-4.992-10.696-11.036-10.696z m0 0" fill="#e3e3e3" p-id="3994"></path></svg>
            <span class="pad-n5 box-icon-right-content-text box-icon-right-content-text-bottom">添加好友</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'luoHeader',
  data () {
    return {
      showContent: false,
      contentActive: null
    }
  },
  methods: {
    setShowContent () {
      this.showContent = !this.showContent
      setTimeout(() => {
        this.contentActive = !this.contentActive
      }, 10);
    }
  },
  props: {
    custom: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    background: {
      type: String,
      default: '#ededed'
    },
    color: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  padding: .19rem 0;
  &-header {
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .38rem;
    line-height: .38rem;
    z-index: 999;
  }
  &-icon {
    &-right {
      background-color: transparent;
      transition: all .2s;
      &:active {
        background-color: #fff;
      }
      &-content {
        position: absolute;
        top: .35rem;
        right: .05rem;
        padding: .05rem 0 .05rem .1rem;
        transform: scale(.5);
        transform-origin: top right;
        transition: all .2s;
        &.active {
          transform: scale(1);
        }
        &-text {
          display: inline-block;
          border-bottom: .01rem solid #9b9898;
          padding-right: .2rem;
          padding-left: .02rem;
          &-bottom {
            border-bottom: 0;
          }
        }
        &-top {
          position: absolute;
          top: -.14rem;
          right: .1rem;
          width: 0;
          height: 0;
          border: .1rem solid transparent;
          border-bottom-color: #2f2f36;
        }
        &-box li {
          transition: all .2s;
          padding: 0 .1rem;
          &:active {
            background: rgb(31, 23, 23);
          }
        }
      }
    }
  }
}
</style>
