<template>
  <div class='v-picker-box' @click='click' @touchend.stop='touchend' @touchstart.stop='touchstart' @touchmove.stop='touchmove'>
      <div class="v-picker-container">  
        <div class="v-picker-relative">
          <div class="v-picker-sign"></div>
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
          </div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.v-picker-body {
  width: 100%;
  height: 420px;
  // transition: transform 0.16s;
}
.v-picker-sign {
  width: 100%;
  height: 70px;
  background: #fff;
  opacity: 0.7;
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(0, 50%);
}
.content {
  // margin: 30px 0;
  // height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
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
      bodyEle: "",
      distance: 0,
      // offsetY: 0,
      lastDistance: 0,
      totalDistance: 0,
      selectIndex: 0
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
      // this.parentsEle[0].style.transition = "transform 0.16s";
      evt.preventDefault();
    },
    touchmove: function(evt) {
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      this.distance = parseInt(this.endPoint.y - this.startPoint.y);
      this.animated(this.distance > 0 ? true : false);
      evt.preventDefault();
    },
    touchend: function(evt) {
      if (this.totalDistance >= this.parentsEle[0].clientHeight / 2) {
        //超出上限
        this.totalDistance = this.lastDistance =
          this.parentsEle[0].clientHeight / 2;
      } else if (
        this.totalDistance <=
        this.parentsEle[0].clientHeight / 2 - this.parentsEle[0].scrollHeight
      ) {
        //超出下限
        this.totalDistance = this.lastDistance =
          this.parentsEle[0].clientHeight / 2 -
          this.parentsEle[0].scrollHeight +
          this.parentsEle[0].clientHeight / 6;
      } else {
        //判断在哪个节点
        this.lastDistance += this.distance;
      }

      //最后校准
      this.selectIndex = Math.round(
        Math.abs(
          (this.totalDistance - this.parentsEle[0].clientHeight / 2) /
            (this.parentsEle[0].clientHeight / 6)
        )
      );
      this.totalDistance =
        -this.selectIndex * this.parentsEle[0].clientHeight / 6 +
        this.parentsEle[0].clientHeight / 2;
      this.parentsEle[0].style.transform = `translateY(${this
        .totalDistance}px)`;
      this.parentsEle[0].style.transition = "transform 0.16s";
      this.distance = 0;
      evt.preventDefault();
    },
    animated: function(type) {
      //上是false 下是true
      //每个块的高度是 35px
      this.totalDistance = this.distance + this.lastDistance;
      this.parentsEle[0].style.transform = `translateY(${this
        .totalDistance}px)`;
      /*
        0.将接收一个数组，作为滑动的数据源。
        1.初始化状态时，第一个元素应该位于整个body的中间部分，也就是会有一个默认的translateY,ok
        2.滑动的时候，会有一个滑动界限，也就是如果超出这个界限，将停止滑动,ok
        3.滑动时以块为单位
        4.惯性滑动
        5.选择后记录当前位置？方便下次初始化时，定位到上次滑动的位置。在touchend时计算当前选中目标
      */
    },
    formatRem: function(px) {
      let htmlFontSize = parseInt(
        document.querySelector("html").style.fontSize
      );
      // return px / 20 * htmlFontSize;
      console.log(htmlFontSize, document.querySelector("html").style.fontSize);
    }
  },
  mounted() {
    if (!this.parentsEle) {
      this.parentsEle = document.querySelectorAll(".v-picker-body");
    }
    if (!this.bodyEle) {
      this.bodyEle = document.querySelectorAll(".content");
    }

    setTimeout(() => {
      for (var i of this.bodyEle) {
        i.style.height = `${this.parentsEle[0].clientHeight / 6}px`;
      }
      this.lastDistance = this.parentsEle[0].clientHeight / 2;
      const lock = async () => {
        await this.animated();
      };
      lock();
    }, 0);
  }
};
</script>
