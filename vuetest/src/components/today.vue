<template>
    <div class='main-container'>
        <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class='box-select' v-if='!mainShow'>
                <div v-for='item in classArray' :class='[item,"content"]' @click='itemClick(item)'>{{formatText(item)}}</div>
            </div>
        </transition>

        <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <edit :checkSelect='form' v-if='form.eat' @hidden='back'></edit>
        </transition>
        <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <edit :checkSelect='form' v-if='form.use' @hidden='back'></edit>
        </transition>
        <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <edit :checkSelect='form' v-if='form.clothes' @hidden='back'></edit>
        </transition>
        <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <edit :checkSelect='form' v-if='form.walk' @hidden='back'></edit>
        </transition>
    </div>
</template>

<script>
import "animate.css";
import edit from "./children/edit";
export default {
  data() {
    return {
      classArray: ["eat", "use", "clothes", "walk"],
      form: {
        eat: false,
        use: false,
        clothes: false,
        walk: false
      },
      mainShow: false
    };
  },
  components: { edit },
  methods: {
    formatText: function(item) {
      const a = {
        eat: "吃",
        use: "用",
        clothes: "穿",
        walk: "行"
      };
      return a[item];
    },
    back: function() {
      this.mainShow = false;
      this.changeBooleanForObject(this.form, false);
    },
    itemClick: function(item) {
      this.changeBooleanForObject(this.form, false);
      this.mainShow = true;
      switch (item) {
        case "eat":
          this.changeBooleanForObject(this.form, true, "eat");
          break;
        case "use":
          this.changeBooleanForObject(this.form, true, "use");
          break;
        case "clothes":
          this.changeBooleanForObject(this.form, true, "clothes");
          break;
        case "walk":
          this.changeBooleanForObject(this.form, true, "walk");
          break;
      }
    },
    changeBooleanForObject: function(obj, boolean, arr) {
      //批量处理对象中的key 使之变为其他boolean
      if (!arr) {
        for (let i in obj) {
          obj[i] = boolean;
        }
        return;
      }
      const len =
        Object.prototype.toString.call(arr) === "[object Array]"
          ? arr.length
          : "1";
      if (len == "1") {
        //one
        obj[arr] = boolean;
      } else {
        // more
        for (let i in arr) {
          for (let item in obj) {
            if (arr[i] == item) obj[arr[i]] = boolean;
          }
        }
      }
    }
  },

  mounted() {}
};
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  max-width: 100%;
}

.content {
  width: 140px;
  height: 140px;
  background: red;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 40px;
}

.box-select {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
}
</style>

