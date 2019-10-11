<template>
  <div class="box pad10 bg-w ws-tc">
    <div class="pad-n40">
      <img src="../../assets/logo.png" alt="qwq" class="box-img__user">
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="登录">
        <el-form :model="formData" ref="formData" :rules="formRules" class="pad20">
          <el-form-item prop="tel" label="手机号">
            <el-input
              v-model="formData.tel"
              class="border-none ws-fr"
              style="width: 80%;"
              placeholder="请填写手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="upwd" label="密码">
            <el-input
              type="password"
              v-model="formData.upwd"
              class="border-none ws-fr"
              style="width: 80%;"
              clearable
              placeholder="请填写密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="">
          <el-button
            type="primary"
            circle
            size="medium"
            @click="handleLogin"
          >登录</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <el-form :model="formData" ref="formData" :rules="formRules" class="pad20">
          <el-form-item prop="tel" label="手机号">
            <el-input
              v-model="formData.tel"
              class="border-none ws-fr"
              style="width: 80%;"
              placeholder="请填写手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="upwd" label="密码">
            <el-input
              type="password"
              v-model="formData.upwd"
              class="border-none ws-fr"
              style="width: 80%;"
              clearable
              placeholder="请填写密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="">
          <el-button
            type="primary"
            circle
            size="medium"
            @click="handleReg"
          >注册</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { setCache, getCache } from '../../../static/plug/global'
import { post_login } from '@/api/user'

export default {
  name: 'login',
  data () {
    return {
      msg: '登录',
      formData: {
        tel: '11111111111',
        upwd: '111111',
        dev: null,
        type: null, // 1-登录；2-注册
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
    handleReg () {
      this.formData.type = 2
      this.handleSubmit()
    },
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
            this.$store.dispatch('setUserInfo', JSON.stringify(res.info))
            this.$router.push('/home')
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
    this.formData.dev = window.navigator.appVersion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  min-width: 100vh;
  &-img {
    &__user {
      width: .5rem;
      height: .5rem;
    }
  }
}
</style>
