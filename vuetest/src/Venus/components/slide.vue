<template>
    <div class="v-slide">
        <div class="slide-box">
            <div class="slide-pannel" ref='item' @touchstart.stop='touchstart' @touchend.stop='touchend' @touchmove.stop='touchmove'>
                <div class="slide-c">第三瓶</div>                 
                <div class="slide-a">ad</div>
                <div class="slide-b">dfs</div>   
                <div class="slide-c">第三瓶</div> 
                <div class="slide-a">ad</div>                    
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
      index: 1,
      moveLock: false
    };
  },
  methods: {
    init() {
      this.setWidth(this.$refs.item, this.windowWidth * this.length);
      this.setWidth(this.$refs.item.children, this.windowWidth);
      this.distance = this.distanceCopy = -this.windowWidth;
      this.animation(-this.windowWidth);
      this.$refs.item.addEventListener("transitionend", e => {
        if (this.index === 0 || this.index === this.length - 1) {
          this.moveLock = true;
          this.looping();
        }
        this.moveLock = false;
      });
    },

    /*
        主要问题

        当上一个translate未结束时 进行了下一次滑动 则出界了
    
    */
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
      evt.preventDefault();
      this.end.endX = evt.changedTouches[0].clientX;
      //   console.log(this.start);
    },
    touchend(evt) {
      //负责校对位置
      this.hack(this.distance);
      this.index = -parseInt(this.distance / this.windowWidth);
      console.log(`第${this.index}个`);
      evt.preventDefault();
    },
    touchmove(evt) {
      if (this.moveLock) {
        return;
      }
      //   console.log(evt);
      // 老规矩  负责移动动画
      this.start.startX = this.end.endX;
      this.end.endX = evt.changedTouches[0].clientX;
      this.distance += this.end.endX - this.start.startX;
      //   this.outdoor();
      this.animation(this.distance);
      //   if (Math.abs(this.distance) >= this.windowWidth) {
      //     return;
      //   }
      evt.preventDefault();
    },
    animation(distance, time) {
      const $item = this.$refs.item;
      this.distance = distance;
      $item.style.transform = `translateX(${distance}px)`;
      if (time === undefined || time === null) {
        $item.style.transition = ``;
      } else {
        $item.style.transition = `all ${time}s`;
      }
    },
    looping(offset = 0) {
      // 负责将出界的滑动 重新定位到对应的index上
      if (this.index === 0) {
        console.log("左划出界,即将开始修正");
        this.animation((-this.windowWidth + offset) * 3, 0);
        this.distanceCopy = this.distance;
      }
      if (this.index === this.length - 1) {
        this.animation((-this.windowWidth + offset) * 1, 0);
        this.distanceCopy = this.distance;
        console.log("右划出界,即将开始修正");
      }
    },
    //修改左右滑的判断逻辑   根据distance的增长值判断
    // outdoor() {
    //   if (
    //     this.distance > 0 ||
    //     this.distance < (this.length - 1) * -this.windowWidth
    //   ) {
    //     this.moveLock = true;
    //     this.looping(this.distance % (this.index * this.windowWidth));
    //   }
    // },
    hack(distance) {
      //   console.log(distance, this.distanceCopy);
      if (distance > this.distanceCopy) {
        console.log("左滑");
        if (distance > 0) {
          console.log("左划出界");
          //   this.moveLock = true;
          //   this.looping(this.distance % (this.index * this.windowWidth));
        } else {
          this.matchDistance(0.3, "left");
          console.log("左花没出界");
        }
        // 向左划 且向左出界了 应该变成最后一个item元素
      } else {
        if (distance < (this.length - 1) * -this.windowWidth) {
          // 出界了 转换到第一个元素
          //   this.moveLock = true;
          //   console.log(this.distance, this.index);
          //   this.looping(this.distance % (this.index * this.windowWidth));
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
      if (this.distance * P > this.windowWidth * (basic + this.index - 1)) {
        this.distance = this.distanceCopy + P * this.windowWidth;
        this.animation(this.distance, 0.3);
        // 正常又话
        console.log("正常又话");
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
    this.windowWidth = window.innerWidth;
  },
  mounted() {
    this.length = this.$refs.item.children.length; //改成 props中data的长度
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
  overflow: hidden;

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
