<template>
  <div class="search-history-container">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="removeAllHistories">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistorys"
      :key="index"
      class="van-ellipsis"
      @click="onDelete(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
  import { setItem } from '@/utils/localStorage'
  import { deleteAllHistories } from '@/api/search'
  export default {
    name: 'SearchHistory',
    components: {},
    props: {
      searchHistorys: {
        type: Array,
      },
    },
    data() {
      return {
        isDeleteShow: false,
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      onDelete(item, index) {
        if (this.isDeleteShow) {
          this.searchHistorys.splice(index, 1)
          setItem('search-history', this.searchHistorys)
          return
        }
        this.$emit('search', item)
      },
      async removeAllHistories() {
        this.$emit('removeAll')
        const res = await deleteAllHistories()
      },
    },
  }
</script>

<style lang="less" scoped></style>
