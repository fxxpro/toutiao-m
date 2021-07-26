<template>
  <div class="ny_container">
    <van-cell-group v-if="user">
      <van-cell center :border="false">
        <van-image
          slot="icon"
          round
          fit="cover"
          :src="userInfo.photo"
          class="cover"
        />
        <div class="name" slot="title">{{ userInfo.name }}</div>
        <van-button slot="right-icon" size="mini" round>编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data_info">
        <van-grid-item class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">{{ userInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">{{ userInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">{{ userInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录状态的视图 -->
    <div class="no-login" v-else>
      <div class="phone" @click="$router.push('/login')">
        <img src="./phone.png" alt="登录" />
      </div>
      <div class="login-text">登录 / 注册</div>
    </div>
    <van-grid :column-num="2" class="nav_grid_wrap mb-4">
      <van-grid-item class="nav_shoucang" icon="star-o" text="收藏" />
      <van-grid-item class="nav_lishi" icon="browsing-history-o" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb-4" title="小智同学" is-link to="" />
    <van-cell v-if="user" class="exit-btn" title="退出登录" @click="onExit" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/api/user'
  export default {
    name: 'My',
    components: {},
    props: {},
    data() {
      return {
        userInfo: {},
      }
    },
    computed: {
      ...mapState(['user']),
    },
    watch: {},
    created() {
      this.loadUserInfo()
    },
    mounted() {},
    methods: {
      onExit() {
        this.$dialog
          .confirm({
            title: '退出登录',
            message: '确认要退出登录吗?',
          })
          .then(() => {
            // on confirm
            this.$store.commit('setUser', null)
          })
          .catch(() => {
            // on cancel
          })
      },
      async loadUserInfo() {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      },
    },
  }
</script>

<style lang="less" scoped>
  .van-cell-group {
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .van-cell {
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .cover {
        border: 1px solid #fff;
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .van-button {
        height: 16px;
        color: #666;
      }
    }
    .data_info {
      height: 65px;
      font-size: 18px;
      color: #fff;

      .data_info_item {
        .text_wrap {
          flex-direction: column;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          font-size: 11px;
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .no-login {
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url('./banner.png');
    background-size: cover;
    .phone {
      img {
        width: 66px;
        height: 66px;
      }
    }

    .login-text {
      font-size: 14px;
    }
  }

  /deep/ .nav_grid_wrap {
    height: 70px;
    .nav_shoucang {
      .van-icon {
        color: #ee696a;
        font-size: 22px;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
    .nav_lishi {
      .van-icon {
        color: #ff9d1d;
        font-size: 22px;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .exit-btn {
    text-align: center;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
</style>
