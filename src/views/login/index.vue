<template>
  <div>
    <!-- navbar导航栏开始 -->
    <van-nav-bar
      title="注册 / 登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- navbar导航栏结束 -->

    <!-- 手机号验证码区域开始 -->
    <van-form
      @submit="onLogin"
      validate-first
      :show-error-message="false"
      :show-error="false"
      @failed="onFailed"
      ref="form"
    >
      <van-field
        icon-prefix="icon"
        v-model="user.mobile"
        class="iconfont"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="form.mobile"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        class="iconfont"
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="form.code"
        name="code"
      >
        <template #button>
          <van-count-down
            v-if="isShow"
            :time="1000 * 60"
            @finish="isShow = false"
            format="ss s"
          />
          <van-button
            v-else
            class="send"
            size="small"
            type="info"
            round
            plain
            @click.prevent="onSendCode"
            :loading="isSendLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div class="login_btn_wrap">
        <van-button type="info" block class="login_btn">登录</van-button>
      </div>
    </van-form>
    <!-- 手机号验证码区域结束 -->
  </div>
</template>

<script>
  import { login } from '@/api/user'
  export default {
    name: 'login',
    components: {},
    props: {},
    data() {
      return {
        user: {
          mobile: '13911111111', //手机号 13611111111   17090086870 13911111111
          code: '', //验证码 246810
        },
        form: {
          mobile: [
            { required: true, message: '手机号不能为空' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' },
          ],
          code: [
            { required: true, message: '请输入验证码' },
            { pattern: /^\d{6}$/, message: '请输入6位验证码' },
          ],
        },
        isShow: false,
        isSendLoading: false,
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async onLogin() {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        })
        try {
          // const { data: res } = await this.$http.post(
          //   '/app/v1_0/authorizations',
          //   this.user
          // )
          const { data: res } = await login(this.user)
          console.log(res)
          this.$store.commit('setUser', res.data)
          this.$toast.success('登录成功!')
          this.$router.back()
        } catch (err) {
          console.log(err)
          this.$toast.fail('登录失败,手机号或验证码错误!')
        }
      },
      onFailed(err) {
        console.log(err)
        if (err.errors[0]) {
          this.$toast({
            message: err.errors[0].message,
            position: top,
          })
        }
      },
      async onSendCode() {
        try {
          this.isSendLoading = true
          await this.$refs.form.validate('mobile')
          const res = await this.$http.get(
            `/app/v1_0/sms/codes/${this.user.mobile}`
          )
          console.log(res)
          this.isShow = true
        } catch (err) {
          console.dir(err)
          let message = ''
          if (err && err.response && err.response.status === 429) {
            message = '发送太频繁了,请稍后重试'
          } else if (err.name === 'mobile') {
            message = err.message
          } else {
            message = '发送失败,请稍后重试'
          }
          // console.log(err)
          this.$toast({
            message: message,
            position: top,
          })
        }
        this.isSendLoading = false
      },
    },
  }
</script>

<style lang="less" scoped>
  .send {
    width: 78px;
    height: 23px;
  }
  .login_btn_wrap {
    padding: 27px 17px;
    .login_btn {
      background-color: #6db4fb;
      border: none;
    }
  }
</style>
