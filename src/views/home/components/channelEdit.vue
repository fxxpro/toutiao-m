<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        type="danger"
        round
        plain
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        class="grid-item"
        :class="{ active: index === active }"
        :text="item.name"
        v-for="(item, index) in channels"
        :key="index"
        @click="onUserChannelClick(item, index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :text="item.name"
        v-for="(item, index) in recommendChannels"
        :key="index"
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
  import { getAllChannels, addChannels, deleteChannels } from '@/api/channels'
  import { mapState } from 'vuex'
  import { setItem } from '@/utils/localStorage'
  export default {
    name: 'ChannelEdit',
    components: {},
    props: {
      channels: {
        //我的频道数据
        type: Array,
        required: true,
      },
      active: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        allChannels: [], //全部频道数据
        isEdit: false,
      }
    },
    computed: {
      //推荐频道数据
      recommendChannels() {
        return this.allChannels.filter(channel => {
          return !this.channels.find(userChannel => {
            return userChannel.id === channel.id
          })
        })
      },
      ...mapState(['user']),
    },
    watch: {},
    created() {
      this.loadAllchannels()
    },
    mounted() {},
    methods: {
      async loadAllchannels() {
        const { data: res } = await getAllChannels()
        console.log(res)
        this.allChannels = res.data.channels
      },
      //   添加频道
      async onAdd(channel) {
        this.channels.push(channel)
        if (this.user) {
          //如果登录了就存储到线上
          await addChannels({
            channels: [{ id: channel.id, seq: this.channels.length }],
          })
        } else {
          //    否则就存储到本地
          setItem('user-channels', this.channels)
        }
      },
      onUserChannelClick(chanell, index) {
        if (this.isEdit && index !== 0) {
          this.deleteChanell(chanell, index)
        } else {
          this.switchChannel(index)
        }
      },
      //   删除频道
      async deleteChanell(chanell, index) {
        if (index <= this.active) {
          // 更新激活频道的索引
          this.$emit('switchChannel', this.active - 1)
        }
        this.channels.splice(index, 1)

        if (this.user) {
          await deleteChannels(chanell.id)
        } else {
          setItem('user-channels', this.channels)
        }
      },
      switchChannel(index) {
        //   跳转到对应的频道
        this.$emit('switchChannel', index)
        //    关闭弹出层
        this.$emit('close')
      },
    },
  }
</script>

<style lang="less" scoped>
  .channel-edit {
    padding-top: 54px;
    .title {
      font-size: 16px;
      color: #333;
    }
  }
  .grid-item {
    width: 80px;
    height: 43px;
  }
  /deep/ .van-grid-item__content--center {
    background-color: #f4f5f6;

    .van-button__content {
      width: 61px;
      height: 34px;
    }
  }
  /deep/ .van-grid-item_text {
    font-size: 14px;
    color: #222;
    margin-top: 0;
  }

  /deep/ .van-grid-item__icon + .van-grid-item__text {
    margin-top: 0;
  }
  /deep/ .van-grid-item__icon {
    font-size: 20px;
    position: absolute;
    right: -5px;
    top: -5px;
    color: #ccc;
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
</style>
