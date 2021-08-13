<template>
  <div class="div-body">
    <LoginCarousel/>
    <div class="div-box">
      <div class="div-header">
        <img src="../assets/images/logo.png" alt="">
        <div>{{ $t('title') }}</div>
      </div>
      <div class="div-content">
        <div class="div-select-languages">
          <LanguageSelect/>
        </div>
        <div class="div-form-register">
          <a-form
              name="form-register"
              ref="registerFormRef"
              :model="registerFormData"
              :rules="registerFormRules"
              @finish="handleFinish"
              @finishFailed="handleFinishFailed">
            <a-form-item class="Item">
              <div class="div-form-title">{{ $t('register.title') }}</div>
            </a-form-item>
            <a-form-item class="item" name="username">
              <a-input
                  v-model:value="registerFormData.username"
                  style="height: 40px"
                  size="large"
                  :placeholder="$t('login.username.placeholder')">
                <template #prefix>
                  <span class="material-icons" style="color: #0088cc">person</span>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item class="item" name="password">
              <a-input-password
                  v-model:value="registerFormData.password"
                  type="password"
                  style="height: 40px"
                  size="large"
                  autocomplete="off"
                  :placeholder="$t('login.password.placeholder')">
                <template #prefix>
                  <span class="material-icons" style="color: #0088cc; font-size: 22px">lock</span>
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item class="item" name="confirmPassword">
              <a-input-password
                  v-model:value="registerFormData.confirmPassword"
                  type="password"
                  style="height: 40px"
                  size="large"
                  autocomplete="off"
                  :placeholder="$t('register.tip.confirm')">
                <template #prefix>
                  <span class="material-icons" style="color: #0088cc; font-size: 22px">lock</span>
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button class="btn-register"
                        type="primary"
                        size="large"
                        html-type="submit"
                        :loading="loading">{{ $t('register.register') }}
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="div-login">
          <span>{{ $t('register.tip.exist') }}</span>
          <a-button
              type="text"
              style="color: darkgoldenrod;padding: 0"
              @click="goLoginPage">{{ $t('register.login') }}
          </a-button>
        </div>
      </div>
      <div class="div-footer">
        <a class="a-copyright" href="https://www.psbc.com/cn/grfw/">{{ $t('login.copyright') }}</a>
        Copyright(C)2020 psbc.com
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from "ant-design-vue";
import {CheckCircleOutlined} from "@ant-design/icons-vue";
import {register} from "@/api/userApi";
import LoginCarousel from "@/components/LoginCarousel";
import {getCurrentInstance, reactive, ref, toRaw, createVNode, onMounted, onUnmounted} from "vue";
import LanguageSelect from "@/components/LanguageSelect";
import bus from "@/utils/bus";
// import {useRouter} from "vue-router";

export default {
  name: "Login",
  components: {
    LoginCarousel,
    LanguageSelect
  },
  setup() {
    onMounted(() => {
      console.log(`Register mounted!`);
      bus.$on("changeLanguage", data => {
        console.log(`changeLanguage. data:`, data);
        registerFormRef.value.resetFields();
      })
    });

    onUnmounted(() => {
      console.log(`Register unmounted!`);
      bus.$off("changeLanguage");
    });

    const {proxy} = getCurrentInstance();

    // 注册
    const registerFormRef = ref();
    const registerFormData = reactive({
      username: "",
      password: "",
      confirmPassword: ""
    });
    let checkUsername = async (rule, value) => {
      console.info(`checkUsername. rule:${rule}, value:${value}`);
      if (!value) {
        return Promise.reject(proxy.$t("login.username.tip1"));
      } else if (value.length < 5) {
        return Promise.reject(proxy.$t("login.username.tip2"));
      } else if (value.length > 10) {
        return Promise.reject(proxy.$t("login.username.tip3"));
      } else {
        return Promise.resolve();
      }
    };
    const passwordReg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,32}/;
    let checkPassword = async (rule, value) => {
      console.info(`checkPassword. rule:${rule}, value:${value}`);
      if (!value) {
        return Promise.reject(proxy.$t("login.password.tip1"));
      } else if (value.length < 8) {
        return Promise.reject(proxy.$t("login.password.tip2"));
      } else if (value.length > 32) {
        return Promise.reject(proxy.$t("login.password.tip3"));
      } else if (!passwordReg.test(value)) {
        return Promise.reject(proxy.$t("login.password.tip4"));
      } else {
        return Promise.resolve();
      }
    };
    let confirmPassword = async (rule, value) => {
      console.info(`checkCode. rule:${rule}, value:${value}`);
      if (!value) {
        return Promise.reject(proxy.$t("login.password.tip1"));
      } else if (value !== registerFormData.password) {
        return Promise.reject(proxy.$t("register.tip.inconsistent"));
      } else {
        return Promise.resolve();
      }
    };
    const registerFormRules = {
      username: [
        {
          required: true,
          validator: checkUsername,
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          validator: checkPassword,
          trigger: "blur"
        }
      ],
      confirmPassword: [
        {
          required: true,
          validator: confirmPassword,
          trigger: "blur"
        }
      ],
    };
    let loading = ref(false);
    const handleFinishFailed = () => {
      console.info(`handleFinishFailed`);
    };
    const handleFinish = () => {
      console.info(`handleFinish`, toRaw(registerFormData));
      loading.value = true;
      let formData = new FormData();
      formData.set("username", registerFormData.username);
      formData.set("password", registerFormData.password);
      register(formData)
          .then(response => {
            console.log(response);
            registerSuccess();
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            console.log(`finally`);
            loading.value = false;
          });
    };
    const registerSuccess = () => {
      Modal.confirm({
        title: proxy.$t("register.tip.success"),
        icon: createVNode(CheckCircleOutlined),
        content: proxy.$t("register.tip.goLogin"),
        okText: proxy.$t("tip.confirm"),
        cancelText: proxy.$t("tip.cancel"),
        onOk() {
          proxy.$router.push({
            name: "login",
            params: {
              username: registerFormData.username,
              password: registerFormData.password,
            }
          });
        },
        onCancel() {
        },
      });
    };
    // const router = useRouter();
    const goLoginPage = () => {
      console.info(`goLoginPage`);
      // registerSuccess();
      proxy.$router.push({
        name: "login"
      })
    };
    return {
      registerFormRef,
      registerFormData,
      registerFormRules,
      loading,
      handleFinishFailed,
      handleFinish,
      registerSuccess,
      goLoginPage
    };
  },
}
</script>

<style scoped>
.div-body {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}

.div-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.div-header {
  font-size: 30px;
  color: white;
  width: 60vw;
  display: flex;
  align-items: center;
  /*background: #5f8276;*/
}

.div-header img {
  height: 80px;
  margin-right: 20px;
}

.div-content {
  position: relative;
  width: 60vw;
  height: 60vh;
  margin: 40px 0;
  box-shadow: 0 0 10px black;
  background-color: white;
  background-image: url("../assets/images/background.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: 100%;
}

.div-select-languages {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.div-form-register {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  padding: 60px 80px;
}

.div-form-title {
  font-size: 24px;
}

.item {
  width: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.btn-register {
  width: 300px;
}

.div-login {
  position: absolute;
  right: 0;
  bottom: 20px;
  padding: 20px 80px;
}

.div-footer {
  color: white;
}
</style>