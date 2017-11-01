<template>
    <div>啊啊啊</div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {

        }
    },
    mounted() {
        setTimeout(() => {//启动图
            this.$router.push('/index/today');
        }, 3000);
    },
    methods: {

    }
}
</script>
