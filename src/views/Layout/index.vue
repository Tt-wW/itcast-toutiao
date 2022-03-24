<template>
  <div>
    <!-- 二级路由跳转页面 -->
    <div class="home_container">
      <router-view></router-view>
    </div>
    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
 
<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
};
</script>
 
<style scoped lang = "less">
/* 内容底部内边距(把内容往上挤压, 防止内容被底部导航挡住) */
  .home_container{
    padding-bottom: 50px;
  }
  /* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}

</style>