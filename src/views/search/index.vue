<template>
  <div class="search-container">
    <!-- 搜索输入框开始 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="resultShow = false"
      />
    </form>
    <!-- 搜索输入框结束 -->

    <!-- 搜索结果开始 -->
    <search-result
      v-if="resultShow"
      class="search-result"
      :searchText="searchText"
    ></search-result>
    <!-- 搜索结果结束 -->

    <!-- 联想建议开始 -->
    <search-suggestion
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 联想建议结束 -->

    <!-- 搜索历史开始 -->
    <search-history
      v-else
      :searchHistorys="searchHistorys"
      @search="onSearch"
      @removeAll="searchHistorys = []"
    ></search-history>
    <!-- 搜索历史结束 -->
  </div>
</template>

<script>
  import SearchHistory from './components/search-history.vue'
  import SearchResult from './components/search-result.vue'
  import SearchSuggestion from './components/search-suggestion.vue'
  import { getSearchHistorys } from '@/api/search'
  import { mapState } from 'vuex'
  import { setItem, getItem } from '@/utils/localStorage'
  export default {
    name: 'Search',
    components: { SearchSuggestion, SearchHistory, SearchResult },
    props: {},
    data() {
      return {
        searchText: '',
        resultShow: false,
        searchHistorys: [],
      }
    },
    computed: {
      ...mapState(['user']),
    },
    watch: {},
    created() {
      this.loadSearchHistorys()
    },
    mounted() {},
    methods: {
      onSearch(searchText) {
        this.searchText = searchText
        const index = this.searchHistorys.indexOf(searchText)

        if (index !== -1) {
          this.searchHistorys.splice(index, 1)
        }
        this.searchHistorys.unshift(searchText)
        if (!this.user) {
          setItem('search-history', this.searchHistorys)
        }
        this.resultShow = true
      },
      async loadSearchHistorys() {
        let searchHistorys = getItem('search-history')
        if (this.user) {
          const { data: res } = await getSearchHistorys()
          console.log(res.data.keywords)
          searchHistorys = [
            ...new Set(searchHistorys.concat(res.data.keywords)),
          ]
        }
        this.searchHistorys = searchHistorys
        console.log(this.searchHistorys)
      },
    },
  }
</script>

<style lang="less" scoped>
  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
