<template>
<transition name="fade">
  <div :class='[cls]' v-show='value' @click.stop='close' >
      <div :class='[cls_body]' >
          <slot></slot>
      </div>
  </div>
  </transition>
</template>
<script>
/*
  建议所有子节点的width为100%;或使用组件【
*/
export default {
  computed: {
    cls() {
      var cls = [];
      cls.push("v-model-panel");
      return cls;
    },
    cls_body() {
      var cls_body = [];
      cls_body.push("v-model-body");
      return cls_body;
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
    }
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
    for (let i of this.$el.children[0].children) {
      i.style.marginTop = `${this.marginTop}px`;
      i.style.marginBottom = `${this.marginTop}px`;
    }
    // console.log(this.value);
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    marginTop: {
      default: "10",
      type: String
    }
  }
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
.v-model-panel {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}
.v-model-body {
  background: #fff;
  color: #000;
  padding: 40px;
  width: 80%;
  box-sizing: border-box;
  // border: 1px solid #000;
}
</style>

