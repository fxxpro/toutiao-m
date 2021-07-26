<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route active-color="red">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        active: 0,
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="less" scoped></style>
