<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>

    <!-- 搜索结果 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
      >
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :value="item"
          @click.native="$router.push(`/article_detail?aid=${item.art_id}`)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { timeAgo } from "@/utils/date/date";
export default {
  name: "SearchResult",
  data() {
    return {
      articleList: [], // 文章数据
      loading: false, // 底部加载状态
      finished: false, // 数据是否全部加载完成
      page: 1,
    };
  },
  created() {
    this.getSearchInfo();
  },
  methods: {
    async getSearchInfo() {
      const res = await this.$API.searchResultListAPI({
        q: this.$route.params.keywords,
        page: this.page,
      });
      // 是否有更多数据
      if (res.data.data.results.length === 0) {
        this.finished = true;
        return;
      }
      // 数据预处理
      res.data.data.results.forEach((obj) => {
        obj.pubdate = timeAgo(obj.pubdate);
      });
      this.articleList = [...this.articleList, ...res.data.data.results];
      this.loading = false;
    },
    onLoad() {
      // 网页打开list组件自动检查会触发一次onLoad, 所以我们要在有数据后再让onLoad里请求数据
      if (this.articleList.length > 0) {
        this.page++;
        this.getSearchInfo();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>