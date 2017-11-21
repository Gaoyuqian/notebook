<template>
    <div class='main-content'>
        <div class='banner-div div'>
            <ul class='banner'>
                <li v-for='item in bannerTitle' @click='jumpPage(item)'>{{item}}</li>
            </ul>
        </div>
        <router-view/>
        <div class='footer-div div'>
            <ul class='footer'>
                <li v-for='item in footerTitle' @click='jumpPage(item)'>{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import "animate.css";
export default {
  name: "index",
  data() {
    return {
      bannerTitle: ["今天都干了啥", "记录"],
      footerTitle: ["总统计"]
    };
  },
  mounted() {},
  methods: {
    jumpPage: function(a) {
      const urlObj = {
        记录: "./today",
        今天都干了啥: "./tongji",
        总统计: "./tongjitotal"
      };
      this.$router.push(urlObj[a]);
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  height: 100px;
  position: absolute;
  width: 100%;
}
.main-container {
  padding-top: 100px;
}

.main-container,
.main-content {
  min-width: 100%;
  max-width: 100%;
  min-height: 100%; // position: relative;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
}

.footer-div {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
}

.banner-div {
  z-index: 100;
  position: relative;
  top: 0;
  left: 0;
  min-width: 100%;
  max-width: 100%;
  height: 90px;
}

.banner {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  max-width: 100%;
}

ul {
  background: pink;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  .a {
    flex: 1;
  }
  li {
    flex: 2;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
}
</style>

