<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
  <!--  <a-config-provider :locale="locale">-->
  <!--    <a-spin class="loading" :spinning="spinning" size="large" tip="loading...">-->
  <!--    </a-spin>-->
  <!--    <img alt="Vue logo" src="./assets/logo.png">-->
  <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  </a-config-provider>-->
</template>

<script>
import {computed, ref} from "vue"
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment"
import store from "@/store/store";

moment.locale("zh-cn")

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  setup() {
    const collapsed = ref(false)
    const locale = ref(zhCN)
    const spinning = computed(() => {
      return store.state.isLoading
    })
    return {collapsed, locale, spinning}
  }
}
</script>

<style>
/** {*/
/*  padding: 0;*/
/*  margin: 0;*/
/*}*/

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /*position: fixed;*/
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
</style>
