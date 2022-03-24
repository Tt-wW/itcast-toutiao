<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="我的频道">
      <template #right>
        <van-icon
          name="cross"
          size="0.37333334rem"
          color="white"
          @click="closeFn"
        />
      </template>
    </van-nav-bar>

    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title">
            {{ isEdit ? "点击删除频道" : "点击进入频道" }}
          </span>
        </span>
        <span @click="isEdit = !isEdit">{{ isEdit ? "完成" : "编辑" }}</span>
      </div>

      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col
          span="6"
          v-for="item in userChannelList"
          :key="item.id"
          @click="removeFn(item)"
        >
          <div class="channel-item van-hairline--surround">
            {{ item.name }}
            <!-- 删除的徽标 -->
            <van-badge
              color="transparent"
              class="cross-badge"
              v-if="isEdit && item.name != '推荐'"
            >
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col
          span="6"
          v-for="item in unChannelList"
          :key="item.id"
          @click="addFn(item)"
        >
          <div class="channel-item van-hairline--surround">{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    // 用户已选择频道
    userChannelList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      allChannelList: [], // 所有频道
      isEdit: false, // 控制编辑状态
    };
  },
  async created() {
    try {
      const result = await this.$API.getAllChannelsAPI();
      this.allChannelList = result.data.data.channels;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  computed: {
    // 提取未选中的频道数据
    unChannelList() {
      return this.allChannelList.filter((item) => {
        const index = this.userChannelList.findIndex(
          (element) => element.id === item.id
        );
        // 返回-1，就是两者非交集部分
        // 返回true，那么filter就返回这个元素
        if (index === -1) return true;
      });
    },
  },
  methods: {
    // 新增频道
    addFn(item) {
      if (this.isEdit === true) {
        this.$emit("addChannel", item);
      }
    },
    // 删除频道
    removeFn(item) {
      if (this.isEdit === true && item.name !== "推荐") {
        this.$emit("removeChannel", item);
      } else {
        this.$emit("changeChannel", item);
        this.$emit("close");
      }
    },
    // 更新编辑状态
    closeFn() {
      this.$emit("close");
      this.isEdit = false;
    },
  },
};
</script>
 
<style scoped lang = "less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>