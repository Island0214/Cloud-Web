<template>
  <div>
    <el-dialog
      class="dialog-wrapper"
      :visible.sync="openLogin"
      :style="dialogWidth"
      :modal=true
      :modal-append-to-body=false
      :show-close=false
      :close-on-click-modal=false
      :close-on-press-escape=false
    >
      <img src="../../assets/dialog-bg.png">

      <div class="login-wrapper" v-show="loginDialog">
        <h1>登录</h1>
        <a @click="changeDialog">去注册 ></a>
        <h2>用户名</h2>
        <el-input v-model="usernameInput"></el-input>
        <h2>邮箱</h2>
        <el-input v-model="emailInput" :class="[isCorrectEmail? '': 'error-email']"></el-input>
        <el-tooltip :content="errorInfo" placement="bottom" effect="light">
          <i v-show="this.emailInput.length !== 0" :class="[ {'el-icon-circle-check-outline': isCorrectEmail}, {'success-icon': isCorrectEmail}, {'el-icon-circle-close-outline': !isCorrectEmail}, {'error-icon': !isCorrectEmail}]"></i>
        </el-tooltip>

        <h2>密码</h2>
        <el-input v-model="passwordInput" type="password"></el-input>
      </div>

      <div class="login-wrapper" v-show="!loginDialog">
        <h1>注册</h1>
        <a @click="changeDialog">去登录 ></a>
        <h2>用户名</h2>
        <el-input v-model="usernameInput"></el-input>
        <el-tooltip content="用户名已被注册" placement="bottom" effect="light">
          <i v-show="!isCorrectUsername" :class="[ {'el-icon-circle-check-outline': isCorrectUsername}, {'success-icon': isCorrectUsername}, {'el-icon-circle-close-outline': !isCorrectUsername}, {'error-icon': !isCorrectUsername}]"></i>
        </el-tooltip>

        <h2>邮箱</h2>
        <el-input v-model="emailInput"></el-input>
        <el-tooltip :content="errorInfo" placement="bottom" effect="light">
          <i v-show="this.emailInput.length !== 0" :class="[ {'el-icon-circle-check-outline': isCorrectEmail}, {'success-icon': isCorrectEmail}, {'el-icon-circle-close-outline': !isCorrectEmail}, {'error-icon': !isCorrectEmail}]"></i>
        </el-tooltip>

        <h2>密码</h2>
        <el-input v-model="passwordInput" :type="password"></el-input>
        <i class="el-icon-view" @mouseover="changeInputType" @mouseleave="changeInputType"></i>
      </div>

      <span slot="footer" class="dialog-footer footer-wrapper">
          <div @click="closeLoginDialogs">
            <my-dialog-button content="取消"></my-dialog-button>
          </div>
          <div @click="tryLogin">
            <my-dialog-button content="确定"></my-dialog-button>
          </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import MyDialogButton from '../Basic/MyDialogButton/MyDialogButton.vue'

  export default {
    props: ['openLogin', 'openSignIn'],
    components: {
      MyDialogButton
    },
    data () {
      return {
        dialogWidth: {
          width: '30%',
          marginLeft: '35%'
        },
        usernameInput: '',
        passwordInput: '',
        emailInput: '',
        loginDialog: true,
        password: 'password',
        isCorrectEmail: true,
        isCorrectUsername: true,
        errorInfo: '邮箱格式错误...'
      }
    },
    computed: {
      ...mapGetters({
        mainWidth: 'mainWidth'
      })
    },
    methods: {
      ...mapActions({
        log_in: 'userLogin',
        sign_in: 'userSignin'
      }),
      closeLoginDialogs: function () {
        this.$emit('closeLogin')
      },
      changeDialogWidth: function () {
        if (this.mainWidth < 420) {
          this.dialogWidth.width = '100%'
          this.dialogWidth.marginLeft = '0%'
        } else if (this.mainWidth <= 768) {
          this.dialogWidth.width = '66%'
          this.dialogWidth.marginLeft = '17%'
        } else if (this.mainWidth < 992) {
          this.dialogWidth.width = '44%'
          this.dialogWidth.marginLeft = '28%'
        } else {
          this.dialogWidth.width = '36%'
          this.dialogWidth.marginLeft = '32%'
        }
      },
      changeDialog: function () {
        this.loginDialog = !this.loginDialog
      },
      changeInputType: function () {
        if (this.password === 'password') {
          this.password = 'text'
        } else {
          this.password = 'password'
        }
      },
      tryLogin () {
        if (!this.isCorrectEmail) {
          this.$message({
            showClose: true,
            message: '邮箱格式错误',
            type: 'error'
          })
        } else {
          if (this.loginDialog) {
            this.log_in({
              body: {
                username: this.usernameInput,
                password: this.passwordInput,
                email: this.emailInput
              },
              onSuccess: () => {
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                })
                this.closeLoginDialogs()
//                this.clearCookie('sessionid', '', -1)
//                console.log(document.cookie)
              },
              onError: () => {
                this.$message({
                  showClose: true,
                  message: '账户或密码错误',
                  type: 'error'
                })
              }
            })
          } else {
            this.sign_in({
              body: {
                username: this.usernameInput,
                password1: this.passwordInput,
                password2: this.passwordInput,
                email: this.emailInput
              },
              onSuccess: () => {
                this.$message({
                  showClose: true,
                  message: '注册成功',
                  type: 'success'
                })
                this.closeLoginDialogs()
              },
              onError: () => {
                this.$message({
                  showClose: true,
                  message: '邮箱已被注册或密码过于简单',
                  type: 'error'
                })
              }
            })
          }
        }
      }
    },
    watch: {
      mainWidth: function () {
        this.changeDialogWidth()
      },
      openLogin: function () {
        this.usernameInput = ''
        this.passwordInput = ''
        this.emailInput = ''
        this.loginDialog = !this.openSignIn
      },
      emailInput: function () {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
//        alert(reg.test(this.emailInput))
        if (this.emailInput === '' || reg.test(this.emailInput)) {
          this.isCorrectEmail = true
          this.errorInfo = '邮箱格式正确'
        } else {
          this.isCorrectEmail = false
          this.errorInfo = '邮箱格式错误'
        }
      },
      loginDialog: function () {
        this.usernameInput = ''
        this.passwordInput = ''
        this.emailInput = ''
      },
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires
      },
      getCookie: function (cname) {
        var name = cname + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) !== -1) {
            return c.substring(name.length, c.length)
          }
        }
        return ''
      },
      clearCookie: function (name) {
        this.setCookie(name, '', -1)
      }
    },
    mounted () {
      this.changeDialogWidth()
//      this.loginDialog = this.openSignIn
//      alert(this.openSignIn)
      this.usernameInput = ''
      this.passwordInput = ''
      this.emailInput = ''
    }
  }
</script>

<style scoped src="./Dialogs.css"></style>
