<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-splot
        @input="inputFn"
        v-model="kw"
        @search="enterFn"
      />
    </div>

    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-for="(str, index) in suggestList" :key="index">
      <div
        class="sugg-item"
        v-html="lightFn(str, kw)"
        v-if="kw.length !== 0"
        @click="clickFn(str)"
      ></div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="kw.length == 0">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn"/>
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          @click="clickHisFn(str)"
          >{{ str }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { lightFn } from "@/utils/highLight";
export default {
  data() {
    return {
      kw: "", // 搜索关键字
      timer: null, //防抖 ---》其实使用loadsh就好，比你自己写强多了
      suggestList: [], // 建议关键字列表
      history: JSON.parse(localStorage.getItem("HISTORY")) || [
        "API",
        "java",
        "css",
        "前端",
        "后台接口",
        "python",
      ], // 搜索历史
    };
  },
  methods: {
    inputFn() {
      if (this.kw == "") {
        this.suggestList = [];
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.kw.length === 0) return; // 防止空内容触发下面逻辑
        // console.log(this.kw);
        const res = await this.$API.suggestListAPI({ q: this.kw });
        // console.log(res.data.data.options);
        this.suggestList = res.data.data.options;
      }, 100);
    },
    lightFn,
    // 由于路由先条状，watch还没来得及执行，所以我们写一个定时器，标记其后执行
    enterFn() {
      if (this.kw != "") {
        // 数组去重
        this.history.push(this.kw);
        this.history = Array.from(new Set(this.history));
      }
      setTimeout(() => {
        this.$router.push({
          path: `/search/${this.kw}`,
        });
      });
    },
    clickFn(str) {
      this.history.push(str);
      this.history = Array.from(new Set(this.history));
      setTimeout(() => {
        this.$router.push({
          path: `/search/${str}`,
        });
      });
    },
    clickHisFn(str) {
      this.$router.push({
        path: `/search/${str}`,
      });
    },
    clearFn(){
      this.history = []
    }
  },
  watch: {
    history() {
      localStorage.setItem("HISTORY", JSON.stringify(this.history));
    },
  },
};
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>