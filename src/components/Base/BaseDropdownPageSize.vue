<template>
    <div class="misa-dropdown-wrapper">
        <div :class="{'misa-dropdown':true, 'misa-dropdown-inv':true, 'misa-dropdown-show-list':isShowList}">
            <div class="misa-dropdown-value">{{pageSize}} bản ghi trên 1 trang</div>
            <div @click="toggleShowList" class="misa-dropdown-icon"><span class="misa-icon"></span></div>
            <div class="misa-dropdown-list">
                <div @click="onClickPageSize(10)" 
                    :class="{'misa-dropdown-item':true, 'misa-dropdown-item-selected':pageSize == 10}"
                >
                    10 bản ghi trên 1 trang
                </div>
                
                <div @click="onClickPageSize(20)" 
                    :class="{'misa-dropdown-item':true, 'misa-dropdown-item-selected':pageSize == 20}"
                >
                    20 bản ghi trên 1 trang
                </div>

                <div @click="onClickPageSize(30)" 
                    :class="{'misa-dropdown-item':true, 'misa-dropdown-item-selected':pageSize == 30}"
                >
                    30 bản ghi trên 1 trang
                </div>

                <div @click="onClickPageSize(50)" 
                    :class="{'misa-dropdown-item':true, 'misa-dropdown-item-selected':pageSize == 50}"
                >
                    50 bản ghi trên 1 trang
                </div>

                <div @click="onClickPageSize(100)" 
                    :class="{'misa-dropdown-item':true, 'misa-dropdown-item-selected':pageSize == 100}"
                >
                    100 bản ghi trên 1 trang
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'BaseDropdownPageSize',
        data(){
            return {
                //Xác định ẩn hiện của list
                isShowList:false
            }
        },
        props:{
            //giá trị kích thước trang
            pageSize:Number,
            //Hàm thay đổi kích thước trang
            changePageSize:Function
        },
        methods:{
            /**
             * Func : đóng mở list
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            toggleShowList(){
                this.isShowList = !this.isShowList
            },

            /**
             * Func : Thay đổi pageSize và load lại dữ liệu
             * Author : Lê Mạnh Hùng
             * @param {*} pageSize giá trị pageSize được chọn
             */
            onClickPageSize(pageSize){
                this.isShowList = false
                this.changePageSize(pageSize)
            }
        }
    }
</script>

<style scoped>
@import url(../../CSS/components/dropdown.css);
</style>