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
        <radiu v-model='aaa' >{{open}}</radiu>
        <!-- <radiu v-model='aaa' @click="clickHandleRadiu">{{open}}</radiu> -->
    </div>
    <!-- input -->
    <div class="a">
      <inputInfo type='tel' label='家庭地址' @focus="clickHandle" v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>
     <div class="a">
      <inputInfo type='num'  options label='家庭地址' v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>
      <div class="a">
      <inputInfo type='num' label='家庭地址' v-model='textinfo' placeholder='请输入' underline begin='right' ></inputInfo>
    </div>
      <picker :show='ccc' :data='pickertest' v-model='pickerdata'></picker>
        <model v-model='modelShow' marginTop='20'>
            <btna @click="clickHandle('大号按钮')" size='full' radius='small'>大号按钮</btna>    
            <div slot='footer'>
              <btna @click="clickHandle('大号按钮')" size='mini' inline radius='small'>确定</btna>     
              <btna @click="clickHandle('大号按钮')" size='mini' inline radius='small'>取消</btna>                                      
            </div>                        
        </model>
    <!--picker 返回的时候 model和data均已修改 default为索引值 可以根据索引从data中获取对应返回值 pickerdata为返回具体值的数组-->
</div>   
</template>

<script>
import btna from "./components/button";
import radiu from "./components/radiu";
import alertInfo from "./components/alertInfo";
import inputInfo from "./components/input";
import message from "./components/message";
import picker from "./components/picker/picker";
import model from "./components/modelPanel";

export default {
  components: { model, btna, radiu, alertInfo, inputInfo, message, picker },
  data() {
    return {
      aaa: true,
      bbb: false,
      open: "开启蓝牙",
      text: "点击了按钮",
      textinfo: "sadfas",
      ccc: { show: false },
      modelShow: false,
      pickertest: [
        {
          data: [
            "新疆",
            "黑龙江",
            "北京",
            "哈哈哈",
            "乌鲁木齐",
            "石家庄",
            "天津",
            "新疆",
            "黑龙江",
            "北京",
            "哈哈哈",
            "乌鲁木齐",
            "石家庄",
            "天津"
          ],
          default: "1"
        },
        { data: ["1", 2, 3, 4, 5, 6, 4, 5, 6, 4, 5, 6], default: "1" },
        { data: ["1", 2, 3, 4, 5, 6], default: "1" }
      ],
      pickerdata: ""
    };
  },
  watch: {
    aaa: function(newVal) {
      this.open = newVal ? "开启蓝牙" : "关闭蓝牙";
      this.$alert({ text: this.open, canclose: true });
    },
    pickerdata: function(newVal) {
      console.log(newVal);
    },
    modelShow(newVal) {
      console.log(newVal);
    }
  },
  methods: {
    clickHandle: function(a) {
      // this.ccc.show = !this.ccc.show;
      // this.$message({ text: "消息体", type: "error" });
      this.modelShow = !this.modelShow;
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

