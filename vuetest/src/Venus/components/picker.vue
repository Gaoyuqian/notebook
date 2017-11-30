<template>
  <div class='v-picker-box' @touchend.stop='defaultEvent' @touchstart.stop='defaultEvent' @touchmove.stop='defaultEvent'>
      <div class="v-picker-container">  
        <div class="v-picker-relative">
          <div class="v-picker-sign"></div>
          <div class="v-picker-title">
            <div class="v-picker-cancel">取消</div>
            <div class="v-picker-submit">完成</div>
          </div>
          <div class="v-pick-body-box">
            <bodyaaa></bodyaaa>
            <bodyaaa></bodyaaa>          
          </div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.v-pick-body-box {
  width: 100%;
  display: flex;
}
.v-picker-sign {
  width: 100%;
  height: 70px;
  background: #888;
  opacity: 0.7;
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(0, 50%);
}
.v-picker-relative {
  position: relative;
  padding-top: 80px;
}
.v-picker-box {
  width: 100%;
  height: 500px;
  position: relative;
  bottom: 0;
  left: 0;
}
.v-picker-container {
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.v-picker-title {
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #fff;
  border-top: 1px solid #999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #999;
}
</style>
<script>
import bodyaaa from "../components/pickerbody";
export default {
  data() {
    return {};
  },
  components: { bodyaaa },
  props: {},
  methods: {
    defaultEvent: function(evt) {
      evt.preventDefault();
    }
  },
  mounted() {}
};
</script>
