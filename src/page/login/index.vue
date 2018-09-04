<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             class="login-form">
      <h3 class="title">YYYB统计报表系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="请输入密码"/>
        <span class="show-pwd" @click="showPassword">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :span="24">
          <el-col :span="2">
            <span class="svg-container">
              <svg-icon icon-class="code"></svg-icon>
            </span>
          </el-col>
          <el-col :span="12">
            <el-input @keyup.enter.native="handleLogin" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码"/>
          </el-col>
          <el-col :span="10">
            <div class="login-code">
              <img :src="code.src" class="login-code-img" @click="refreshCode"/>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'index',
  data: function () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      code: {
        src: '/auth/captcha.jpg'
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 16, message: '用户名4到16个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '密码为6到16位', trigger: 'blur'}
        ],
        code: [
          {required: true, trigger: 'blur', message: '请输入验证码'},
          {min: 4, max: 4, trigger: 'blur', message: '验证码长度为4位'}
        ]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  methods: {
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    refreshCode () {
      this.code.src = '/auth/captcha.jpg?r=' + new Date().getTime()
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.loading = false
            if (res.status === 0) {
              this.$router.push({path: '/'})
              location.reload()
            } else if (res.status === 1) {
              this.$message.error(res.msg)
              this.refreshCode()
            } else {
              this.$message.error('未知错误')
              this.refreshCode()
            }
          }).catch(() => {
            this.loading = false
            this.$message.error('登录失败')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/mixin.scss";
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .login-code{
      line-height: 52px;
      .login-code-img {
        vertical-align: middle;
      }
    }
  }
</style>
