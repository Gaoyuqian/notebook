<template>
   <div class="v-picker-body" @touchend.stop='touchend' @touchstart.stop='touchstart' @touchmove.stop='touchmove'>
      <div class="content">1</div>
      <div class="content">2</div>
      <div class="content">3</div>
      <div class="content">4</div>
      <div class="content">5</div>
      <div class="content">6</div>
    </div>
</template>
<style lang="scss" scoped>
.v-picker-body {
  width: 100%;
  height: 420px;
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
.content {
  font-size: 40px;
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
  height: 80px;
  border-bottom: 1px solid #999;
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
      selectIndex: 0,
      partHeight: 0
    };
  },
  props: {
    part: {
      boolean: String || Number,
      default: 6
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
      if (!this.partHeight) {
        this.partHeight = this.$el.clientHeight / parseInt(this.part);
      }
      for (var i of this.bodyEle) {
        i.style.height = `${this.partHeight}px`;
      }
      console.log(this.partHeight, this.$el.clientHeight);
      this.lastDistance = this.$el.clientHeight / 2;
      const lock = async () => {
        await this.animated();
      };
      lock();
    }, 0);
  },
  methods: {
    touchstart: function(evt) {
      this.startPoint.x = evt.changedTouches[0].clientX;
      this.startPoint.y = evt.changedTouches[0].clientY;
      // this.$el.style.transition = "transform 0.16s";
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
      if (this.totalDistance >= this.$el.clientHeight / 2) {
        //超出上限
        this.totalDistance = this.lastDistance = this.$el.clientHeight / 2;
        console.log(
          true,
          this.totalDistance,
          this.lastDistance,
          this.$el.clientHeight / 2
        );
      } else if (
        this.totalDistance <=
        this.$el.clientHeight / 2 - this.$el.scrollHeight
      ) {
        //超出下限
        this.totalDistance = this.lastDistance =
          this.$el.clientHeight / 2 - this.$el.scrollHeight + this.partHeight;
      } else {
        //判断在哪个节点
        this.lastDistance += this.distance;
      }

      //最后校准
      this.selectIndex = Math.round(
        Math.abs(
          (this.totalDistance - this.$el.clientHeight / 2) / this.partHeight
        )
      );
      this.totalDistance =
        -this.selectIndex * this.partHeight + this.$el.clientHeight / 2;
      console.log(
        this.totalDistance,
        this.selectIndex,
        this.partHeight,
        this.$el.clientHeight / 2
      );
      this.$el.style.transform = `translateY(${this.totalDistance}px)`;
      this.$el.style.transition = "transform 0.16s";
      this.distance = 0;
      evt.preventDefault();
    },
    animated: function(type) {
      //上是false 下是true
      //每个块的高度是 35px
      this.totalDistance = this.distance + this.lastDistance;
      this.$el.style.transform = `translateY(${this.totalDistance}px)`;
      /*
        0.将接收一个数组，作为滑动的数据源。
        1.初始化状态时，第一个元素应该位于整个body的中间部分，也就是会有一个默认的translateY,ok
        2.滑动的时候，会有一个滑动界限，也就是如果超出这个界限，将停止滑动,ok
        3.滑动时以块为单位,ok  其中6暂时可以不改，应改为 可控的数量
        4.惯性滑动 浏览器会自己解决 通过触发多次touch事件解决
        5.选择后记录当前位置？方便下次初始化时，定位到上次滑动的位置。在touchend时计算当前选中目标
        6.类圆筒型
      */
    }
  }
};
</script>
