<template>
    <div class="misa-input-wrapper">
        <div class="misa-label-field">{{label}} <span v-if="fieldRequire" style="color:red">*</span></div>
        <input :value="value" 
            @input="e => handleChangeValue(e.target.value)" 
            ref="input" 
            :autocomplete="true" 
            :tabindex="tabIndex" 
            :type="type ? type : 'text'" 
            :class="{'misa-input':true,'misa-field-error':error}" 
            @blur="handleBlur(value,fieldName)"
            min="0"
        />
        <div v-if="tooltip" class="misa-input-tooltip">{{tooltip}}</div>
        <div v-if="error" class="misa-input-msg-error">{{error}}</div>
    </div>
</template>

<script>
    export default {
        name:"BaseInput",
        props:{
            //label cho field input
            label:String,
            //Xác định field có phải bắt buộc k
            fieldRequire:Boolean,
            tabIndex:Number,
            //Xác địn focus input
            autoFocus:Boolean,
            //Giá trị field
            value:String,
            //Hàm xử lý thay đổi
            changeValue:Function,
            //Tên field name
            fieldName:String,
            //chuỗi thông báo lỗi
            error:String,
            //Hàm xử lý blur
            handleBlur:Function,
            //Kiểu input
            type:String,
            //tooltip
            tooltip:String
        },
        mounted(){
            if(this.autoFocus)
                this.$refs.input.focus();
        },
        watch:{
            autoFocus(){
                this.$refs.input.focus();
            }
        },
        methods:{
            /**
             * Func : xử lý thay đổi value
             * Author : Lê Mạnh Hùng
             * @param {*} value 
             */
            handleChangeValue(value){
                this.changeValue(value,this.fieldName)
            },
        }
    }
</script>

<style scoped>
@import url(../../CSS/components/input.css);
</style>