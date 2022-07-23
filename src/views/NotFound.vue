<template>
    <div class="notFoundPage">
        <div>404</div>
        <div>Quay trở lại <router-link to="/employees">Trang Chủ</router-link></div>
    </div>
</template>

<script>
    export default {
        name:'NotFound'
    }
</script>

<style scoped>
@import url(../CSS/components/notFound.css);
</style>