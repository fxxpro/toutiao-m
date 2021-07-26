<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
  import { getSearchSuggestions } from '@/api/search'
  import { debounce } from 'lodash'
  export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        suggestions: [],
      }
    },
    computed: {},
    watch: {
      searchText: {
        handler: debounce(async function() {
          //   console.log('输入内容了')
          const { data: res } = await getSearchSuggestions(this.searchText)
          //   console.log(res)
          this.suggestions = res.data.options
        }, 300),
        //刚渲染就会立即执行一次
        immediate: true,
      },
    },
    created() {},
    mounted() {},
    methods: {
      highlight(str) {
        // console.log(str)
        return str.replace(
          new RegExp(this.searchText, 'gi'),
          `<span style="color:red">${this.searchText}</span>`
        )
      },
    },
  }
</script>

<style lang="less" scoped></style>
