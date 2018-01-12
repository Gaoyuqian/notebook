<template>
  <popup ref='popup'>
    <div class="v-date-picker-main">
        <div class="v-date-picker-relative">
            <div class="v-date-picker-title">
                <div class="v-cancel">取消</div>
                <div class="v-submit" @click='submit'>完成</div>
            </div>
            <div class="box">
               <pickerbody :data='data'></pickerbody>       
              <pickerbody :data='data'></pickerbody>   
            </div>
            <!-- <div class="v-date-picker-body">
              <div class="v-date-picker-box" @touchstart.stop='touchstart' @touchmove.stop='touchmove' @touchend.stop='touchend'>
              <div class="v-date-picker-line"></div>    
              <div class="v-date-picker-mask"></div>     -->                                  
              <!-- </div>             -->
            <!-- </div> -->
        </div>  
    </div>
  </popup>
</template>
<script>
import popup from "../popup";
import pickerbody from "./datepickerbody";
export default {
  //拿到type之后 生成数据
  methods: {
    touchstart(evt) {
      /* 获取事件起点 */
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      this.path = document.querySelector(".v-date-picker-scroll");
      this.scrollLock = false;
      evt.preventDefault();
    },
    touchmove(evt) {
      /* 获取事件终点 */
      this.startPoint.x = this.endPoint.x;
      this.startPoint.y = this.endPoint.y;
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      /* 获取事件距离 */
      if (this.overBorder(this.distance).position == "none") {
        this.distance += this.endPoint.y - this.startPoint.y;
      }
      /* 根据距离计算相对垂直位移 */
      this.animation(this.animateTime);
    },
    touchend(evt) {
      /* 主要用来校对 */
      if (this.overBorder(this.distance).position != "none") {
        this.distance = this.overBorder(this.distance).val;
      }
      this.moveTrim();
      this.animation(this.animateTime);
    },

    submit() {
      const reData = {
        index: Math.abs(this.distance) / this.Iheight,
        num: Math.abs(this.distance) / this.Iheight + 1
        // text:    /* arr[index] */
      };
      console.log(reData);
      this.$refs.popup.close();
    },
    overBorder(distance) {
      if (distance >= this.Iheight) {
        return { val: 0, position: "up" };
      } else if (distance <= -this.Cheight) {
        return { val: -this.Cheight + this.Iheight, position: "down" };
      }
      return { val: distance, position: "none" };
    },
    // end微调函数
    animation(time) {
      this.path.style.transform = `translateY(${this.distance}px)`;
      this.path.style.transition = `all ${time}s`;
    },
    moveTrim() {
      // 没停留在点上要移动到附近的点上
      const dis = Math.abs(this.distance);
      if (dis % this.Iheight != 0) {
        //没在点上
        const YS = dis % this.Iheight;
        this.distance =
          YS < this.Iheight / 2
            ? -(dis - dis % this.Iheight)
            : -(dis + (this.Iheight - dis % this.Iheight));
      }
    },
    setData() {}
  },
  data() {
    return {
      path: "",
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      distance: 0,
      scrollLock: false,
      animateTime: 0.16,
      Client: "",
      Cheight: "",
      Iheight: "",
      data: []
    };
  },
  watch: {
    show(newVal) {
      this.$refs.popup.show();
    }
  },
  mounted() {
    console.log(this.type);
    this.popup = !this.popup ? this.$refs.popup : this.popup;
  },
  props: {
    type: { type: String },
    show: { default: "" },
    part: {
      default: 5
    }
  },
  components: { popup, pickerbody }
};
</script>
<style lang="scss" scoped>
.v-date-picker-main {
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  .v-date-picker-relative {
    position: relative;
    padding-top: 100px;
  }
  .v-date-picker-body-box {
    width: 100%;
    display: flex;
  }
  .v-date-picker-line {
    width: 100%;
    height: 80px;
    // border-top: 1px solid #000;
    // border-bottom: 1px solid #000;
    background: rgba(2, 2, 2, 0.2);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    z-index: 100;
  }
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // .v-date-picker-body {
  //   padding: 60px 0;
  //   box-sizing: border-box;
  //   .v-date-picker-box {
  //     position: relative;
  //     height: 360px;
  //     overflow: hidden;
  //     .v-date-picker-mask {
  //       z-index: 100;
  //       background: linear-gradient(
  //         to bottom,
  //         rgba(255, 255, 255, 1),
  //         rgba(255, 255, 255, 0),
  //         rgba(255, 255, 255, 1)
  //       );
  //       width: 100%;
  //       height: inherit;
  //       position: absolute;
  //       top: 0;
  //       left: 0;
  //     }
  //   }
  // }
  .v-date-picker-title {
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
    height: 100px;
    border-bottom: 1px solid #999;
    font-weight: 800;
    color: red;
  }
}
</style>