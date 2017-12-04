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
      <picker :show='ccc' :data='pickertest' v-model='pickerdata'></picker>
      <!-- 希望获得的default为索引值 -->
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
      textinfo: "sadfas",
      ccc: false,
      pickertest: [
        { data: ["1", "哈哈哈", 3, 4, 5, 6], default: "1" },
        { data: ["1", 2, 3, 4, 5, 6, 4, 5, 6, 4, 5, 6], default: "1" },
        { data: ["1", 2, 3, 4, 5, 6], default: "1" }
      ],
      pickerdata: ""
    };
  },
  watch: {
    aaa: function(newVal) {
      this.open = newVal ? "开启蓝牙" : "关闭蓝牙";
      this.$alert({ alertInfo: this.open, canclose: true });
    },
    pickerdata: function(newVal) {
      console.log(newVal);
    }
  },
  methods: {
    clickHandle: function(a) {
      this.ccc = !this.ccc;
      this.$message({ text: "这是消息体", type: "warn" });
    },
    clickHandleRadiu: function() {
      this.aaa = !this.aaa;
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
}
</style>

