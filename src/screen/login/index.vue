<template>
  <div class="box pad10 bg-w ws-tc ws-oh">
    <div class="pad-n20 mg-t40">
      <img src="../../assets/logo.png" alt="qwq" class="box-img__user  animated bounceInDown">
    </div>
    <el-form :model="formData" ref="formData" :rules="formRules" class="pad20">
      <el-form-item prop="tel">
        <input
          type="text"
          v-model="formData.tel"
          class="box-input animated bounceInRight"
          placeholder="手机号"
        />
      </el-form-item>
      <el-form-item prop="upwd">
        <input
          type="password"
          v-model="formData.upwd"
          class="box-input animated bounceInLeft"
          placeholder="密码"
        />
      </el-form-item>
    </el-form>
    <div class="">
      <svg @click="handleSubmit" t="1571327813039" class=" animated bounceInUp" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3670" width="50" height="50"><path d="M512 64C265 64 64 265 64 512s201 448 448 448 448-201 448-448S759 64 512 64z m0 832c-211.8 0-384-172.2-384-384s172.2-384 384-384 384 172.2 384 384-172.2 384-384 384z" fill="#000000" p-id="3671"></path><path d="M475.4 287.9L647.7 448H256v64h391.6L475.4 672.1l39 41.9 251.7-234.1L514.4 246z" fill="#13227a" p-id="3672"></path></svg>
    </div>
    <div class="ws-tc">
      <el-button
        type="text"
        @click="formData.type = formData.type == 1 ? 2 : 1"
      >{{ formData.type == 1 ? '登录' : '注册' }}</el-button>
    </div>
  </div>
</template>

<script>
import { setCache, getCache } from '../../../static/plug/global'
import { post_login } from '@/api/user'
import 'animate.css'

export default {
  name: 'login',
  data () {
    return {
      msg: '登录',
      formData: {
        tel: '11111111111',
        upwd: '111111',
        dev: null,
        type: 1, // 1-登录；2-注册
      },
      formRules: {
        tel: [
          { required: true, min: 11, max: 11, message: '手机号不能为空' }
        ],
        upwd: [
          { required: true, min: 6, max: 16, message: '请输入密码' }
        ]
      },
    }
  },
  methods: {
    handleLogin () {
      this.formData.type = 1
      this.handleSubmit()
    },
    // 提交
    postSubmit () {
      post_login(this.formData).then(res => {
        if (res.code === 200) {
          if (this.formData.type === 1) {
            setCache('token', res.info.token)
            setCache('userInfo', JSON.stringify(res.info))
            this.$store.dispatch('setToken', res.info.token)
            this.$store.dispatch('setUserInfo', res.info)
            this.$router.push('/index')
          } else {
            this.handleLogin()
          }
        }
      })
    },
    // 登录/注册
    handleSubmit () {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.postSubmit()
        }
      })
    }
  },
  created () {
    this.formData.dev = window.navigator.appVersion.slice(0, 99)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  height: 100vh;
  &-input {
    border: 0;
    outline: 0;
    background: #f2f3f7;
    padding: .2rem .4rem;
    border-radius: .3rem;
  }
  &-img {
    &__user {
      width: .5rem;
      height: .5rem;
    }
  }
}
</style>
