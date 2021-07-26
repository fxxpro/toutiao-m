<template>
  <div class="user-info-container">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <h1 class="article-title">{{ articleDetail.title }}</h1>
    <van-cell center class="user-info">
      <van-image
        class="avator"
        round
        slot="icon"
        fit="cover"
        :src="articleDetail.aut_photo"
      />
      <div slot="title" class="user-name">{{ articleDetail.aut_name }}</div>
      <div slot="label" class="time">
        {{ articleDetail.pubdate | relativeTime }}
      </div>
      <van-button
        class="btn"
        :icon="articleDetail.is_followed ? '' : 'plus'"
        :type="articleDetail.is_followed ? 'default' : 'info'"
        size="small"
        round
        @click="onFollow"
        :loading="isLoading"
        >{{ articleDetail.is_followed ? '已关注' : '关注' }}</van-button
      >
    </van-cell>
    <div
      class="markdown-body"
      v-html="articleDetail.content"
      ref="articleContent"
    ></div>

    <!-- 底部区域开始 -->
    <div class="footer_tool">
      <van-button size="small" round class="btn">写评论</van-button>
      <van-icon class="comment" color="#777" name="comment-o" badge="123" />
      <van-icon
        class="star"
        :color="articleDetail.is_collected ? 'purple' : '#777'"
        :name="articleDetail.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        class="good-job"
        :color="this.articleDetail.attitude === 1 ? 'gold' : '#777'"
        :name="this.articleDetail.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share" name="share" />
    </div>
    <!-- 底部区域结束 -->
  </div>
</template>

<script>
  import './github-markdown.css'
  import {
    getArticleById,
    deleteCollect,
    addCollect,
    deleteLike,
    addLike,
  } from '@/api/article'
  import { ImagePreview } from 'vant'
  import { deleteFollow, addFollow } from '@/api/user'
  export default {
    name: 'ArticleDetail',
    components: {},
    props: {
      articleId: {
        type: [Number, String, Object],
        required: true,
      },
    },
    data() {
      return {
        articleDetail: {},
        isLoading: false,
      }
    },
    computed: {},
    watch: {},
    created() {
      this.loadArticle()
    },
    mounted() {},
    methods: {
      async loadArticle() {
        const { data } = await getArticleById(this.articleId)
        // console.log(data)
        this.articleDetail = data.data
        //数据修改之后影响视图更新(DOM更新)不是立即的,所以如果需要在数据更新后马上操作被该数据影响的视图DOM,需要把代码放到$nextTick中
        this.$nextTick(() => {
          this.previewImage()
        })
      },
      previewImage() {
        const articleContent = this.$refs.articleContent
        const imgs = articleContent.querySelectorAll('img')
        const imgPaths = []
        imgs.forEach((img, index) => {
          imgPaths.push(img.src)
          img.onclick = function() {
            ImagePreview({
              images: imgPaths,
              startPosition: index,
              closeable: true,
            })
          }
        })
      },
      async onFollow() {
        this.isLoading = true
        if (this.articleDetail.is_followed) {
          await deleteFollow(this.articleDetail.aut_id)
        } else {
          await addFollow(this.articleDetail.aut_id)
        }
        this.articleDetail.is_followed = !this.articleDetail.is_followed
        this.isLoading = false
      },
      async onCollect() {
        this.$toast.loading({
          message: '操作中',
          forbidClick: true,
        })
        if (this.articleDetail.is_collected) {
          const res = await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.articleDetail.is_collected = !this.articleDetail.is_collected
        this.$toast.success(
          `${this.articleDetail.is_collected ? '' : '取消'}收藏成功`
        )
      },
      async onLike() {
        this.$toast.loading({
          message: '操作中',
          forbidClick: true,
        })
        if (this.articleDetail.attitude === 1) {
          await deleteLike(this.articleId)
          this.articleDetail.attitude = -1
        } else {
          await addLike(this.articleId)
          this.articleDetail.attitude = 1
        }
        this.$toast.success(
          `${this.articleDetail.attitude === 1 ? '' : '取消'}点赞成功`
        )
      },
    },
  }
</script>

<style lang="less" scoped>
  .article-title {
    font-size: 20px;
    padding-left: 14px;
    color: #3a3a3a;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .avator {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .user-name {
      font-size: 12px;
      color: #333;
    }
    .time {
      font-size: 11px;
      color: #b4b4b4;
    }
    .btn {
      width: 85px;
      height: 29px;
    }
  }
  ul {
    list-style: unset;
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
  .footer_tool {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    bottom: 0;
    height: 44px;
    background-color: #fff;
    display: flex;
    // justify-content: center;
    align-items: center;
    .btn {
      border: 1px solid #ccc;
      margin-right: 25px;
      margin-left: 20px;
      height: 22px;
      width: 140px;
      font-size: 15px;
    }
    .comment {
      width: 22px;
      height: 22px;
      margin-right: 25px;
    }
    .star {
      width: 22px;
      height: 22px;
      margin-right: 25px;
    }
    .good-job {
      width: 22px;
      height: 22px;
      margin-right: 25px;
    }
    .share {
      width: 22px;
      height: 22px;
      margin-right: 25px;
    }
  }
</style>
