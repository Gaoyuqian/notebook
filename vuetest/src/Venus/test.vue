<template>
<div class='main'>
    <div class='a'>
    <btna @click="clickHandle('小号按钮')" size='half' radius='small'>小号按钮</btna>
    </div>
    <div class='a'>
    <btna @click="clickHandle('大号按钮')" size='full' radius='small'>大号按钮</btna> 
    </div>
    <div class='a'>
    <btna @click="clickHandle('不可用按钮')" disabled size='full' radius='small'>不可用按钮</btna> 
    </div>
    <div class='radius a'>
        <!--单个的radiu 只负责改变v-model的布尔值-->
        <!--应该没有需求会两个按钮同时控制一个变量  已完成目标--> 
        <!-- <radiu class='1' @click="clickHandleRadiu"></radiu> -->
        <radiu v-model='aaa' @click="clickHandleRadiu">{{open}}</radiu>
        <radiu v-model='aaa' @click="clickHandleRadiu">{{open}}</radiu>
    </div>
      <alertInfo canclose ref='alert'></alertInfo>
</div>   
</template>

<script>
import btna from "./components/button";
import radiu from "./components/radiu";
import alertInfo from "./components/alertInfo";

export default {
  components: { btna, radiu, alertInfo },
  data() {
    return {
      aaa: true,
      bbb: false,
      open: "开启蓝牙",
      text: "点击了按钮"
    };
  },
  watch: {
    aaa: function(newVal) {
      this.open = newVal ? "开启蓝牙" : "关闭蓝牙";
      // this.$message({message:this.text,canclose:true});
      this.showAlert(this.open, 10000);
    }
  },
  methods: {
    clickHandle: function(a) {
      this.showAlert(this.text, 1000);
    },
    clickHandleRadiu: function() {
      this.aaa = !this.aaa;
    },
    showAlert: function(text, time) {
      this.$refs.alert.alertShow = true;
      this.$refs.alert.alertInfo = text;
      this.$refs.alert.duringAlert(time);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.a {
  margin: 20px 10px;
}
</style>

