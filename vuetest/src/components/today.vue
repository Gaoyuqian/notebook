<template>
    <div class='main-container'>
        <div class='box-select' v-show='!form.main'>
            <div v-for='item in classArray' :class='[item,"content"]' @click='itemClick(item)'></div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <div class='form-main' v-show='form.main'>
                <div class='form-for-eat' v-show='form.ate'>eat</div>
                <div class='form-for-use' v-show='form.use'>use</div>
                <div class='form-for-clothes' v-show='form.clothes'>clothes</div>
                <div class='form-for-walk' v-show='form.walk'>walk</div>
            </div>
        </transition>
    </div>
</template>

<script>
import 'animate.css'
export default {
    data() {
        return {
            classArray: ['eat', 'use', 'clothes', 'walk'],
            form: {
                main: false,
                ate: false,
                use: false,
                clothes: false,
                walk: false,
            }
        }
    },
    methods: {
        itemClick: function(item) {
            switch (item) {
                case 'eat': this.changeBooleanForObject(this.form, true,['ate', 'main']);
            }
        },
        changeBooleanForObject: function(obj, boolean, arr) {//批量处理对象中的key 使之变为其他boolean
            if (!arr) {
                for (let i in obj) {
                    obj[i] = boolean;
                }
            }
            const len = Object.prototype.toString.call(arr) === "[object Array]" ? arr.length : '1';
            if (len == '1') {//one
                obj[arr] = boolean;
            } else {// more
                for (let i in arr) {
                    for (let item in obj) {
                        if (arr[i] == item) {// 找到了
                            obj[arr[i]] = boolean;
                        }
                    }
                }
            }
        },
    },

    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 330px;
    height: 330px;
    background: red;
    margin: 20px;
}

.box-select {
    width: 100%;
    margin-top: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

label,
input {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 28px;
}

::-webkit-input-placeholder {
    color: pink;
    font-size: 28px;
}
</style>

