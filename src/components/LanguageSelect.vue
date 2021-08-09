<template>
  <a-select
      v-model:value="language"
      @focus="focus"
      @change="handleChange">
    <a-select-option value="zh-CN">{{ $t('login.chinese') }}</a-select-option>
    <a-select-option value="en-US">{{ $t('login.english') }}</a-select-option>
  </a-select>
</template>

<script>
import {ref} from "vue";
import bus from "@/utils/bus";

export default {
  name: "LanguageSelect",
  setup() {
    // 语言选择
    const language = ref(localStorage.getItem("language"));
    const focus = () => {
      console.log(`focus. language: ${language.value}`);
    };
    const handleChange = (value) => {
      console.info(`selected ${value}`);
      console.log(`focus. language: ${language.value}`);
      bus.$emit("changeLanguage", value);
      bus.$emit("setLanguage", value);
    };

    return {
      language,
      focus,
      handleChange
    };
  }
}
</script>

<style scoped>

</style>