<template>
  <div>
    <!-- 头部标签导航 -->
    <div>
      <van-nav-bar fixed title="快去学习coding...">
        <template #left>
          <!-- 这里不放图片了，找图麻烦，有需要自己找，代码注释解开即可，注意样式 -->
          <!-- <img :src="imgObj" alt="" class="logo"> -->
          <van-icon name="fire-o" color="#ee0a24" size="0.48rem" />
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')"/>
        </template>
      </van-nav-bar>
    </div>
    <!-- 频道部分 -->
    <div class="main">
      <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem">
        <!-- 在van-tabs上修改v-model变量名(把active换成channelId)
             在van-tab绑定name属性和值(值为频道ID)
             点van-tab后,name值会自动绑定给v-model(vant组件内部实现的)
              -->
        <van-tab
          :title="item.name"
          v-for="item in channelList"
          :key="item.id"
          :name="item.id"
        >
          <ArticleList :cid="channelId" />
        </van-tab>
      </van-tabs>
      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="show = true"
      />
    </div>

    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap">
      <ChannelEdit
        @close="show = false"
        :userChannelList="channelList"
        @addChannel="addChannelFn"
        @removeChannel="removeChannelFn"
        @changeChannel="channgeChannelFn"
      />
    </van-popup>
  </div>
</template>
 
<script>
// import logo from '../../../assets/tab_logo.png'
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from "./components/ChannelEdit.vue";
export default {
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      // imgObj:logo
      // 频道ID(默认0是推荐)
      channelId: 0,
      channelList: [],
      show: false,
    };
  },
  mounted() {
    this.getUserChannelData();
  },
  methods: {
    async getUserChannelData() {
      try {
        const res = await this.$API.userChannelAPI();
        this.channelList = res.data.data.channels;
      } catch (error) {
        this.$router.push('/login')
      }
    },
    // 更新频道
    async updateChannel() {
      // 先过滤掉id为0的推荐频道, 把剩余的数组返回
      const newArr = this.channelList.filter((item) => item.id != 0);
      // map会收集每次遍历return的值形成一个新数组
      const lastArr = newArr.map((item, index) => {
        // 浅拷贝(让对象和原数组脱离关系)  es6
        const newObj = { ...item };
        newObj.seq = index + 1;
        // 删除对象里name键值对
        delete newObj.name;
        return newObj;
      });
      await this.$API.updateChannelAPI({
        channels: lastArr,
      });
    },
    // 添加频道
    async addChannelFn(item) {
      this.channelList.push(item);
      this.updateChannel();
    },
    // 删除频道
    async removeChannelFn(item) {
      const int = this.channelList.findIndex((el) => el.id === item.id);
      this.channelList.splice(int, 1);
      this.updateChannel();
    },
    // 点击进入频道
    channgeChannelFn(item) {
      this.channelId = item.id;
    },
  },
};
</script>
 
<style scoped lang = "less">
/* .logo{
     width: 100px;
     height: 30px;
   } */
.main {
  padding-top: 44px;
}
/* 设置 tabs 容器的样式 */
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

/* 设置小图标的样式 */
/* 实际就是遮住了下面，背景色一设置就好了 */
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap {
  width: 100%;
  height: 100%;
}
</style>