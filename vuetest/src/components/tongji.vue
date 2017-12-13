<template>
    <div class='main-content'>
        <div class="list" v-for='(key,val) in formatDataList' v-if='!dataIsNull(formatDataList)'>
            <div class="list-chilren">
                <div class="list-title">
                    <div class="date">{{val}}</div>
                    <div class="total-money">总共{{getTotalMoneyByDate(val)}}元</div>
                </div>
                <div class="list-content" v-for='item in key'>
                    <div class="content-left">
                        <div class="list-type text">{{getType(item.cost_type)}}</div>
                    </div>
                    <div class="content-right">
                        <div class="list-money text">花了{{item.money_count}}元</div>
                        <div class="list-text text">备注：{{item.beizhu_text}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-list" v-if='dataIsNull(formatDataList)'>
          啥也没记呢还
        </div>
    </div>
</template>
<script>
export default {
  created() {
    const dataForQueryList = {
      username: sessionStorage.getItem("username"),
      datetime: this.getToday()
    };
    this.$http
    ///christmas/sendCode
      .post("http://127.0.0.1:9999/querylist_by_singledate", dataForQueryList)
      .then(res => {
        res.body.resCode === "0"
          ? (() => {
              this.formatDataList = res.body.data;
              // console.log(this.dataIsNull(this.formatDataList));
            })()
          : (() => {
              alert(JSON.stringify(res.body.resMsg));
            })();
      });
    // 需要一个二维数组
    // 缺少条件判断为空
  },
  data() {
    return {
      formatDataList: "",
      dataTotal: [],
      labels: {
        eat: "吃吃吃",
        clothes: "穿穿穿",
        use: "用用用",
        walk: "行行行"
      }
    };
  },
  methods: {
    dataIsNull: function(obj) {
      const key = Object.keys(obj);
      if(this.formatDataList[key]&&this.formatDataList[key][0]){
        return false
      }
      return true
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
    getTotalMoneyByDate: function(date) {
      let countMoney = 0;
      for (let i in this.formatDataList[date]) {
        countMoney += parseInt(this.formatDataList[date][i].money_count);
      }
      return countMoney;
    },
    getType: function(val) {
      return this.labels[val];
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  align-items: center;
  justify-content: center;
  .list-title {
    height: 100px;
    color: grey;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-bottom: none;
    padding: 0 20px;
  }
  .list-chilren {
    width: 100%;
  }
  .list-content {
    position: relative;
    height: 200px;
    width: 100%;
    display: flex;
    border: 1px solid red;
  }
  .text {
    font-size: 40px;
    color: #ff5833;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    border-left: 1px solid red;
    flex: 3;
    & > div {
      width: 100%;
    }
  }
}
</style>

