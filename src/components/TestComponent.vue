<template>
  <div>username: {{ username }}</div>
  <div>password: {{ password }}</div>
  <div>code: {{ code }}</div>
</template>

<script>
import {defineComponent, inject, ref} from "vue";

export default defineComponent({
  name: "TestComponent",
  props: [
    "username",
    "password"
  ],
  emits: {
    "update-password": (password) => {
      if (password.length < 8) {
        console.log(`password len must be more 8 chars.`)
        return false;
      }
      return true;
    },
    "update:username": null,
  },
  setup(props, {emit}) {
    console.log(`props:`, props);

    // setTimeout(() => {
    //   emit("update:username", "hfwei90");
    //   emit("update-password", "123456");
    // }, 2000)

    setTimeout(() => {
      emit("update-password", "12345678");
    }, 4000)

    const data = ref("xxx");

    const code = inject("code");
    return {
      data,
      code
    }
  }
})
</script>

<style scoped>

</style>