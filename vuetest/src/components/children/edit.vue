<template>
    <div class='form-box'>
        <label for="" class='eat-label form-label'>cost</label>
        <input type="num" class='eat-input form-input' placeholder="" maxlength="10" v-model='money'>
        <label for="" class='eat-label form-label'>备注</label>
        <textarea name="" id="" multiline class='form-textarea' v-model='text'></textarea>
        <div class='button-group'>
            <div class='form-button' @click='submitEat'>提交</div>
            <div class='form-button' @click='back'>返回</div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      money: "",
      text: "",
      username: ""
    };
  },
  props: ["checkSelect"],

  mounted() {
    this.username = sessionStorage.getItem("username");
  },
  methods: {
    submitEat: function() {
      if (!this.money) {
        return;
      }
      const dataForQueryList = {
        money: this.money,
        text: this.text,
        username: this.username,
        datetime: this.getToday(),
        type: this.getTrueItem(this.checkSelect)
      };
      console.log(dataForQueryList);
      this.$http
        .post("http://127.0.0.1:9999/querylist", dataForQueryList)
        .then(res => {
          res.body.resCode === "0"
            ? (() => {
                console.log(res.body.resMsg);
                alert(res.body.resMsg);
                //   this.$router.push("/index/today");
                this.back();
              })()
            : (() => {
                alert(JSON.stringify(res.body.resMsg));
              })();
        });
    },
    back: function() {
      this.money = this.text = "";
      this.$emit("hidden");
    },
    getToday: function() {
      var date = new Date();
      const year = "年";
      const month = "月";
      const day = "日";
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日"
      );
    },
    getTrueItem: function(obj) {
      let trueItem = "";
      if (Object.prototype.toString.call(obj) === "[object Object]") {
        for (let item in obj) {
          trueItem = obj[item] ? item : trueItem;
          // if (obj[item]) {
          //     trueItem = item;
          // }
        }
      }
      return trueItem;
    }
  }
};
</script>
<style lang="scss" scoped>
.form-button {
  width: 130px;
  background: skyblue;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 50px;
}

::-webkit-input-placeholder {
  color: pink;
  font-size: 28px;
}

.form-textarea {
  border: 1px solid #888888;
  margin: 10px; // width: 100%;
  color: pink;
  font-size: 60px;
  position: relative;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.form-box > * {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.form-input {
  font-weight: 800;
  font-size: 32px;
  background: rgba(255, 255, 255, 0);
  color: pink;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  height: 90px;
  width: 50%;
  border-bottom: 1px solid black; // border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.form-label {
  color: black;
  font-size: 60px;
  margin-top: 60px;
}
</style>

