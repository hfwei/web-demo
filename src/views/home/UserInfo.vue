<template>
  <div class="container">
    <div class="title">
      <div style="font-size: 32px">您的信息</div>
      <div id="change-password">
        <span class="material-icons">vpn_key</span>
        <div class="text" style="margin-left: 10px">
          <div style="font-weight: bold">更改密码</div>
          <div style="text-align: center">安全性</div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 2%; background: transparent"></div>
    <div class="item item-name">
      <div style="height: 75%;display: flex">
        <img style="height: 100%; border-radius: 50%; padding: 20px"
             src="../../assets/images/wei.jpg"
             alt="">
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 20px">
          <div>添加照片，个性化你的账户。 你的个人资料照片会显示在使<br/>用你的 Microsoft 帐户的应用和设备上。</div>
          <div>
            <a-button style="margin-top: 10px">更改照片</a-button>
          </div>
        </div>
      </div>
      <div id="username-edit">
        <div style="width: 25%">全名</div>
        <div style="width: 25%; font-weight: bold">{{ userInfo.fullName }}</div>
        <div style="width: 25%"></div>
        <div style="width: 25%; display: flex; justify-content: flex-end">
          <div class="edit">编辑名称</div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 5%; background: transparent"></div>
    <div style="padding: 40px 10px" class="item">
      <a-descriptions style="font-weight: bold" title="个人资料信息">
        <a-descriptions-item label="Username">{{ userInfo.username }}</a-descriptions-item>
        <a-descriptions-item label="Telephone">{{ userInfo.telephone }}</a-descriptions-item>
        <a-descriptions-item label="Live">{{ userInfo.live }}</a-descriptions-item>
        <a-descriptions-item label="Remark">{{ userInfo.remark }}</a-descriptions-item>
        <a-descriptions-item label="Address">{{ userInfo.address }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "UserInfo",
  setup() {
    const userInfo = reactive({
      fullName: "魏海锋",
      username: "hfwei",
      telephone: "15088888888",
      live: "Hangzhou, Zhejiang",
      remark: "empty",
      address: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China"
    });

    setTimeout(() => {
      userInfo.username = "hfwei90";
    }, 2000)

    return {
      userInfo
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  width: 99%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 150px;
}

.item {
  width: 99%;
  height: 40%;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 5px gray;
  background: #FAFAFA;
}

.item-name {
  display: flex;
  flex-direction: column;
}

#change-password {
  display: flex;
  align-items: center;
  cursor: pointer;
}

#change-password span {
  color: rgb(0, 111, 201);
  background: rgb(207, 229, 246);
  border-radius: 50%;
  padding: 5px;
}

#change-password:hover .material-icons {
  color: rgb(207, 229, 246);
  background: rgb(0, 111, 201);
}

#change-password:hover .text {
  color: rgb(0, 111, 201);
}

.user-avatar {

}

#username-edit {
  width: 100%;
  height: 25%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

#username-edit:hover {
  background: #e0e0e0;
}

#username-edit .edit {
  color: rgb(0, 111, 201);
}

#username-edit .edit:hover {
  color: rgb(0, 60, 120);
  /*color: #0b5137;*/
}
</style>