<template>
    <div class="main-content-index">
        <div class="enter-zhuce enter" @click='goPage(0)'>注册</div>
        <div class="enter-login enter" @click='goPage(1)'>登录</div>
        <div class="version">version 1.0.0</div>
    </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    // setTimeout(() => {
    //   //启动图
    //   this.$router.push("/index/today");
    // }, 3000);
  },
  methods: {
    goPage: function(type) {
      type === 0 ? this.$router.push("/zhuce") : this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.main-content-index {
  height: 100%;
  width: 100%;
  background: url("../assets/WechatIMG24340.png") no-repeat;
  .version {
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 40px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .enter {
    height: 80px;
    width: 40%;
    background-color: rgba(222, 22, 22, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    color: #fff;
    position: absolute;
    top: 60%;
  }
  .enter-zhuce {
    left: 30px;
  }
  .enter-login {
    right: 30px;
  }
}
</style>

