<template>
  <div class="main-content-total">
      <div class="title" v-for='(key,val) in dataForView'>{{key,val}}</div> 
       <div class="date-title" v-for='(key,val) in dataForView'>
          <div class="date">{{val}}</div>
          <div class="cost-total">{{val}}</div>
           <div class="info-box" v-for='item in key'>
                <div class="info-type">{{item.cost_type}}</div>
                <div class="info-money">{{item.money_count}}</div>
                <div class="info-beizhu">{{item.beizhu_text}}</div>    
           </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "", //存放服务器返回数据的对象
      dataForView: {}, //{日期：【二维数组】}
      arrayData: [] //存放所有日期的数组
    };
  },
  methods: {},
  mounted() {
    const dataForQueryList = {
      username: sessionStorage.getItem("username")
    };
    const lock = async () => {
      try {
        await this.$http
          .post("http://127.0.0.1:9999/getlist", dataForQueryList)
          .then(res => {
            res.body.resCode === "0"
              ? (() => {
                  this.data = res.body.data;
                  this.data.forEach(key => {
                    if (this.arrayData.indexOf(key.date_time) == "-1") {
                      this.arrayData.push(key.date_time);
                    }
                  }); //放到数组里 然后去重，获取到了所有有记录的日期，
                  for (let item of this.arrayData) {
                    console.log(item);
                    this.dataForView[item] = [];
                    for (let i in this.data) {
                      if (this.data[i].date_time == item) {
                        this.dataForView[item].push(this.data[i]);
                      }
                    }
                  }
                  console.log(this.dataForView);
                  //   this.nextTick(() => {});
                })()
              : (() => {
                  alert(JSON.stringify(res.body.resMsg));
                })();
          });
      } catch (err) {}
    };
    lock();
  }
};
</script>

