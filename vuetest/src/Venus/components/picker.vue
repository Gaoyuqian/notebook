<template>
  <div class='v-picker-box' @click='click' @touchend.stop='touchend' @touchstart.stop='touchstart' @touchmove.stop='touchmove'>
      <div class="v-picker-container">  
        <div class="v-picker-relative">
          <div class="v-picker-title">
            <div class="v-picker-cancel">取消</div>
            <div class="v-picker-submit">完成</div>
          </div>
          <div class="v-picker-body">
            <div class="content">1</div>
            <div class="content">2</div>
            <div class="content">3</div>
            <div class="content">4</div>
            <div class="content">5</div>
            <div class="content">6</div>
            <div class="content">7</div>
            <div class="content">11</div>
            <div class="content">22</div>
            <div class="content">33</div>
            <div class="content">44</div>
            <div class="content">55</div>
            <div class="content">66</div>
            <div class="content">77</div>
            <div class="content">88</div>
            <div class="content">111</div>
            <div class="content">222</div>
            <div class="content">333</div>
            <div class="content">444</div>
            <div class="content">555</div>
            <div class="content">1</div>            
          </div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.v-picker-body {
  width: 100%;
  height: 420px;
  transform: translateY(-22px);
}
.content {
  margin: 30px 0;
  height: 40px;
}
.v-picker-relative {
  position: relative;
  padding-top: 80px;
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
  background: red;
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
  height: 80px;
}
</style>
<script>
export default {
  data() {
    return {
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      parentsEle: "",
      distance: 0,
      offsetY: 0,
      distance_copy: 0
    };
  },
  mounted() {},
  methods: {
    click: function(evt) {
      // console.log(evt);
    },
    touchstart: function(evt) {
      this.startPoint.x = evt.changedTouches[0].clientX;
      this.startPoint.y = evt.changedTouches[0].clientY;
      evt.preventDefault();
    },
    touchmove: function(evt) {
      console.log(evt);
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      this.distance = parseInt(this.endPoint.y - this.startPoint.y);
      console.log(this.distance);
      this.animated(this.distance > 0 ? true : false);
      evt.preventDefault();
    },
    touchend: function(evt) {
      this.distance_copy += this.distance;
      this.distance = 0;
      console.log(this.distance_copy, this.distance, "123");
    },
    animated: function(type) {
      console.log(type);
      //上是false 下是true
      // 每个块的高度是 35px
      // 获取根节点font-size
      if (!this.parentsEle) {
        this.parentsEle = document.querySelector(".v-picker-body");
      }
      let htmlFontSize = parseInt(
        document.querySelector("html").style.fontSize
      );
      this.offsetY = parseInt(
        this.parentsEle.style.transform.replace(/\(|\)/g, "")
      );
      if (!type) {
        console.log(this.distance_copy, this.distance, "asdfs");
        var totalDistance = this.distance + this.distance_copy;
        this.parentsEle.style.transform = `translateY(${totalDistance}px)`;
      } else {
        var totalDistance = this.distance + this.distance_copy;
        this.parentsEle.style.transform = `translateY(${totalDistance}px)`;
      }
      //判断最大和最小偏移量！！！！！！
    }
  }
};
</script>
