<template>
    <div>
        <div class='banner-div div'>
            <ul class='banner'>
                <li v-for='item in bannerTitle' @click='jumpPage(item)'>{{item}}</li>
            </ul>
        </div>
        <router-view/>
        <div class='footer-div div'>
            <ul class='footer'>
                <li v-for='item in footerTitle'>{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import 'animate.css'
export default {
    name: 'index',
    data() {
        return {
            bannerTitle: ['昨天', '今天'],
            footerTitle: ['记账', '统计']
        }
    },
    mounted() {

    },
    methods: {
        jumpPage: function(a) {
            this.$router.push(a === '今天' ? './today' : './yestoday')
        },
    }
}
</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
}

.div {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
}

.banner {
    position: fixed;
    top: 0;
    left: 0;
}

ul {
    background: pink;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    .a {
        flex: 1
    }
    li {
        flex: 2;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
    }
}
</style>

