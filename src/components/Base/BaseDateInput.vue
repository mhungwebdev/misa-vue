<template>
    <div class="misa-date-input-wrapper">
        <div class="misa-label-field">{{label}}</div>
        <input 
            :tabindex="tabIndex" 
            :class="{'misa-date-input':true,'misa-field-error':error}" 
            :placeholder="placeholder"
            :value="dateValue"
            :disabled="disabled"
            @input="handleInput"
        />
        <div @click="handleToggleDatePicker" class="misa-date-input-icon misa-icon misa-icon24"></div>
        <span v-if="isShowDatePicker">
            <v-date-picker 
                model="date"
                :key="'today'"
                v-model="date"
                @click="handleChangeValue"
                class="misa-date-picker" 
                :current-value="Date.now()"
                locale="vi"
                :dayNamesShorter="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
            />
        </span>
        <div v-if="error" class="misa-input-msg-error">{{error}}</div>
    </div>
</template>

<script>
import VCalendar from 'v-calendar';
import {CommonJS} from '../../JS/Common/Common'
    export default {
        name:'BaseDateInput',
        data(){
            return {
                //Xác định ẩn hiện date picker
                isShowDatePicker:false,
                //value date picker
                date:new Date(),
                //placeholder cho input
                placeholder:"DD/MM/YYYY",
                disabled:false,
            }
        },
        setup(){
            return {
                CommonJS
            }
        },
        props:{
            //label cho field
            label:String,
            tabIndex:Number,
            //giá trị của field
            value:String,
            //Hàm thay đổi giá trị
            changeValue:Function,
            //Tên field
            fieldName:String,
            //thông báo lỗi
            error:String,
            //Hàm xử lý blur
            handleBlur:Function,
        },
        watch:{
            value(newValue,oldValue){
                this.date = newValue;
            }
        },
        computed:{
            dateValue(){
                return this.CommonJS.formatDate(this.value)
            }
        },
        components:{VCalendar},
        methods:{
            /**
             * Func : xử lý thay đổi dữ liệu
             * Author : Lê Mạnh Hùng (18/7/2022)
             * @param {*} value 
             */
            handleChangeDate(value){
                this.changeValue(value,this.fieldName);
            },

            handleToggleDatePicker(){
                this.isShowDatePicker = !this.isShowDatePicker;
            },

            handleChangeValue(e){
                this.isShowDatePicker = false
                this.changeValue(this.date,this.fieldName)
                this.handleBlur(this.date,this.fieldName)
            },

            handleInput(){
                this.placeholder = "__/__/____"
            }
        }
    }
</script>

<style scoped>
@import url(../../CSS/components/dateInput.css);
</style>