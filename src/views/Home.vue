<template>
  <div class="div-body">
    <p>{{ $t('home.hello') }}</p>
    <button class="btn-standard" @click="setLanguage()">退出登录</button>
    <div
        style="display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 60vw;
        height: 60vh;
        background-color: beige">
      <div style="width: 60px; height: 60px; background-color: #2c3e50; color: red">弹性1</div>
      <div style="width: 80px; height: 80px; background-color: #0088cc; color: red">弹性2</div>
      <div style="width: 100px; height: 100px; background-color: #0b5137; color: red">弹性3</div>
      <div style="width: 120px; height: 120px; background-color: darkgoldenrod; color: red">弹性4</div>
      <div style="width: 140px; height: 140px; background-color: blueviolet; color: red">弹性5</div>
      <button>button</button>
      <div>
        <button>button</button>
      </div>
      <img
          src="../assets/images/logo.png"
          style="margin-left: 10px; color: #2c3e50;width: 100px; height: 30px; border: red solid 3px;"
          alt=""/>
    </div>
    <div
        style="position: absolute;
        width: 200px;
        height: 80px;
        right: 100px;
        bottom: 100px;
        padding: 10px;
        background-color: #2c3e50;
        color: yellow;
        border: 10px solid red">HELLO
    </div>
    <div
        style="position: absolute;
        box-sizing: content-box;
        width: 200px;
        height: 80px;
        right: 100px;
        bottom: 200px;
        background-color: #2c3e50;
        color: yellow;
        border: 10px solid red">HELLO
    </div>
  </div>
</template>

<script>
import {logout} from "@/api/userApi";
import {useRoute} from "vue-router"

export default {
  name: "Home",
  setup() {
    // const router = useRouter();
    // console.log(`router:`, router);
    const route = useRoute();
    console.log(`route. username:${route.params.username}, password:${route.params.password}`);
  },
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
    setLanguage: function () {
      localStorage.setItem('language', 'zh-CN')
      console.info('setLanguage')
      this.$i18n.locale = 'en-US'
    },
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
  width: 100%;
  height: 100%;
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

/*.div-body button:last-child {
  position: absolute;
  top: 4px;
  right: 4px;
}*/

.div-one {
  position: absolute;
  width: 60vw;
  height: 60vh;
  background-color: beige;
}
</style>