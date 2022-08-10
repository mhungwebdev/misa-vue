<template>
    <div :class="{'misa-input-with-icon-wrapper':true,'misa-field-focus':isFocus}">
        <input
            @focus="changeState" 
            @blur="changeState"
            v-model="value"
            @input="e => onHandleInput(e.target.value)"
            type="text" 
            placeholder="Tìm theo mã, tên nhân viên" 
            class="misa-input-with-icon" 
        />
        <div class="misa-icon-input misa-icon"></div>
    </div>
</template>

<script>
    export default {
        name:"BaseInputWithIcon",
        data(){
            return {
                //xác định input có focus k
                isFocus:false,
                //giá trị input
                value:""
            }
        },
        watch:{
            valueProp(newValue,oldValue){
                this.value = newValue
            }
        },
        props:{
            //hàm input
            onHandleInput:Function,
            valueProp:String
        },
        methods:{
            /**
             * Func : thay đổi trạng thái input (thêm border-color)
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            changeState(){
                this.isFocus = !this.isFocus;
            }
        }   
    }
</script>

<style scoped>
@import url(../../CSS/components/inputWithIcon.css);

</style>