<template>
<div class='main'>
  <!-- button -->
    <div class='a'>
    <btna @click="clickHandle('小号按钮')" size='half' radius='small'>小号按钮</btna>
    </div>
    <div class='a'>
    <btna @click="clickHandle('大号按钮')" size='full' radius='small'>大号按钮</btna> 
    </div>
    <div class='a'>
    <btna @click="clickHandle('不可用按钮')" disabled size='full' radius='small'>不可用按钮</btna> 
    </div>
    <!-- radio -->
    <div class='radius a'>
        <!--单个的radiu 只负责改变v-model的布尔值-->
        <!--应该没有需求会两个按钮同时控制一个变量  已完成目标--> 
        <!-- <radiu class='1' @click="clickHandleRadiu"></radiu> -->
        <radiu v-model='aaa' @click="clickHandleRadiu">{{open}}</radiu>
        <radiu v-model='aaa' @click="clickHandleRadiu">{{open}}</radiu>
    </div>
    <!-- input -->
    <div class="a">
      <inputInfo type='tel' label='家庭地址' v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>
     <div class="a">
      <inputInfo type='num'  options label='家庭地址' v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>
      <div class="a">
      <inputInfo type='num' label='家庭地址' v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>
       <div class="a">
      <inputInfo type='num' label='家庭地址' v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>  
    <!-- alert -->
      <message :msgShow='aaa'>我是一个消息体</message>
      <alertInfo canclose ref='alert'></alertInfo>
      <picker></picker>
</div>   
</template>

<script>
import btna from "./components/button";
import radiu from "./components/radiu";
import alertInfo from "./components/alertInfo";
import inputInfo from "./components/input";
import message from "./components/message";
import picker from "./components/picker";

export default {
  components: { btna, radiu, alertInfo, inputInfo, message, picker },
  data() {
    return {
      aaa: true,
      bbb: false,
      open: "开启蓝牙",
      text: "点击了按钮",
      textinfo: "sadfas"
    };
  },
  watch: {
    aaa: function(newVal) {
      this.open = newVal ? "开启蓝牙" : "关闭蓝牙";
      // this.showAlert(this.open, 10000);
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
.main {
  // background: rgba(111, 222, 111, 1);
}
</style>

