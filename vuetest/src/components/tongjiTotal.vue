<template>
  <div class="main-content-total">
       <div class="date-title" v-for='(key,val) in dataForView'>
         <div class="title">
           <div class="date">{{val}}</div>
          <div class="cost-total">{{getTotalMoney(val)}}元</div>
          </div>
           <div class="info-box" v-for='item in key'>
                <div class="info-type">{{item.cost_type}}</div>
                <div class="info-money">{{item.money_count}}元</div>
                <div class="info-beizhu">{{item.beizhu_text}}</div>    
           </div>
      </div>
  </div>
    
</template>

<style lang="scss" scoped>
.title {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #bbe;
  color: #fff;
}
.info-box {
  background: rgb(150, 222, 232);
  // background: skyblue;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #fff;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding-left: 20px;
  }
  .info-type {
    flex: 1;
  }
  .info-money,
  .info-beizhu {
    flex: 3;
  }
}
.info-box:last-child {
  border: none;
}
</style>

<script>
export default {
  data() {
    return {
      data: "", //存放服务器返回数据的对象
      dataForView: {}, //{日期：【二维数组】}
      arrayData: [] //存放所有日期的数组
    };
  },
  methods: {
    getTotalMoney: function(money) {
      let totalMoney = 0;
      for (let i of this.dataForView[money]) {
        totalMoney += parseInt(i.money_count);
      }
      return totalMoney;
    }
  },
  mounted() {
    const dataForQueryList = {
      username: sessionStorage.getItem("username")
    };
    var aa, bb;
    const lock = async () => {
      try {
        await this.$http
          .post("http://127.0.0.1:9999/getlist", dataForQueryList)
          .then(res => {
            aa = [];
            bb = {};
            if (res.body.resCode == "0") {
              this.data = res.body.data;
              this.data.forEach(key => {
                if (aa.indexOf(key.date_time) == "-1") {
                  aa.push(key.date_time);
                }
              }); //放到数组里 然后去重，获取到了所有有记录的日期，
              for (let item of aa) {
                bb[item] = [];
                for (let i in this.data) {
                  if (this.data[i].date_time == item) {
                    bb[item].push(this.data[i]);
                  }
                }
              }
              this.dataForView = bb;
            } else {
              alert(JSON.stringify(res.body.resMsg));
            }
          });
      } catch (err) {}
    };
    lock();
  }
};
</script>

