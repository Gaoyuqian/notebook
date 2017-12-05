<template>
   <div class="v-picker-body" @touchend.stop='touchend' @touchstart.stop='touchstart' @touchmove.stop='touchmove'>
      <div class="content" v-for='key in data.data'>{{key}}</div>
    </div>
</template>
<style lang="scss" scoped>
.v-picker-body {
  width: 100%;
  height: 420px;
}
.content {
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>
export default {
  data() {
    return {
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      bodyEle: "",
      distance: 0,
      lastDistance: 0,
      totalDistance: 0,
      selectIndex: 0,
      partHeight: 0
    };
  },
  props: {
    part: {
      default: 6
    },
    default: {},
    data: {}
  },
  mounted() {
    setTimeout(() => {
      if (!this.parentsEle) {
        this.parentsEle = document.querySelectorAll(".v-picker-body");
      }
      if (!this.bodyEle) {
        this.bodyEle = document.querySelectorAll(".content");
      }
      if (!this.partHeight) {
        this.partHeight = this.$el.clientHeight / parseInt(this.part);
      }
      for (var i of this.bodyEle) {
        i.style.height = `${this.partHeight}px`;
      }
      this.lastDistance =
        this.$el.clientHeight / 2 - this.partHeight * (this.data.default || 0);
      const lock = async () => {
        await this.animated();
      };
      lock();
    }, 0);
  },
  methods: {
    getIndex: function(arr, data) {
      return arr.indexOf(data);
    },
    touchstart: function(evt) {
      this.startPoint.x = evt.changedTouches[0].clientX;
      this.startPoint.y = evt.changedTouches[0].clientY;
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
      } else if (
        this.totalDistance <=
        this.$el.clientHeight / 2 - this.$el.scrollHeight + this.partHeight
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
      this.$el.style.transform = `translateY(${this.totalDistance}px)`;
      this.$el.style.transition = "transform 0.16s";
      this.distance = 0;
      this.getData();
      evt.preventDefault();
    },
    getData: function() {
      this.$emit("input", this.selectIndex);
    },
    animated: function(type) {
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
