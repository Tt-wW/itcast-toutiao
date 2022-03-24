<template>
  <div>
    <van-nav-bar title="❤L O G I N❤" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="formLogin.mobile"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          {
            required: true,
            message: '请填写手机号',
            trigger: 'onChange',
            pattern: /^1[3456789]\d{9}$/,
          },
        ]"
      />
      <van-field
        v-model="formLogin.code"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          {
            required: true,
            message: '请填写密码',
            trigger: 'onChange',
            pattern: /^\d{6}$/,
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="this.isLoading"
          :disabled="this.isLoading"
          loading-text="耐心一点..."
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
 
<script>
import { Notify } from "vant";
import { mapActions } from "vuex";
import { setToken } from "@/utils/user_token";
export default {
  name: "login",
  data() {
    return {
      formLogin: {
        mobile: "13888888888",
        code: 246810,
      },
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["asyncLoginAction"]),
    async onSubmit() {
      this.isLoading = true;
      try {
        // const res = getToken() ? getToken() : setToken("");
        // console.log(res);
        await this.asyncLoginAction(this.formLogin);
        Notify({ type: "success", message: "登录成功" });
        this.isLoading = false;
        this.$router.push({ name: "layout" });
      } catch (error) {
        console.dir(error);
        Notify({ type: "warning", message: "手机号或密码错误" });
        this.isLoading = false;
      }
    },
  },
};
</script>
 
<style scoped lang = "less">
</style>