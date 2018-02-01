<template>
    <div :class='[cls]' >
        <slot name='before'></slot>
        <div class="text"><slot></slot></div>
        <slot name='after'></slot>        
    </div>
</template>

<script>
export default {
  props: {
    line: { default: "none", type: String },
    type: { defaule: "title", type: String },
    size: { defaule: "middle", type: String }
  },
  computed: {
    cls: function() {
      var cls = ["line-box"];
      cls.push(`line-box-${this.type}`);
      cls.push(`line-box-${this.size}`);

      switch (this.line) {
        case "both":
          cls.push("line-top");
          cls.push("line-bottom");
          break;
        case "top":
          cls.push("line-top");
          break;
        case "bottom":
          cls.push("line-bottom");
          break;
      }
      return cls;
    }
  }
};
</script>


<style lang="scss" scoped>
.line-box {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  line-height: 80px;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
}
.line-box-title {
  align-items: center;
}
.line-box-text {
  text-align: left;
}
.line-box-big {
  font-weight: 800;
  font-size: 36px;
}
.line-box-middle {
  font-weight: 800;
  font-size: 32px;
}
.line-box-small {
  font-weight: 400;
  font-size: 28px;
}
.line-top:before {
  content: "";
  height: 1px;
  width: 100%;
  background: #888;
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleY(0.5);
}
.line-bottom:after {
  content: "";
  height: 1px;
  width: 100%;
  background: #888;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: scaleY(0.5);
}
</style>
