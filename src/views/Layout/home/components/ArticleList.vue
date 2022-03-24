<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 文章列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
      >
        <!-- :value ===>父子组件通信 -->
        <!-- 自定义事件 -->
        <article-item
          v-for="item in articleList"
          :key="item.art_id"
          :value="item"
          @disLike="disLikeFn"
          @reports="reportsFn"
          @click.native="$router.push(`/article_detail?aid=${item.art_id}`)"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
 
<script>
// 数据预处理 ===>在使用数据之前, 对数据里的值进行修改
import { timeAgo } from "@/utils/date/date";
import { Notify } from "vant";
export default {
  props: {
    cid: Number,
  },
  mounted() {},
  created() {
    this.getArticlesListData();
  },
  data() {
    return {
      articleList: [], // 文章列表
      loading: false, // 底部加载状态
      finished: false, // 数据是否全部加载完成
      nextTime: null, //分页
      isLoading: false, // 顶部刷新状态
    };
  },
  methods: {
    async getArticlesListData() {
      try {
        const res = await this.$API.articlesListAPI({
          channelId: this.cid, // 默认推荐频道(id为0)
          timestamp: this.nextTime,
        });
        // 回来的数据进行预处理, 把时间转成多久多久之前,注意每一个都要进行转换
        res.data.data.results.forEach((obj) => {
          obj.pubdate = timeAgo(obj.pubdate);
        });
        if (res.data.data.results.length === 0) {
          // 告诉list组件其底部显示没有更多数据
          this.finished = true;
        } else {
          // 保存下一页数据的时间(做分页用)
          this.nextTime = res.data.data.pre_timestamp;
          // 储存已经请求的和新请求的
          this.articleList = [...this.articleList, ...res.data.data.results];
          // 等待网络请求结果后
          // 底部加载更多状态
          this.loading = false;
        }
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    },
    onLoad() {
      // 网页打开list组件自动检查会触发一次onLoad, 所以我们要在有数据后再让onLoad里请求数据
      if (this.articleList.length > 0) {
        this.getArticlesListData();
      }
    },
    async onRefresh() {
      this.nextTime = null;
      this.articleList = [];
      try {
        await this.getArticlesListData();
        this.isLoading = false;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async disLikeFn(value) {
      try {
        await this.$API.articleDislikeAPI({ target: value.art_id });
        Notify({ type: "success", message: "反馈成功" });
      } catch (error) {
        Notify({ type: "warning", message: "反馈失败-联系程序员" });
      }
    },
    async reportsFn(value, type) {
      try {
        await this.$API.articleReportsAPI({
          target: value.art_id,
          type: type,
          remark: "就是其他问题",
        });
        Notify({ type: "success", message: "举报成功" });
      } catch (error) {
        Notify({ type: "warning", message: "举报失败" });
      }
    },
  },
};
</script>
 
<style scoped lang = "less">
</style>