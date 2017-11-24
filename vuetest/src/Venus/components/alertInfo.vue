<template>
<transition name="fade">
<div class='v-alert-box' v-if='alertShow'>
    <div class='v-alert-mask'  @click='stopClick'></div>
    <div class='v-alert-main' @click='closeAlert' >
       <div class='v-alert-image'></div>
       <div class='v-alert-text'>{{alertInfo}}</div>
    </div>
</div>
</transition>
</template>
<script>
export default {
  props: {
    canclose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      alertInfo: { type: String },
      alertShow: false
    };
  },
  methods: {
    closeAlert: function() {
      if (this.canclose) {
        this.duringAlert(0);
      }
    },
    stopClick: function(e) {
      e.stopPropagation();
    },
    duringAlert: function(time) {
      time && clearTimeout(time);
      var time = setTimeout(() => {
        this.alertShow = false;
        this.alertInfo = "";
      }, time);
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.v-alert-box {
  .v-alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.v-alert-main {
  position: absolute;
  background: rgba(8, 8, 8, 0.6);
  text-align: center;
  width: 80%;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  padding: 0 20px;
}
.v-alert-text {
  color: #fff;
  margin-bottom: 20px;
  overflow-wrap: wrap;
}
.v-alert-image {
  background: url("../images/icon_attention.png");
  background-size: contain;
  display: inline-block;
  height: 3rem;
  width: 3rem;
  position: relative;
  margin: 20px 0;
}
</style>

