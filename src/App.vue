<template>
  <div id="app">
    <router-view class="router-view" v-if="isRouterAlive"></router-view>
  </div>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, ref, nextTick} from "vue"
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment"
import store from "@/store/store";
import bus from "@/utils/bus";
import {useI18n} from 'vue-i18n'

moment.locale("zh-cn")

export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
  },
  setup() {
    // const {context} = getCurrentInstance();
    const i18n = useI18n();

    onMounted(() => {
      console.log(`App mounted.`);
      localStorage.setItem("language", "zh-CN");
      bus.on("setLanguage", (data: any) => {
        console.log(`setLanguage. data:`, data);
        i18n.locale.value = data;
        localStorage.setItem("language", data);
        // reload();
      })
    });

    const isRouterAlive = ref(true);

    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      })
    }

    const collapsed = ref(false)
    const locale = ref(zhCN)
    const spinning = computed(() => {
      return store.state.isLoading
    })
    return {
      isRouterAlive,
      reload,
      collapsed,
      locale,
      spinning
    }
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
