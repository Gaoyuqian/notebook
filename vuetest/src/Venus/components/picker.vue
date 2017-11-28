<template>
  <div class='v-picker-box'>
      <div class="v-picker-container">  
        <div class="v-picker-title">
            <div class="v-picker-cancel">取消</div>
            <div class="v-picker-submit">完成</div>
        </div>
        <div class="v-picker-body">
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>
            <div class="content">哈哈啊哈</div>            
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.v-picker-body {
  overflow-y: scroll;
}
.v-picker-box {
  width: 100%;
  height: 500px;
  position: relative;
  bottom: 0;
  left: 0;
}
.v-picker-container {
  background: red;
  width: 100%;
  height: 500px;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
}
.v-picker-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #fff;
  border-top: 1px solid #999;
  position: relative;
  top: 0;
  left: 0;
}
</style>
<script>
export default {};
</script>
