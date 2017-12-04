<template>
  <!-- <div class='v-picker-box'> -->
    <transition name='silder'>
      <div v-if='showcopy' class="v-picker-container">  
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
      showcopy: this.show
    };
  },
  components: { pickbody },
  props: {
    data: { default: "" },
    show: { type: Boolean }
  },
  methods: {
    defaultEvent: function(evt) {
      evt.preventDefault();
    },
    submitData: function() {
      for (let i of this.data) {
        this.dataBack.push(i.data[i.default]);
        console.log(i.data[i.default], i.default);
      }
      this.showcopy = false;
      this.$emit("input", this.dataBack);
      this.dataBack = [];
    }
  },
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
