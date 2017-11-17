<template>
  <div class="main-content-zc">
      <div class="zc-model">
        <div class="model-title">登录</div>
        <div class="model-body">
          <input type="text" v-model='username' class="username" placeholder="请填写用户名">
          <input type="text" v-model='pwb' class="pwb" placeholder="请填写密码">
        </div>
        <div class="model-btn" @click="zhuce">确定</div>
        <div class="model-tishi">***你得先注册再登录哦，不注册是用不了的***</div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      pwb: ""
    };
  },
  methods: {
    zhuce: function() {
      const aaa = { username: this.username, pwb: this.pwb };
      this.$http.post("http://127.0.0.1:9999/login", aaa).then(res => {
        res.body.resCode === "0"
          ? (() => {
              alert(res.body.resMsg);
              sessionStorage.setItem("username", this.username);
              this.$router.push("/index/today");
            })()
          : (() => {
              alert(res.body.resMsg);
            })();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-content-zc {
  width: 100%;
  height: 100%;
  .model-tishi {
    color: #888;
    font-size: 24px;
    margin-top: 20px;
    text-align: left;
  }
  .zc-model {
    box-sizing: border-box;
    padding: 30px;
    position: absolute;
    top: 30%;
    transform: translate(0, -50%);
    width: 100%;
  }

  .model-title {
    font-size: 60px;
  }
  .model-body {
    box-sizing: border-box;
  }
  .username,
  .pwb {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 20px 0;
    height: 80px;
    color: grey;
    border-bottom: 1px solid grey;
    border-radius: 0;
  }
  .model-btn {
    background: #ff5700;
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #ffffff;
    border-radius: 20px;
  }
}
</style>

