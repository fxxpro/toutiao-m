<template>
  <div class="search-result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
  import { getSearchResults } from '@/api/search'
  export default {
    name: 'SearchResult',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        page: 1,
        per_page: 20,
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async onLoad() {
        // 1.获取数据
        // 2.将数据存储到数据列表中
        // 3.关闭loading事件
        // 4.判断有没有数据,没有的话将finished改为true,代表完成了所有的数据加载,没有更多数据了
        const { data: res } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        })
        console.log(res)
        const { results } = res.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      },
    },
  }
</script>

<style lang="less" scoped></style>
