<template>
  <TestComponent
      ref="childRef"
      v-model:username="username"
      :password="password"
      @update-password="updatePassword"/>
  <button :disabled="disable">Button</button>
  <div v-for="(item, i) in list"
       :key="i"
       :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
  <div>123456</div>
  <div style="width: 800px; height: 100px; border: 2px solid red; display: flex; align-items: flex-start">
    <i class="material-icons icon">face</i>
    <span class="material-icons icon">person</span>
    <span class="material-icons icon">person_outline</span>
    <UserOutlined style="color:#0088cc"/>
    <span class="material-icons icon">lock</span>
    <span class="material-icons icon">lock_outline</span>
    <span class="material-icons icon">verified_user</span>
    <span class="material-icons icon" style="font-size: 20px">verified_user</span>
    <span class="material-icons-outline" style="color: #0088cc">privacy_tip</span>
  </div>
  <!--  <a-spin ref="a-spin" class="loading" :spinning="$store.state.isLoading" tip="loading..."></a-spin>-->
  <!--  <div {{readersNumber}}{{book.title}}></div>-->
</template>

<script>
import {reactive, ref, unref, toRef, toRefs, computed, watch, onMounted, provide, onBeforeUpdate} from 'vue';
import {UserOutlined} from "@ant-design/icons-vue"
import TestComponent from "../components/TestComponent";

export default {
  name: "Test",
  components: {TestComponent, UserOutlined},
  setup() {
    onMounted(() => {
      console.log(`childRef:`, childRef);
      console.log(`childRef value:`, childRef.value);

      console.log(`divs:`, divs);
    })

    // const state = reactive({count: 0})
    // watchEffect(() => {
    //   console.log(state.count)
    // })
    // state.count++

    const count = ref(0)
    console.log(count.value)
    count.value++
    console.log(count.value)
    console.log(unref(count))
    console.log('----------')
    const state = reactive({'foo': 1, 'bar': 2})
    const stateRef = toRef(state, 'foo')
    stateRef.value++;
    console.log('foo:' + state.foo + ", bar:" + state.bar)
    state.foo++;
    console.log('stateRef value:' + stateRef.value)
    console.log('----------')
    const stateRefs = toRefs(state)
    state.foo++
    stateRefs.foo++
    console.log('foo:' + state.foo + ", bar:" + state.bar)
    console.log('----------')
    const plusOne = computed({
      get: () => count.value + 1, set: val => {
        count.value = val - 1
      }
    })
    console.log("plusOne value:" + plusOne.value)
    count.value++
    console.log("plusOne value:" + plusOne.value)
    console.log('----------')
    plusOne.value--
    console.log("count value:" + count.value)
    console.log('----------')
    watch(() => state.foo, (foo, preFoo) => {
      console.log("watch state. foo:" + foo + ", preFoo:" + preFoo)
    })
    state.foo = 10
    console.log('----------')
    watch(count, (count, preCount) => {
      console.log("watch state. count:" + count + ", preCount:" + preCount)
    })
    count.value = 11
    console.log('----------')
    watch([count, stateRef], ([count, stateRef], [preCount, preStateRef]) => {
      console.log("watch count. count:" + count + ", preCount:" + preCount)
      console.log("watch stateRef. stateRef:" + stateRef + ", preStateRef:" + preStateRef)
    })
    count.value = 100
    stateRef.value = 101
    console.log('----------')
    watch(() => stateRefs.foo, (foo, preFoo) => {
      console.log("watch stateRefs.foo. foo:" + foo + ", preFoo:" + preFoo)
    })
    stateRefs.foo++
    // stateRefs.bar = 103

    const readersNumber = ref(0)
    const book = reactive({title: 'Vue 3 Guide'})
    // return {readersNumber, book}
    // return () => h('div', [readersNumber.value, book.title])

    const childRef = ref(null);

    const username = ref("hfwei");
    const password = ref("1234567890");

    setTimeout(() => {
      // username.value = "hfwei90";
      // password.value = "12345678";

      console.log(`childRef value:`, childRef.value.data);
      // childRef.value.target.username = "hfwei90";
      // childRef.value.target.password = "123456";

      code.value = 4321;
      disable.value = true;
    }, 2000);

    const updatePassword = (age) => {
      password.value = age;
    }

    const code = ref("1234");
    provide("code", code);

    const disable = ref(false);

    const list = reactive([1, 2, 3])
    const divs = ref([])

    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      divs.value = []
    })

    return {
      readersNumber,
      book,
      childRef,
      username,
      password,
      updatePassword,
      disable,
      list,
      divs
    }
  }
}
</script>

<style scoped>
.loading {
  width: 200px;
  height: 200px;
}

.grid-content {
  height: 50px;
}

.bg-purple {
  background: purple;
}

.icon {
  color: #0088cc;
  border: 1px solid red;
  padding: 0;
}
</style>