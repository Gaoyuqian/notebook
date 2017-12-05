<template>
  <!-- <div class='v-picker-box'> -->
    <transition name='silder'>
      <div v-if='show.show' class="v-picker-container">  
        <div class="v-picker-relative">
          <div class="v-picker-sign"></div>
          <div class="v-picker-title">
            <div class="v-picker-cancel">取消</div>
            <div class="v-picker-submit" @click='submitData()'>完成</div>
          </div>
          <div class="v-pick-body-box">
            <pickbody v-for='key in data' :data='key' v-model='key.default' :key='keys'></pickbody>
            <!-- 最好传一个对象，次一点传一个数组，也可以传一个字符串，我们会对字符串进行处理，并看成单一的index 条件     -->
            <!-- 两种picker 一种联动picker 一种datepicker 目前属于datepicker -->
          </div>
        </div>
    </div>
  </transition>    
  <!-- </div> -->
</template>
<script>
import pickbody from "../components/pickerbody";
export default {
  data() {
    return {
      keys: "1",
      dataBack: [],
    };
  },
  components: { pickbody },
  props: {
    data: { default: "" },
    show: { default: "" }
  },
  //pick的显隐问题
  //联动picker 可以使用全局方法来保证显隐性
  //datepicker会增加一个 组件内部的触发方式，暴露给用户的则只有一个触发按钮和数据承载框。
  //picker能不能做成和datepicker一样的触发方式 让用户使用自己的点击按钮进行触发
  //  无法改单一的变量，但是可以改对象内部的变量！
  methods: {
    defaultEvent: function(evt) {
      evt.preventDefault();
    },
    submitData: function() {
      for (let i of this.data) {
        this.dataBack.push(i.data[i.default]);
      }
      this.show.show = false;
      this.$emit("input", this.dataBack);
      this.dataBack = [];
    }
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.silder-enter-active,
.silder-leave-active {
  transition: bottom 1.5s;
}
.silder-enter,
.silder-leave-to {
  bottom: -500px !important;
}
.silder-enter-to,
.silder-leave {
  bottom: 0px !important;
}
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
  padding-top: 70px;
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
  height: 70px;
  border-bottom: 1px solid #999;
}
</style>
