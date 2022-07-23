<template>
    <div class="misa-slidebar-wrapper">
        <div class="misa-slidebar-header">
            <div @click="showSlidebar" class="misa-slidebar-header-icon misa-icon misa-icon24"></div>
            <div class="misa-slidebar-header-logo"></div>
        </div>

        <div class="misa-slidebar-list">
            <BaseSlidebarItem v-for="(slidebarItem,index) in listSlidebarItem" :key="index" :slidebarItem="slidebarItem" />
        </div>
    </div>
</template>

<script>
import { appStore } from '../../stores/AppStore';
import BaseSlidebarItem from '../Base/BaseSlidebarItem.vue'
    export default {
    name: "TheSlidebar",
    data() {
        return {
            //list item slidebar
            listSlidebarItem: [
                { slidebarItemText: "Tổng quan", slidebarItemClassItem: "misa-icon-overview",path:"/employees"},
                { slidebarItemText: "Tiền mặt", slidebarItemClassItem: "misa-icon-cash", path:"/customers" },
                { slidebarItemText: "Tiền gửi", slidebarItemClassItem: "misa-icon-deposits" },
                { slidebarItemText: "Mua hàng", slidebarItemClassItem: "misa-icon-buy" },
                { slidebarItemText: "Bán hàng", slidebarItemClassItem: "misa-icon-sell" },
                { slidebarItemText: "Quản lý hóa đơn", slidebarItemClassItem: "misa-icon-manage-bill" },
                { slidebarItemText: "Kho", slidebarItemClassItem: "misa-icon-warehouse" },
                { slidebarItemText: "Công cụ dụng cụ", slidebarItemClassItem: "misa-icon-tool" },
                { slidebarItemText: "Tài sản cố định", slidebarItemClassItem: "misa-icon-fixed-assets" },
                { slidebarItemText: "Thuế", slidebarItemClassItem: "misa-icon-tax" },
                { slidebarItemText: "Giá thành", slidebarItemClassItem: "misa-icon-price" },
                { slidebarItemText: "Tổng hợp", slidebarItemClassItem: "misa-icon-aggregate" },
                { slidebarItemText: "Ngân sách", slidebarItemClassItem: "misa-icon-budget" },
                { slidebarItemText: "Báo cáo", slidebarItemClassItem: "misa-icon-report" },
                { slidebarItemText: "Phân tích tài chính", slidebarItemClassItem: "misa-icon-financial-analysis" },
            ]
        };
    },
    methods:{
        /**
         * Func : Xử lý show slidebar
         */
        showSlidebar(){
            const AppStore = appStore()

            AppStore.showSlidebar()
        }
    },
    components: { BaseSlidebarItem }
}
</script>

<style>
@import url('../../CSS/layout/SlideBar.css');

</style>