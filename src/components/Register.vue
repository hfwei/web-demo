<template>
  <div class="div-body">
    <div class="div-box">
      <div class="div-box-left">
        <div class="div-username">
          <img src="../assets/images/username.svg" alt="">
          <input v-model="username" placeholder="用户名">
        </div>
        <div class="div-password">
          <img src="../assets/images/password.svg" alt="">
          <input v-model="password" type="password" placeholder="密码">
        </div>
        <div class="div-password">
          <img src="../assets/images/password.svg" alt="">
          <input v-model="confirmPassword" type="password" placeholder="确认密码">
        </div>
        <div class="div-register">
          <button class="btn-standard" :disabled="!canRegister" @click="register()">注册</button>
        </div>
        <div class="div-author">
          <p>@hfwei</p>
          <button class="btn-underline" @click="login()">已有账户请点击登录</button>
        </div>
      </div>
      <div class="div-box-right">
        <p>Welcome to WH System Management Center</p>
      </div>
    </div>
  </div>
</template>

<script>
import {register} from "@/api/userApi";

export default {
  name: "Register",
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      canRegister: true
    }
  },
  computed: {},
  watch: {
    username(newVal, oldVal) {
      console.log("username. newVal:" + newVal + ", oldVal:" + oldVal)
    },
    password(newVal, oldVal) {
      console.log("password. newVal:" + newVal + ", oldVal:" + oldVal)
    },
    confirmPassword(newVal, oldVal) {
      console.log("confirmPassword. newVal:" + newVal + ", oldVal:" + oldVal)
    }
  },
  mounted() {
  },
  methods: {
    register: function () {
      console.log("register()")
      let username = this.$data.username;
      let password = this.$data.password;
      let confirmPassword = this.$data.confirmPassword;
      let message = '';
      if (username.length < 3 || username.length > 10) {
        message = "用户名长度只能在3到10个字符之间";
      } else if (password.length < 8 || confirmPassword.length < 8) {
        message = "密码长度必须大于8位";
      } else if (password !== confirmPassword) {
        message = "两次密码不一致";
      }
      if (0 !== message.length) {
        this.$alert(message, {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: false
        })
        return
      }
      let formData = new FormData()
      formData.set('username', username)
      formData.set('password', password)
      register(formData)
          .then(response => {
            console.log(response)
            this.$confirm('是否直接跳转到登录页面？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success',
              center: true
            })
                .then(action => {
                  console.log(action)
                  this.$router.push({
                    name: 'login',
                    params: {
                      username: this.$data.username,
                      password: this.$data.password
                    }
                  })
                })
                .catch(() => {
                  console.log("cancel")
                })
          })
          .catch(error => {
            console.log(error)
          })
    },
    login: function () {
      this.$router.push({
        name: 'login',
        params: {
          username: '',
          password: ''
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/global.scss";
@import "../assets/css/login-and-register.scss";

</style>
