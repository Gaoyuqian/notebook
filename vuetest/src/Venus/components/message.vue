<template>
<transition name="fade">
<div :class='[cls]' v-if='showFlag'>
    <slot></slot>
</div>
</transition>

</template>
<!-- 通知组件   -->
<script>
export default {
  data() {
    return {
      showFlag: this.msgShow,
      time:'',
    };
  },
  props: {
    msgShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    msgShow: function() {
      this.showFlag = this.msgShow;
      clearTimeout(this.time);
      if (this.showFlag && this.msgShow) {
        this.time = setTimeout(() => {
          this.showFlag = false;
        }, 3000);
      }
    }
  },
  computed: {
    cls: function() {
      var cls = [];
      cls.push("v-msg");
      return cls;
    }
  },
  mounted() {
    if (this.showFlag && this.msgShow) {
       this.time = setTimeout(() => {
        this.showFlag = false;
      }, 3000);
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: top 0.5s;
}
.fade-enter,
.fade-leave-to {
  top: -130px !important;
}
.fade-enter-to,
.fade-leave {
  top: 30px !important;
}
.v-msg {
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 3px skyblue inset;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(255, 255, 255, 0.9);
}
</style>
