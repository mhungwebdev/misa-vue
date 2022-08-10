<template>
    <div :id="type == 'error' ? 'misa-toast-error': 'misa-toast-success'" class="misa-toast-wrapper">
        <slot></slot>
        <div class="misa-toast-message">{{ message }}</div>
    </div>
</template>

<script>
    export default {
        props :{
            message : {
                type:String,
                default:'Đây là thông báo !'
            },
            type:String,
        },
        mounted() {
            setTimeout(() => {
                this.$el.classList.add("misa-toast-wrapper-hide")
            },5000)
        },
    }
</script>

<style scoped>
@import url(../../CSS/components/baseToast.css)
</style>