<template>
    <div class='form-box'>
        <label for="" class='eat-label form-label'>123</label>
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
            money: '',
            text: '',
            dataReport: {},
            dataArray: [],
            count: '',
        }
    },
    props: ['checkSelect'],

    mounted() {
        this.dataArray = JSON.parse(localStorage.getItem('data')) || [];
        this.count = parseInt(localStorage.getItem('count')) || 1;
        console.log(this.dataArray, this.count);
    },
    methods: {
        submitEat: function() {
            if (!this.money) {
                return;
            }
            //赋值
            this.dataReport.date = this.getToday();
            this.dataReport.money = this.money;
            this.dataReport.text = this.text;
            this.dataReport.type = this.getTrueItem(this.checkSelect);
            this.dataReport.index = this.count++;
            //over 赋值
            this.back();
            this.dataArray.push(this.dataReport);
            localStorage.setItem('data', JSON.stringify(this.dataArray));
            localStorage.setItem('count', parseInt(this.count));
            console.log(this.dataReport, this.dataArray);
        },
        back: function() {
            this.money = this.text = '';
            this.$emit('hidden');
        },
        getToday: function() {
            var date = new Date();
            const year = '年';
            const month = '月';
            const day = '日';
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
        },
        getTrueItem: function(obj) {
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                for (let item in obj) {
                    return obj[item] ? item : '';
                }
            }
        }

    },
}
</script>
<style lang="scss" scoped>
.form-button {
    width: 180px;
    background: skyblue;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 100px;
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

.form-box>* {
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

