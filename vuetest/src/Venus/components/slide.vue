<template>
    <div class="v-slide">
        <div class="slide-box" ref='box'>
            <div class="slide-pannel" ref='item'>
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
      timeout: ""
    };
  },
  methods: {
    init() {
      this.setWidth(this.$refs.item, this.windowWidth * this.length);
      this.setWidth(this.$refs.item.children, this.windowWidth);
      this.distance = this.distanceCopy = -this.windowWidth;
      this.animation(-this.windowWidth);
      this.$refs.item.addEventListener("touchstart", this.touchstart);
      this.$refs.item.addEventListener("transitionend", this.transitionend);
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
    getWidth(dom) {
      return dom.clientWidth;
    },
    transitionend(evt) {
      if (this.index <= 0 || this.index >= this.length - 1) {
        console.log("animationend");
        this.looping();
      }
      this.index = -parseInt(this.distance / this.windowWidth);
      //回传给父组件 当前index值 用于父组件获取事件
      console.log(`第${this.index}个`, this.distanceCopy);
    },

    touchstart(evt) {
      this.end.endX = evt.changedTouches[0].clientX;
      clearTimeout(this.timeout);
      this.timeout = "";
      this.$refs.item.addEventListener("touchmove", this.touchmove);
      evt && evt.preventDefault() && evt.stopPropagation();
    },
    touchend(evt) {
      //负责校对位置
      console.log("end");
      this.$refs.item.removeEventListener("touchmove", this.touchmove);
      if (!this.timeout) {
        this.hack(this.distance);
      } else {
        this.distanceCopy = this.distance;
      }
      this.index = -parseInt(this.distance / this.windowWidth);
      evt && evt.preventDefault() && evt.stopPropagation();
      this.createTimeout(3000);
    },
    touchmove(evt) {
      console.log("move");
      evt && evt.preventDefault() && evt.stopPropagation();
      this.$refs.item.addEventListener("touchend", this.touchend);
      // 老规矩  负责移动动画
      this.start.startX = this.end.endX;
      this.end.endX = evt.changedTouches[0].clientX;
      this.distance += this.end.endX - this.start.startX;
      if (this.over(evt.changedTouches[0].clientX, this.$refs.box)) {
        this.$refs.item.removeEventListener("touchend", this.touchend);
        this.touchend();
      } else {
        this.animation(this.distance);
      }
    },
    animation(distance, time) {
      console.log("animation");
      const $item = this.$refs.item;
      this.distance = distance;
      console.log(this.distance);
      $item.style.transform = `translateX(${distance}px)`;
      $item.style.transitionProperty = `transform`;
      $item.style.transitionTimingFunction = `cubic-bezier(0.165, 0.84, 0.44, 1)`;
      if (time === undefined || time === null) {
        $item.style.transitionDuration = ``;
      } else {
        $item.style.transitionDuration = `${time}s`;
      }
      // this.distanceCopy = this.distance;
    },
    over(x, dom) {
      //判断是否出界
      console.log("over");
      const width = dom.offsetWidth;
      const leftBorder = dom.offsetLeft;
      const rightBorder = width + leftBorder;
      return x < leftBorder || x > rightBorder;
    },
    looping(offset = 0) {
      // 负责将出界的滑动 重新定位到对应的index上
      if (this.index <= 0) {
        console.log("左划出界,即将开始修正");
        this.animation((-this.windowWidth + offset) * 3, 0);
        this.distanceCopy = this.distance;
      }
      if (this.index >= this.length - 1) {
        this.animation((-this.windowWidth + offset) * 1, 0);
        this.distanceCopy = this.distance;
        console.log("右划出界,即将开始修正");
      }
    },
    //修改左右滑的判断逻辑   根据distance的增长值判断
    hack(distance) {
      console.log("hack");
      if (distance > this.distanceCopy) {
        this.matchDistance(0.3, "left");
        console.log("左滑");
      } else {
        this.matchDistance(0.3, "right");
        console.log("右滑");
      }
      this.distanceCopy = this.distance;
    },
    matchDistance(basic, fangxiang) {
      console.log("match");
      const P = fangxiang === "right" ? -1 : 1;
      if (
        this.distance - this.distanceCopy >
        this.windowWidth * (basic + this.index - 1)
      ) {
        this.distance = this.distanceCopy + P * this.windowWidth;
        this.animation(this.distance, 0.2);
        console.log("正常右滑");
      } else if (
        (this.distanceCopy - this.distance) * P <
        -(this.windowWidth * basic)
      ) {
        console.log(this.distanceCopy, P * this.windowWidth, "copy");
        this.distance = this.distanceCopy + P * this.windowWidth;
        this.animation(this.distance, 0.2);
        console.log("正常左滑");
      } else {
        this.distance = this.distanceCopy;
        this.animation(this.distance, 0.2);
      }
    },
    pageIsOnLooking() {
      var hiddenProperty =
        "hidden" in document
          ? "hidden"
          : "webkitHidden" in document
            ? "webkitHidden"
            : "mozHidden" in document ? "mozHidden" : null;
      var visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        "visibilitychange"
      );
      var onVisibilityChange = () => {
        if (!document[hiddenProperty]) {
          //页面切换回来了
          this.createTimeout(3000);
        } else {
          clearTimeout(this.timeout);
          //页面切走了
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },
    createTimeout(time) {
      const animaTime = 1;
      this.$refs.item.removeEventListener("touchmove", this.touchmove);
      this.$refs.item.removeEventListener("touchend", this.touchend);
      this.timeout = setTimeout(() => {
        this.animation(this.distance - this.windowWidth, animaTime);
        this.touchend();
        clearTimeout(this.timeout);
        this.createTimeout(3000);
      }, time);
    }
  },
  //开发日志
  /*
   @@@@@@@@ 功能列表 @@@@@@@@

  ------------------

   参数  data 图片地址
   组件捕获点击事件后向上传递  父组件判断事件并执行
   图片绑定的方法
   图片大小根据叶面宽度保持100%页面宽度
   autoplay 是否支持自动播放
   是否有选择器
   一定循环播放
  ------------------

   ((((((Venus))))))

  ------------------
    2.11 beta3 解决循环出界问题  准备添加autoloop功能

    2.22 beta4 准备添加autoloop功能
    beta5 动态控制轮播元素
    beta6 解决item事件在父组件中的监听问题
    *********额外的函数 新建一个单例定时器  remove掉所有的触发事件  固定移动到相应的distance 
    （使用animation）  touchstart中移除定时器  touchend后自动触发
    定时器
    *********监听data数据 
    *********
  ------------------
  */
  props: {},
  created() {},
  mounted() {
    this.windowWidth = this.$refs.box.clientWidth;
    this.length = this.$refs.item.children.length; //改成 props中data的长度
    this.init();
    this.createTimeout(3000);
    this.pageIsOnLooking();
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
.v-slide {
  padding: 0 40px;
}

.slide-pannel {
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

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
