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
        <div class="div-form-login">
          <a-form
              name="form-login"
              ref="loginFormRef"
              :model="loginFormData"
              :rules="loginFormRules"
              @finish="handleFinish"
              @finishFailed="handleFinishFailed">
            <a-form-item class="Item">
              <div class="div-form-title">{{ $t('login.title') }}</div>
            </a-form-item>
            <a-form-item name="username">
              <a-input
                  v-model:value="loginFormData.username"
                  style="height: 40px"
                  size="large"
                  :placeholder="$t('login.username.placeholder')"
                  allow-clear>
                <template #prefix>
                  <span class="material-icons" style="color: #0088cc">person</span>
                  <!--                  <font-awesome-icon style="color: #0088cc" :icon="['far', 'user']"/>-->
                  <!--                  <UserOutlined style="color:#0088cc"/>-->
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password
                  v-model:value="loginFormData.password"
                  style="height: 40px"
                  type="password"
                  size="large"
                  autocomplete="off"
                  :placeholder="$t('login.password.placeholder')"
                  allow-clear>
                <template #prefix>
                  <span class="material-icons" style="color: #0088cc; font-size: 22px">lock</span>
                  <!--                  <LockOutlined style="color:#0088cc"/>-->
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item name="code">
              <a-input
                  v-model:value="loginFormData.code"
                  style="width: 150px; height: 40px"
                  size="large"
                  :placeholder="$t('login.code.placeholder')"
                  allow-clear>
                <template #prefix>
                  <span class="material-icons" style="color: #0088cc; font-size: 20px">verified_user</span>
                  <!--                  <SafetyOutlined style="color:#0088cc"/>-->
                </template>
              </a-input>
              <div
                  style="width: 100px; top: 0; bottom: 0;right: 0; display: flex; align-items: center; position: absolute">
                <img
                    :src="codeUrl"
                    @click="refreshCode"
                    style="width: 100px; top: 0; bottom: 0; cursor: pointer"
                    alt=""/>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button class="btn-login"
                        type="primary"
                        size="large"
                        html-type="submit"
                        :loading="loading">{{ $t('login.login') }}
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="div-register">
          <a-button type="text"
                    style="color: darkgoldenrod;padding: 0"
                    @click="forgetPassword">{{ $t('login.forgetPassword') }}
          </a-button>
          <a-divider
              type="vertical"
              style="background-color: darkgoldenrod"/>
          <a-button
              type="text"
              style="color: darkgoldenrod;padding: 0"
              @click="registerNewAccount">{{ $t('login.register') }}
          </a-button>
        </div>
      </div>
      <div class="div-footer">
        <a class="a-copyright" href="https://www.psbc.com/cn/grfw/">{{ $t("login.copyright") }}</a>
        Copyright(C)2020 psbc.com
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {message} from "ant-design-vue"
import {login} from "@/api/userApi";
import LoginCarousel from "@/components/LoginCarousel.vue";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  UnwrapRef,
  toRaw
} from "vue";
import {generateCode} from "@/api/userApi";
import LanguageSelect from "@/components/LanguageSelect.vue";
import bus from "@/utils/bus";
import {RuleObject} from "ant-design-vue/es/form/interface";

interface LoginFormData {
  username: string;
  password: string;
  code: string;
}

export default defineComponent({
  name: "Login",
  components: {
    LoginCarousel,
    LanguageSelect
  },
  setup() {
    onMounted(() => {
      console.log(`Login mounted!`);
      refreshCode();

      bus.on("changeLanguage", data => {
        console.log(`changeLanguage. data:`, data);
        loginFormRef.value.resetFields();
      })
    });

    onUnmounted(() => {
      console.log(`Login unmounted!`);
      bus.off("changeLanguage");
    });

    const {proxy}: any = getCurrentInstance();

    // 登录成功后是否需要redirect
    let redirect = proxy.$route.query.redirect;
    console.log(`redirect path:`, redirect);

    // 登录
    const loginFormRef = ref();
    const loginFormData: UnwrapRef<LoginFormData> = reactive({
      username: proxy.$route.params.username,
      password: proxy.$route.params.password,
      code: ''
    });
    let checkUsername = async (rule: RuleObject, value: string) => {
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
    let checkPassword = async (rule: RuleObject, value: string) => {
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
    let checkCode = async (rule: RuleObject, value: string) => {
      console.info(`checkCode. rule:${rule}, value:${value}`);
      if (!value) {
        return Promise.reject(proxy.$t("login.code.tip1"));
      } else if (value.length !== 4) {
        return Promise.reject(proxy.$t("login.code.tip2"));
      } else {
        return Promise.resolve();
      }
    };
    const loginFormRules = {
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
      code: [
        {
          required: true,
          validator: checkCode,
          trigger: "blur"
        }
      ],
    };
    // const codeRef = ref(null);
    const codeUrl = ref();
    // let codeUrl = ref(process.env.VUE_APP_BASE_URL + '/user/generate-verification-code?timestamp=' + new Date().getTime());
    let refreshCode = () => {
      generateCode()
          .then(response => {
            return "data:image/jpeg;base64,"
                + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
          })
          .then(function (data) {
            // codeRef.value.src = data;
            codeUrl.value = data;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            console.log(`finally`);
          });
    };
    let loading = ref(false);
    const handleFinishFailed = () => {
      console.info(`handleFinishFailed`);
    };
    const handleFinish = () => {
      console.info(`handleFinish`, toRaw(loginFormData));
      loading.value = true;
      let formData = new FormData();
      formData.set("username", loginFormData.username);
      formData.set("password", loginFormData.password);
      login(formData)
          .then(response => {
            console.log(response);
            proxy.$store.commit("setLoginState", true);
            proxy.$router.push({
              path: typeof redirect === "undefined" ? "/home" : redirect,
              params: {
                username: loginFormData.username,
                password: loginFormData.password,
              }
            });
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            console.log(`finally`);
            loading.value = false;
          });
    };
    const forgetPassword = () => {
      console.info(`forgetPassword`);
      message.error(proxy.$t("login.tip.wait"));
      // alert(proxy.$t('login.tip.wait'));
    };
    // const router = useRouter();
    const registerNewAccount = () => {
      console.info(`registerNewAccount`);
      proxy.$router.push({
        name: "register"
      })
    };
    return {
      loginFormRef,
      loginFormData,
      loginFormRules,
      loading,
      // codeRef,
      codeUrl,
      refreshCode,
      handleFinishFailed,
      handleFinish,
      forgetPassword,
      registerNewAccount
    };
  }
})
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
}

.div-header img {
  height: 80px;
  margin-right: 20px;
}

.div-content {
  width: 60vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 40px 0;
  box-shadow: 0 0 10px black;
  background-color: white;
  background-image: url("../assets/images/background.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: 100%;
}

.div-select-languages {
  margin-top: 20px;
  margin-right: 20px;
  z-index: 1000;
}

.div-form-login {
  box-sizing: border-box;
  margin-top: 10px;
  margin-right: 80px;
}

.div-form-title {
  font-size: 24px;
}

.btn-login {
  width: 300px;
}

.div-register {
  margin-top: -20px;
  margin-right: 80px;
}

.div-footer {
  color: white;
}
</style>