<template>
  <popup ref='popup'>
    <div class="v-date-picker-main">
        <div class="v-date-picker-relative">
            <div class="v-date-picker-title">
                <div class="v-cancel">取消</div>
                <div class="v-submit">完成</div>
            </div>
            <div class="v-date-picker-body">
              <div class="v-date-picker-box" @touchstart.stop='touchstart' @touchmove.stop='touchmove' @touchend.stop='touchend'>
              <div class="v-date-picker-line"></div>    
              <div class="v-date-picker-mask"></div>                                        
                <div class="v-date-picker-scroll">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>到大地方撒1</div>
                  <div>到大地方撒2</div>
                  <div>到大地方撒3</div>
                  <div>到大地方撒4</div>
                  <div>到大地方撒5</div>                  
                </div>  
              </div>            
            </div>
        </div>  
    </div>
  </popup>
</template>
<script>
import popup from "../popup";
export default {
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
      this.distance += this.endPoint.y - this.startPoint.y;
      if (this.overBorder(this.distance).position == "up") {
        //边界判断
        this.distance = this.overBorder(this.distance).val + 30;
      } else if (this.overBorder(this.distance).position == "down") {
        this.distance = this.overBorder(this.distance).val - 30;
      }
      /* 根据距离计算相对垂直位移 */
      this.path.style.transform = `translateY(${this.distance}px)`;
      this.path.style.transition = "all .2s";
    },
    touchend(evt) {
      /* 主要用来校对 */
      if (this.overBorder(this.distance).position == "up") {
        //出界回调
        this.distance = this.overBorder(this.distance).val;
      } else if (this.overBorder(this.distance).position == "down") {
        this.distance = this.overBorder(this.distance).val;
      }
      this.path.style.transform = `translateY(${this.distance}px)`;
      this.path.style.transition = "all .2s";
    },

    overBorder(distance) {
      const Client = document.querySelector(".v-date-picker-scroll");
      const Cheight = Client.clientHeight; // clientheight = 300
      const Iheight = //itemheight
        Cheight / document.querySelectorAll(".v-date-picker-scroll div").length;
      if (distance > Iheight * 2) {
        return { val: Iheight * 2, position: "up" };
      } else if (distance < Cheight * -1 + Iheight * 3) {
        return { val: Cheight * -1 + Iheight * 3, position: "down" };
      } else {
        return { val: distance, position: "none" };
      }
    },
    round(num) {
      num = Math.abs(num);
      return num > 1.7777 ? parseInt(num) : parseInt(num) + 1;
    }
  },
  data() {
    return {
      path: "",
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      distance: 0,
      scrollLock: false
    };
  },
  watch: {
    show(newVal) {
      this.$refs.popup.show();
    }
  },
  mounted() {
    this.popup = !this.popup ? this.$refs.popup : this.popup;
  },
  props: {
    show: { default: "" },
    part: {
      default: 5
    }
  },
  components: { popup }
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
    height: 60px;
    // border-top: 1px solid #000;
    // border-bottom: 1px solid #000;
    background: rgba(2, 2, 2, 0.2);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    z-index: 100;
  }
  .v-date-picker-body {
    padding: 60px 0;
    box-sizing: border-box;
    .v-date-picker-box {
      position: relative;
      height: 300px;
      overflow: hidden;
      .v-date-picker-scroll {
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          color: #000;
          font-weight: 800;
          padding: 10px 0;
          height: 60px;
        }
      }
      .v-date-picker-mask {
        z-index: 100;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 1)
        );
        width: 100%;
        height: inherit;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
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
  }
}
</style>