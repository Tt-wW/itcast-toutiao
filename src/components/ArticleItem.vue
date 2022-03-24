<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <!-- 区分不同的图，和后端沟通 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ value.title }}</span>
          <!-- 单图 -->
          <img
            class="thumb"
            :src="value.cover.images[0]"
            v-if="value.cover.type === 1"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="value.cover.type > 1">
          <img
            class="thumb"
            :src="imgUrl"
            v-for="(imgUrl, index) in value.cover.images"
            :key="index"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ value.aut_name }}</span>
            <span>{{ value.comm_count }} 评论</span>
            <span>{{ value.pubdate }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="onCloseClick" />
        </div>
      </template>
    </van-cell>

    <!-- 反馈面板 -->
    <!-- 注意，这里如果不更改挂载点，会无法显示 -->
    <!-- 因为父级元素有ovreflow：hidden，子元素超出父元素，所以隐藏了，所以要更改挂载元素 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="mytext"
      @select="onSelect"
      @cancel="onCancel"
      get-container="body"
    />
  </div>
</template>

<script>
import { firstActions, secondActions } from "@/api/report";

export default {
  props: {
    // 文章信息对象
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      mytext: "取消",
    };
  },
  methods: {
    onSelect(action) {
      if (action.name === "反馈垃圾内容") {
        this.actions = secondActions;
        this.mytext = "返回";
      } else if (action.name === "不感兴趣") {
        // 父子组件传值
        this.$emit("disLike", this.value);
        this.show = false;
      } else {
        this.$emit("reports", this.value, action.value);
        this.actions = firstActions;
        this.show = false;
      }
    },
    onCloseClick() {
      this.show = true;
    },
    onCancel() {
      if (this.mytext === "返回") {
        this.actions = firstActions;
        this.mytext = "取消";
        this.show = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
// 这些样式emmm，建议看一遍
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>