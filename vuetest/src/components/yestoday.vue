<template>
    <div class='main-div'>
        <div class="choose">
            <div class="today" @click='changeTongji("1")'>今天</div>
            <div class="yesterday" @click='changeTongji("2")'>昨天</div>
        </div>
        <div class="total-case">{{yesterdayTime}}总支出：{{totalMoney}}</div>
        <div class="one-pic" v-for='item in yesterdayData'>
            <div class='time text'>{{getType(item.type)}}</div>
            <div class='content-box'>
                <div class='money text'>花了{{item.money}}元</div>
                <div class='text text'>备注：{{item.text}}</div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.choose {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        width: 100%;
        height: 40px;
        border: 1px solid gold;
        background: skyblue;
    }
}

.total-case {
    font-size: 36px;
    color: grey;
    height: 50px;
    width: 100%;
}

.main-div {
    position: relative;
    .one-pic {
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
    .time {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        border-left: 1px solid red;
        flex: 3;
        &>div {
            width: 100%;
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            data: '',//获取所有记录
            yesterdayData: [],//存放昨天的所有记录
            yesterdayTime: '',
            labels: {
                'eat': '吃吃吃',
                'clothes': '穿穿穿',
                'use': '用用用',
                'walk': '行行行',
            },
            totalMoney: 0,
        }
    },
    methods: {
        getTotalMoney: function() {
            this.totalMoney = 0;
            this.yesterdayData.forEach((item, i) => {
                this.totalMoney += parseInt(item.money);
            }, this);
        },
        getType: function(val) {
            return this.labels[val];
        },
        formatData: function() {
            //根据毫秒值获取
            this.yesterdayData.length = '0';
            for (let i in this.data) {
                if (this.data[i].date === this.yesterdayTime) {
                    this.yesterdayData.push(this.data[i]);
                }
            }
            return this.yesterdayData;
        },
        getYesterdayDate: function(date) {
            var curDate = new Date();
            var preDate = new Date(curDate.getTime() - (date ? 24 * 60 * 60 * 1000 : 0));
            return preDate.getFullYear() + '年' + (preDate.getMonth() + 1) + '月' + preDate.getDate() + '日';
        },
        changeTongji: function(type) {
            this.yesterdayTime = type === '1' ? this.getYesterdayDate(false) : this.getYesterdayDate(true);
            this.formatData();
            this.getTotalMoney();
        }
    },
    mounted() {
        this.data = JSON.parse(localStorage.getItem('data'));
        this.yesterdayTime = this.getYesterdayDate(true);
        this.formatData()
        this.getTotalMoney()
    }
}
</script>
