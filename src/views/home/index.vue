<template>
  <div class="home-container">
    <!-- navbar部分开始 -->
    <van-nav-bar>
      <div class="search-wrap" slot="title">
        <van-button icon="search" round type="info" to="/search"
          >搜索</van-button
        >
      </div>
    </van-nav-bar>
    <!-- navbar部分结束 -->

    <!-- tab栏频道内容开始 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表开始 -->
        <article-list :channels="item"></article-list>
        <!-- 文章列表结束 -->
      </van-tab>
      <div slot="nav-right" class="nav-palceholder"></div>
      <div slot="nav-right" class="nav-right" @click="show = true">
        <van-icon name="bars" />
      </div>
    </van-tabs>
    <!-- tab栏频道内容结束 -->
    <!-- 弹出层开始 -->
    <!-- 弹出层开始 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      class="popup"
      close-icon-position="top-left"
      get-container="body"
    >
      <channel-edit
        :channels="channels"
        @switchChannel="active = $event"
        @close="show = false"
        :active="active"
      ></channel-edit>
    </van-popup>
    <!-- 弹出层结束 -->
  </div>
</template>

<script>
  import { getUserChannels } from '@/api/user'
  import ArticleList from './components/article-list.vue'
  import ChannelEdit from './components/channelEdit.vue'
  import { getItem } from '@/utils/localStorage'
  import { mapState } from 'vuex'
  export default {
    name: 'home',
    components: { ArticleList, ChannelEdit },
    props: {},
    data() {
      return {
        active: 0,
        channels: [],
        show: false,
      }
    },
    computed: {
      ...mapState(['user']),
    },
    watch: {},
    created() {
      this.loadUserChannels()
    },
    mounted() {},
    methods: {
      async loadUserChannels() {
        let channels = []
        // 判断用户有没有登录
        if (this.user) {
          // 如果登录就发请求获取该用户的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 否则判断本地存储有没有
          const localChannels = getItem('user-channels')
          if (localChannels) {
            // 有的话就用本地存储
            channels = localChannels
          } else {
            // 没有的话发请求获取默认数据
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      },
    },
  }
</script>

<style lang="less" scoped>
  .van-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: none;
    }
    .search-wrap {
      .van-button {
        width: 277px;
        height: 32px;
        background-color: #5babfb;
        border: none;

        .van-icon {
          font-size: 16px;
        }
        .van-button__text {
          font-size: 14px;
        }
      }
    }
  }

  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    bottom: 20px;
    background-color: #3296fa;
    width: 15px;
    height: 3px;
  }
  .popup {
    height: 100%;
  }
  .nav-right {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: '';
      background: url('./lin.png') no-repeat;
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 43px;
      background-size: contain;
    }
  }
  .nav-palceholder {
    width: 33px;
    flex-shrink: 0;
  }
</style>
