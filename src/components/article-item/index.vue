<template>
  <div class="article-item-container">
    <!-- <van-cell class="article-item" :to="`/article/${article.art_id}`"> -->
    <van-cell
      class="article-item"
      :to="{
        name: 'article',
        params: {
          articleId: article.art_id,
        },
      }"
    >
      <div slot="title" class="article-title van-multi-ellipsis--l3">
        {{ article.title }}
      </div>
      <div slot="label" class="article-label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-item"
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image class="article-img3" :src="img" fit="cover" />
          </div>
        </div>
        <div class="label-wrap">
          <span class="aut_name">{{ article.aut_name }}</span>
          <span class="like_count">{{ article.like_count }}评论</span>
          <span class="pubdate">{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        class="article-img1"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </van-cell>
  </div>
</template>

<script>
  export default {
    name: 'articleItem',
    components: {},
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="less" scoped>
  .article-item-container {
    .article-item {
      .article-title {
        font-size: 16px;
        color: #3a3a3a;
      }
      .van-cell__value {
        flex: unset;
        margin-left: 12px;
      }

      .article-label {
        .cover-wrap {
          display: flex;
          .cover-item {
            flex: 1;
            &:not(:last-child) {
              padding-right: 4px;
            }
            .article-img3 {
              width: 100%;
              height: 73px;
            }
          }
        }

        .label-wrap {
          font-size: 11px;
          color: #b4b4b4;
          span {
            margin-right: 12px;
          }
          .aut_name {
          }

          .like_count {
          }

          .pubdate {
          }
        }
      }

      .article-img1 {
        width: 116px;
        height: 73px;
      }
    }
  }
</style>
