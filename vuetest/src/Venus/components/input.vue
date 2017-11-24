<template>
<div :class='[boxCls]'>
    <label :class='[labCls]' for='v-input' v-if='label'>{{label}}</label>
  <input :class='[cls]' :maxlength="max" :type='type' :value='value' @input='changeValue' :placeholder="placeholder">    
</div>
</template>
<style lang="scss" scoped>
.v-input-box {
  background: #fff;
  display: flex;
  white-space: nowrap;
  align-items: center;
  font-size: 32px;
  .v-input-label {
    padding: 0 10px;
  }
}
.v-input-box-underline {
  border-bottom: 1px solid #000;
}
.v-input {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 0;
  padding-left: 30px;
}
::-webkit-input-placeholder {
  color: #888888;
  cursor: default;
  font-size: 24px;
}
.v-input-right {
  text-align: right;
}
</style>

<script>
//暂不支持前面插入图片吧 以后支持
// 校验考虑支持，下一版在做
export default {
  props: {
    underline: { type: Boolean, default: false },
    begin: { type: String, default: "left" },
    label: { type: String, default: null },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String
    },
    max: {
      type: String,
      default: "50"
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    boxCls() {
      var boxCls = ["v-input-box"];
      this.underline && boxCls.push(`v-input-box-underline`);
      return boxCls;
    },
    cls() {
      var cls = ["v-input"];
      cls.push(`v-input-${this.begin}`);
      return cls;
    },
    labCls() {
      var labCls = ["v-input-label"];
      return labCls;
    }
  },
  methods: {
    changeValue: function(evt) {
      if (this.type === "num") {
        evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      }
      this.$emit("input", evt.target.value);
    }
  }
};
</script>
