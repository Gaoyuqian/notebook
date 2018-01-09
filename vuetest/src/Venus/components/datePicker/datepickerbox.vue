<template>
  <popup ref='popup'>
    <div class="v-date-picker-main">
        <div class="v-date-picker-relative">
            <div class="v-date-picker-title">
                <div class="v-cancel">取消</div>
                <div class="v-submit">完成</div>
            </div>
            <div class="v-date-picker-body">
           
            </div>
        </div>  
    </div>
  </popup>
</template>
<script>
import popup from "../popup";
export default {
  watch: {
    show(newVal) {
      this.$refs.popup.show();
    }
  },
  mounted() {
    this.popup = !this.popup ? this.$refs.popup : this.popup;
  },
  props: {
    show: { default: "" }
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
    padding-top: 70px;
  }
  .v-date-pick-body-box {
    width: 100%;
    display: flex;
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
    height: 70px;
    border-bottom: 1px solid #999;
  }
}
</style>