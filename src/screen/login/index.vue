<template>
  <div class="box pad10">
    <div class="pad-n40 ws-tc">
      <img src="../../assets/logo.png" alt="qwq" class="box-img__user">
      <p>{{ formData.tel }}</p>
    </div>
    <el-form :model="formData" ref="formData" :rules="formRules">
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
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      style="width: 100%;"
      class="mg-t20"
      type="success"
      size="medium"
      @click="handleSubmit"
    >登录</el-button>
  </div>
</template>

<script>
import { setCache } from '../../../static/plug/global'

export default {
  name: 'login',
  data () {
    return {
      msg: '登录',
      formData: {
        tel: null,
        upwd: null,
        dev: null,
      },
      formRules: {
        tel: [
          { required: true, message: '手机号不能为空' }
        ],
        upwd: [
          { required: true, message: '请输入密码' }
        ]
      },
    }
  },
  methods: {
    postSubmit () {
      this.$http({
        method: 'POST',
        url: this.$store.state.baseUrl + '/login/login',
        data: {
          tel: this.formData.uname,
          upwd: this.formData.upwd,
          dev: this.formData.dev
        }
      }).then(res => {
        if (res.data.code === 200) {
          setCache('token', res.data.token)
          this.$router.push('/index')
        } else {
          this.warnFun(res.msg)
        }
      }).catch(err => this.errFun(err))
    },
    handleSubmit () {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.postSubmit()
        }
      })
    }
  },
  mounted () {
    this.formData.dev = window.navigator.appVersion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box {
  &-img {
    &__user {
      width: .5rem;
      height: .5rem;
    }
  }
}
</style>
