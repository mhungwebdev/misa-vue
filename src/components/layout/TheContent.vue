<template>
    <div class="misa-content-wrapper">
        <TheHeader />
        <router-view />
    </div>
</template>

<script>
import TheHeader from './TheHeader.vue';
    export default {
    components: { TheHeader }
}
</script>

<style scoped>
@import url(../../CSS/layout/Content.css);
</style>