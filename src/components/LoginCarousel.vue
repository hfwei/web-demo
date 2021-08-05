<template>
  <a-carousel autoplay class="a-body">
    <img :src="images.values().next().value" alt=""/>
    <img :src="images.values().next().value" alt=""/>
    <img :src="images.values().next().value" alt=""/>
    <img :src="images.values().next().value" alt=""/>
  </a-carousel>
</template>

<script>
import {ref} from "vue";

export default {
  name: "LoginCarousel",
  setup() {
    const images = ref([
      require("../assets/images/carousel-one.png"),
      require("../assets/images/carousel-two.png"),
      require("../assets/images/carousel-three.png"),
      require("../assets/images/carousel-four.png")
    ])
    return {images}
  }
}
</script>

<style scoped>
.a-body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.a-body img {
  width: 100%;
  height: 100vh;
}
</style>