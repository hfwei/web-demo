<template>
  <a-layout style="width: 100vw; height: 100vh">
    <a-layout-sider
        :trigger="null"
        v-model:collapsed="collapsed"
        collapsible>
      <div style="margin: 16px; height: 32px; display: flex; justify-content: center; align-items: center">
        <img style="height: 32px" src="../assets/images/logo.png" alt="">
        <span style="margin-left: 8px; color: white; font-size: 18px; font-weight: bold"
              v-if="!collapsed">{{ $t('home.title') }}</span>
      </div>
      <a-menu
          mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectKeys">
        <a-menu-item key="1">
          <template #icon>
            <div v-if="!collapsed" style="display: flex; align-items: center">
              <span class="material-icons">supervisor_account</span>
            </div>
            <div v-else>
              <span class="material-icons" style="margin: 8px 0 0 0">supervisor_account</span>
            </div>
          </template>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <div v-if="!collapsed" style="display: flex; align-items: center">
              <span class="material-icons">face</span>
            </div>
            <div v-else>
              <span class="material-icons" style="margin: 8px 0 0 0">face</span>
            </div>
          </template>
          <span>角色管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <div v-if="!collapsed" style="display: flex; align-items: center">
              <span class="material-icons">admin_panel_settings</span>
            </div>
            <div v-else>
              <span class="material-icons" style="margin: 8px 0 0 0">admin_panel_settings</span>
            </div>
          </template>
          <span>权限管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <span class="material-icons" style="font-size: 24px">build_circle</span>
          </template>
          <template #title>运维管理</template>
          <a-menu-item key="5">日志管理</a-menu-item>
          <a-menu-item key="6">警报管理</a-menu-item>
          <a-menu-item key="7">监控管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: white; padding: 0; display: flex; justify-content: space-between">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="toggleCollapsed"
        />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed"/>
        <div style="display: flex; align-items: center; margin-right: 16px">
          <img
              style="width: 32px; height: 32px; border-radius: 50%"
              src="../assets/images/wei.jpg"/>
          <a-dropdown :trigger="['click']" v-model:visible="visible">
            <span
                v-if="!visible"
                class="material-icons"
                style="cursor: pointer">arrow_drop_down</span>
            <span
                v-else
                class="material-icons"
                style="cursor: pointer">arrow_drop_up</span>
            <!--            <span class="material-icons">dehaze</span>-->
            <!--            <span class="material-icons">keyboard_arrow_down</span>-->
            <!--            <span class="material-icons">arrow_drop_down</span>-->
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item style="text-align: center; font-weight: bold">hfwei</a-menu-item>
                <a-menu-divider/>
                <a-menu-item key="0">
                  <div class="menu-item">
                    <span class="material-icons" style="margin: 1px 0 0">home</span>
                    <span>返回首页</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="1">
                  <div class="menu-item">
                    <span class="material-icons" style="margin: 1px 0 0">person</span>
                    <span>用户信息</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="2">
                  <div class="menu-item">
                    <span class="material-icons" style="font-size: 21px; margin: 2px 1px 0">cancel</span>
                    <span>退出系统</span>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {reactive, watch, toRefs, ref} from "vue";
import {useRouter} from "vue-router";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons-vue";

export default {
  name: "HomeNew",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      collapsed: false,
      selectKeys: ["2"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"]
    });

    watch(
        () => state.openKeys,
        (val, oldVal) => {
          state.preOpenKeys = oldVal;
        }
    );

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    }

    const visible = ref(false);

    const onClick = ({key}) => {
      console.log(`onClick. key:`, key);
      visible.value = false;
      switch (key) {
        case "0":
          router.push({name: "index"});
          break
        case "1":
          router.push({name: "userInfo"});
          break
        case "2":
          break;
        default:
          break;
      }
    }

    return {
      ...toRefs(state),
      toggleCollapsed,
      onClick,
      visible
    }
  }
}
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.menu-item {
  display: flex;
  align-items: center
}
</style>