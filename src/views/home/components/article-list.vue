<template>
  <div class="article-list-container">
    <!-- 文章列表开始 -->
    <van-pull-refresh
      v-model="isPullRefresh"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
        <!-- <van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>

    <!-- 文章列表结束 -->
  </div>
</template>

<script>
  import { getArticle } from '@/api/article'
  import ArticleItem from '@/components/article-item/index.vue'
  export default {
    name: 'articleList',
    components: { ArticleItem },
    props: {
      channels: {
        //频道数组
        trpe: Object,
        required: true,
      },
    },
    data() {
      return {
        articles: [], //文章列表数组
        loading: false,
        finished: false,
        timestamp: null,
        isPullRefresh: false,
        successText: '', //刷新成功的提示文本
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async onLoad() {
        //   1.请求获取数据
        const { data: res } = await getArticle({
          channel_id: this.channels.id, //频道id
          timestamp: this.timestamp || Date.now(), //pre_timestamp 获取最新的使用当前时间戳,获取下一页使用上一次传过来的时间戳
          with_top: 1, //1表示获取包含置顶的数据,0表示比包含置顶
        })
        // console.log(res)
        const { results } = res.data
        // 2.把数据放到articles数组中
        this.articles = this.articles.concat(results)
        // 3.设置本次加载状态结束,它才可以加载下一页,否则会一直停在加载中
        this.loading = false
        // 4.数据全部加载完毕
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          // 5.没有数据就把finshed状态设置为true,加载完毕
          this.finished = true
        }
      },
      async onRefresh() {
        console.log('加载中')
        const { data: res } = await getArticle({
          channel_id: this.channels.id, //频道id
          timestamp: Date.now(),
          with_top: 1,
        })
        const { results } = res.data
        //将数据添加到articles数组中
        this.articles.unshift(...results)
        //关闭刷新的状态
        this.isPullRefresh = false
        //更改刷新成功的提示文本
        this.successText = `更新了${results.length}条数据`
      },
    },
  }
</script>

<style lang="less" scoped>
  .article-list-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
