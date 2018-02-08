<template>
    <div class="v-slide">
        <div class="slide-box">
            <div class="slide-pannel" ref='item' @touchstart='touchstart' @touchend='touchend' @touchmove='touchmove'>
                <div class="slide-a">ad</div>
                <div class="slide-b">dfs</div>   
                <div class="slide-c">第三瓶</div>     
                <div class="slide-c">第zi瓶</div>                     
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      windowWidth: 0,
      length: 0,
      start: { startX: "", startY: "" },
      end: { endX: "", endY: "" },
      distance: 0,
      distanceCopy: 0,
      index: 1
    };
  },
  methods: {
    init() {
      this.setWidth(this.$refs.item, this.windowWidth * this.length);
      this.setWidth(this.$refs.item.children, this.windowWidth);
    },
    setWidth(dom, width) {
      if (Object.prototype.toString.call(dom) === "[object HTMLDivElement]") {
        dom.style.width = `${width}px`;
      } else {
        for (let i of dom) {
          i.style.width = `${width}px`;
        }
      }
    },
    touchstart(evt) {
      this.end.endX = evt.changedTouches[0].clientX;
      //   console.log(this.start);
    },
    touchend(evt) {
      //负责校对位置
      this.hack(this.distance);
      this.index = -parseInt(this.distance / this.windowWidth) + 1;
      //   console.log(this.index);
    },
    touchmove(evt) {
      // 老规矩  负责移动动画
      this.start.startX = this.end.endX;
      this.end.endX = evt.changedTouches[0].clientX;
      this.distance += this.end.endX - this.start.startX;
      this.animation(this.distance);
    },
    animation(distance, time) {
      //   console.log(distance);
      const $item = this.$refs.item;
      $item.style.transform = `translateX(${this.distance}px)`;
      if (time) {
        $item.style.transition = `all ${time}s`;
      } else {
        $item.style.transition = "";
      }
    },
    //修改左右滑的判断逻辑   根据distance的增长值判断
    hack(distance) {
      //   console.log(distance, this.distanceCopy);
      if (distance > this.distanceCopy) {
        console.log("左滑");
        if (distance > 0) {
          console.log("左划出界");
        } else {
          this.matchDistance(0.3, "left");
          console.log("左花没出界");
        }
        // 向左划 且向左出界了 应该变成最后一个item元素
      } else {
        if (distance < (this.length - 1) * -this.windowWidth) {
          // 出界了 转换到第一个元素
          console.log("又话出界");
        } else {
          this.matchDistance(0.3, "right");
          console.log("又话没出界");
          //向右滑 如果大于临界值 则变成第一个item元素
        }
      }
      this.distanceCopy = this.distance;
    },
    matchDistance(basic, fangxiang) {
      const P = fangxiang === "right" ? -1 : 1;

      //   console.log(
      //     -(this.windowWidth * basic),
      //     (this.distanceCopy - this.distance) * P
      //   );
      if (this.distance * P > this.windowWidth * (basic + this.index - 1)) {
        this.distance = this.distanceCopy + P * this.windowWidth;
        this.animation(this.distance, 0.3);
        console.log("123");
        // 正常又话
      } else if (
        (this.distanceCopy - this.distance) * P <
        -(this.windowWidth * basic)
      ) {
        this.distance = this.distanceCopy + P * this.windowWidth;
        this.animation(this.distance, 0.3);
        console.log("正常左滑");
        //  正常左滑
      } else {
        this.distance = this.distanceCopy;
        this.animation(this.distance, 0.3);
      }
    }
  },
  // 参数  data 图片地址
  // 组件捕获点击事件后向上传递  父组件判断事件并执行
  // 图片绑定的方法
  // 图片大小根据叶面宽度保持100%页面宽度
  // autoplay 是否支持自动播放
  // 是否有选择器
  // 一定循环播放
  props: {},
  created() {
    this.windowWidth = window.outerWidth;
  },
  mounted() {
    this.length = this.$refs.item.children.length;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.v-slide,
.slide-box {
  width: 100%;
  height: 200px;
  position: relative;
  overflow-x: hidden;
}
.slide-pannel {
  height: 100%;
  position: relative;
  .slide-a {
    height: 100%;
    background: red;
    float: left;
  }
  .slide-b {
    height: 100%;
    background: green;
    float: left;
  }
  .slide-c {
    height: 100%;
    background: yellow;
    float: left;
  }
}
</style>
