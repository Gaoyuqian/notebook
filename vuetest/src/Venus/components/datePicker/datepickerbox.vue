<template>
  <popup ref='popup'>
    <div class="v-date-picker-main">
        <div class="v-date-picker-relative">
            <div class="v-date-picker-title">
                <div class="v-cancel">取消</div>
                <div class="v-submit" @click='submit'>完成</div>
            </div>
            <div class="box">
              <!-- <div @getdate='getdate' v-for='item in data' :data='data[item]'>{{item}}</div> -->
               <pickerbody @getdate='getdate' :key='val' v-for='(item,val) in data' :data='item' type='asdfa'></pickerbody>       
            </div>
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
    submit() {},
    getdate(aaa, bbb) {
      console.log(aaa, bbb);
    },
    setYear(start = new Date(0).getFullYear(), now = new Date().getFullYear()) {
      //向上兼容！！！
      const year = [];
      for (let item = start; item <= now; item++) {
        year.push(item);
      }
      this.data.push({ year: year.reverse() });
    },
    setMonth() {
      //向上兼容！！！
      this.setYear();
      const month = [];
      for (let item = 1; item <= 12; item++) {
        month.push(item);
      }
      this.data.push({ month: month });
      console.log(this.data);
    },
    setDay(month) {}
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
  created() {
    switch (this.type) {
      case "year":
        this.setYear();
        break;
      case "month":
        this.setMonth();
        break;
    }

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