<template>
    <div class="misa-radio-group-wrapper">
        <div class="misa-label-field">{{label}}</div>
        <div class="misa-radio-group">
            <div @click="handleChangeValue(item['value'])" 
                @keyup="e => handleKeyupChangeValue(e, item['value'])"
                v-for="(item,index) in listItem" 
                :key="index" 
                :class="{'misa-radio-item':true,'misa-radio-item-selected':isSelected(item['value'])}"
            >
                <div :tabIndex="tabIndex" class="misa-radio-item-out">
                    <div class="misa-radio-item-in"></div>
                </div>
                <div class="misa-radio-display">{{item["display"] ? item["display"] : "?"}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"BaseRadioGroup",
        props:{
            //label cho radio group
            label:String,
            //mảng item sẽ render ra các radio button
            listItem:Array,
            //tabIndex
            tabIndex:Number,
            //Giá trị của field
            value:Number,
            //Hàm xử lý thay đổi dữ liệu
            changeValue:Function,
            //Tên field
            fieldName:String,
        },
        methods:{
            /**
             * Func : Xác định item có được chọn không
             * Author : Lê Mạnh Hùng (15/7/202)
             * @param {*} value của item 
             * @return true nếu item được chọn và ngược lại
             */
            isSelected(value){
                if(this.value == value)
                    return true
                return false
            },

            /**
             * Func : Thay đổi item được chọn
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} value của item 
             */
            handleChangeValue(value){
                this.changeValue(value,this.fieldName)
            },

            /**
             * Func : thay đổi item được chọn bằng keyup
             * Author : Lê Mạnh Hùng (18/7/2022)
             */
            handleKeyupChangeValue(e,value){
                if(e.key == "Enter"){
                    this.handleChangeValue(value)
                }
            }
        }
    }
</script>

<style scoped>
@import url(../../CSS/components/radioGroup.css);


</style>