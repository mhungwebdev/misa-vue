<template>
    <div class="misa-grid-paging">
        <div class="misa-grid-paging-left">
            Tổng số : <span :style="{fontWeight:'bold'}">{{totalRecord}}</span> bản ghi
        </div>

        <div class="misa-grid-paging-right">
            <BaseDropDownPageSize :changePageSize="changePageSize" :pageSize="pageSize" />

            <div class="misa-grid-paging-func">
                <div @click="currentPage > 1 && changePageNumber(currentPage - 1)" 
                    :class="{'misa-grid-paging-pre':true,'misa-grid-paging-disabled':currentPage == 1}"
                >
                    Trước
                </div>

                <div v-for="(pageNumber,index) in pageNumberRender" 
                    :key="index"
                    class="misa-grid-paging-number"
                    :id="isCurrentPage(pageNumber) ? 'misa-grid-paging-current-page' : ''"
                    @click="pageNumber && pageNumber != currentPage && changePageNumber(pageNumber)"
                >
                    {{pageNumber ? pageNumber : "..."}}
                </div>

                <div @click="currentPage < totalPage && changePageNumber(currentPage + 1)"
                    :class="{'misa-grid-paging-next':true,'misa-grid-paging-disabled':currentPage == totalPage}"
                >
                    Sau
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseDropDownPageSize from './BaseDropdownPageSize.vue';
    export default {
    name: "BasePaging",
    props:{
        //Số bản ghi
        totalRecord:Number,
        //mảng number sẽ render
        pageNumberRender:Array,
        //trang hiện tại
        currentPage:Number,
        //Hàn thay đổi trang
        changePageNumber:Function,
        //Kích thước trang
        pageSize:Number,
        //Hàm thay đổi kích thước trang
        changePageSize:Function,
        //tổng số trang
        totalPage:Number,
    },
    components: { BaseDropDownPageSize },
    methods:{
        /**
         * Func : xác định page number có phải page hiện tại không
         * Author : Lê Mạnh Hùng (15/7/2022)
         * @param {*} pageNumber 
         * @return true nếu là trang hiện tại và ngược lại
         */
        isCurrentPage(pageNumber){
            if(pageNumber && pageNumber == this.currentPage)    return true

            return false
        }
    }
}
</script>

<style scoped>
@import url(../../CSS/components/paging.css);
</style>