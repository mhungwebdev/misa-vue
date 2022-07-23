<template>
    <div class="misa-content-header">
        <div class="misa-content-header-left">
            <div @click="hireSlidebar" class="misa-content-header-icon-toggle misa-icon misa-icon24"></div>
            <div class="misa-content-header-company-name">CÔNG TY SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC</div>
            <div class="misa-content-header-left-arrow misa-icon misa-icon24"></div>
        </div>

        <div class="misa-content-header-right">
            <div class="misa-content-header-bell  misa-icon misa-icon24"></div>
            <div class="misa-content-header-avatar misa-icon"></div>
            <div class="misa-content-header-name">Lê Mạnh Hùng</div>
            <div class="misa-content-header-right-arrow  misa-icon misa-icon24"></div>
        </div>
    </div>
</template>

<script>
import { appStore } from '../../stores/AppStore'

    export default {
        name:'TheHeader',
        methods:{
            /**
             * Func : xử lý sự kiện ẩn slidebar
             */
            hireSlidebar(){
                const AppStore = appStore()

                AppStore.hireSlidebar()
            }
        }
    }
</script>

<style scoped>
@import url(../../CSS/layout/Header.css);
</style>