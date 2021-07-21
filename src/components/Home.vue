<template>
  <div class="div-body">
    <p>你好！</p>
    <button class="btn-standard" @click="logout()">退出登录</button>
  </div>
</template>

<script>
import {logout} from "@/api/userApi";

export default {
  name: "Home",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
    this.$data.username = this.$route.params.username
    this.$data.password = this.$route.params.password
  },
  methods: {
    logout: function () {
      let formData = new FormData();
      formData.set('username', this.$data.username)
      formData.set('password', this.$data.password)
      logout(formData)
          .then(response => {
            console.log(response)
            this.$router.push({
              name: 'login',
              params: {
                username: '',
                password: ''
              }
            })
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
.div-body {
  background-image: url("../assets/images/christmas-trees.jpg");
  background-size: cover;
  display: flex;
  justify-content: end;
}

.div-body p {
  position: absolute;
  width: 100%;
  margin-top: 50px;
  font-size: 64px;
  text-align: center;
}

.div-body button {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>