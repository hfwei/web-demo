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
        <div class="div-login">
          <button class="btn-underline" @click="forgotPassword()">忘记密码</button>
          <button class="btn-standard" @click="login()">登录</button>
        </div>
        <div class="div-author">
          <p>@hfwei</p>
          <button class="btn-underline" @click="register">若无账户请点击注册</button>
        </div>
      </div>
      <div class="div-box-right">
        <p>Welcome to WH System Management Center</p>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/userApi";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    }
  },
  mounted() {
    // console.log(this.$ref.app.style.background)
    console.log("username:" + this.$route.params.username)
    console.log("password:" + this.$route.params.password)
    this.$data.username = this.$route.params.username;
    this.$data.password = this.$route.params.password;
  },
  methods: {
    login: function () {
      let formData = new FormData();
      formData.set('username', this.$data.username)
      formData.set('password', this.$data.password)
      login(formData)
          .then(response => {
            console.log(response)
            this.$router.push({
              name: "home",
              params: {
                username: this.$data.username,
                password: this.$data.password
              }
            })
          })
          .catch(error => {
            console.log(error)
            alert(error)
          })
          .finally(() => {
            console.log('finally')
          })
    },
    forgotPassword: function () {
      this.$alert('该功能暂未实现，敬请期待！', {
        confirmButtonText: '确定',
        type: 'warning',
        showClose: false
      });
    },
    register: function () {
      this.$router.push({
        name: "register"
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/global.scss";
@import "../assets/css/login-and-register.scss";

</style>