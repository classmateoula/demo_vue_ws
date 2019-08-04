<template>
  <div class="box pad10">
    <div class="pad-n40 ws-tc">
      <img src="../../assets/logo.png" alt="qwq" class="box-img__user">
      <p>1828045377</p>
    </div>
    <el-form :model="formData" ref="formData" :rules="formRules">
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="formData.password"
          class="border-none"
          style="width: 80%;"
          clearable
          placeholder="请填写伪信密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button style="width: 100%;" class="mg-t20" type="success" size="medium" @click="handleSubmit">登录</el-button>
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
        password: null,
      },
      formRules: {
        password: [
          { required: true, message: '请输入密码' }
        ]
      },
    }
  },
  methods: {
    handleSubmit () {
      setCache('token', new Date().getTime())
      this.$router.push('/index')
    }
  },
  mounted () {
    console.log(this.$store.state.userId)
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
