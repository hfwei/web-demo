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
          v-model:selected-keys="selectKeys"
          v-model:open-keys="openKeys"
          @click="handleClick"
          @openChange="onOpenChange">
        <template v-for="item in menu" :key="item.key">
          <a-menu-item v-if="!item.hasSecond" :key="item.key">
            <template #icon>
              <div v-if="!collapsed" style="display: flex; align-items: center">
                <span class="material-icons">{{ item.icon }}</span>
              </div>
              <div v-else>
                <span class="material-icons" style="margin: 8px 0 0 0">{{ item.icon }}</span>
              </div>
            </template>
            <span>{{ item.content }}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="item.key">
            <template #icon>
              <span class="material-icons" style="font-size: 24px">{{ item.icon }}</span>
            </template>
            <template #title>{{ item.content }}</template>
            <a-menu-item v-for="subItem in item.sub" :key="subItem.key ">
              {{ subItem.content }}
            </a-menu-item>
          </a-sub-menu>
        </template>
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
                <template v-for="item in dropdownMenu" :key="item.key">
                  <a-menu-item
                      v-if="0===item.key"
                      :style="item.style">
                    {{ item.content }}
                  </a-menu-item>
                  <a-menu-divider v-if="0===item.key"/>
                  <a-menu-item v-else :key="item.key">
                    <div class="menu-item">
                      <span class="material-icons" :style="item.style">{{ item.icon }}</span>
                      <span>{{ item.content }}</span>
                    </div>
                  </a-menu-item>
                </template>
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
import {reactive, toRefs, ref} from "vue";
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
      menu: [
        {
          hasSecond: false,
          key: 1,
          icon: "supervisor_account",
          content: "用户管理",
          sub: []
        },
        {
          hasSecond: false,
          key: 2,
          icon: "face",
          content: "角色管理",
          sub: []
        },
        {
          hasSecond: false,
          key: 3,
          icon: "admin_panel_settings",
          content: "权限管理",
          sub: []
        },
        {
          hasSecond: true,
          key: "sub1",
          icon: "build_circle",
          content: "运维管理",
          sub: [
            {
              key: 4,
              content: "日志管理"
            },
            {
              key: 5,
              content: "警报管理"
            },
            {
              key: 6,
              content: "监控管理"
            }]
        },
        {
          hasSecond: true,
          key: "sub2",
          icon: "build_circle",
          content: "待添加",
          sub: [
            {
              key: 7,
              content: "待添加"
            },
            {
              key: 8,
              content: "待添加"
            },
            {
              key: 9,
              content: "待添加"
            }]
        }],
      selectKeys: [],
      openKeys: [],
      dropdownMenu: [
        {
          key: 0,
          style: {
            textAlign: "center",
            fontWeight: "bold"
          },
          icon: "",
          content: "hfwei"
        },
        {
          key: 1,
          style: {
            margin: "1px 0 0"
          },
          icon: "home",
          content: "返回首页"
        },
        {
          key: 2,
          style: {
            margin: "1px 0 0"
          },
          icon: "person",
          content: "用户信息"
        },
        {
          key: 3,
          style: {
            fontSize: "21px",
            margin: "3px 1px 0"
          },
          icon: "cancel",
          content: "退出系统"
        }]
    });

    const handleClick = (e) => {
      console.log(`handleClick. e:`, e);
      if (e.key <= 3) state.openKeys = [];
    }

    const onOpenChange = (openKeys) => {
      console.log(`openKeys:`, openKeys);
      if (openKeys.length > 1) {
        openKeys.splice(0, openKeys.length - 1);
      }
    };

    // watch(
    //     () => state.openKeys,
    //     (val, oldVal) => {
    //       console.log(`watch openKeys. val:${val}, oldVal:${oldVal}`);
    //       console.log(`openKeys:`,state.openKeys);
    //       state.preOpenKeys = oldVal;
    //     }
    // );

    const toggleCollapsed = () => {
      console.log(`toggleCollapsed. collapsed:`, state.collapsed);
      console.log(`selectKeys:`, state.selectKeys);
      state.collapsed = !state.collapsed;
      // state.openKeys = state.collapsed ? [] : state.preOpenKeys;

      if (!state.collapsed) {
        if (0 === state.selectKeys.length || state.selectKeys[0] <= 3) {
          state.openKeys = [];
        } else {
          const item = state.menu.find(item => item.hasSecond && item.sub.some(item => state.selectKeys[0] === item.key));
          state.openKeys = [item.key];
        }
      } else {
        state.openKeys = [];
      }
    }

    const visible = ref(false);

    const onClick = ({key}) => {
      console.log(`onClick. key:`, key);
      visible.value = false;
      state.selectKeys = [];
      state.openKeys = [];
      state.preOpenKeys = [];
      switch (parseInt(key)) {
        case 1:
          router.push({name: "index"});
          break
        case 2:
          router.push({name: "userInfo"});
          break
        case 3:
          break;
        default:
          break;
      }
    }

    return {
      ...toRefs(state),
      handleClick,
      onOpenChange,
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