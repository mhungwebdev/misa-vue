<template>
    <div class="misa-date-input-wrapper">
        <div class="misa-label-field">{{ label }}</div>
        <input :tabindex="tabIndex" :class="{ 'misa-date-input': true, 'misa-field-error': error }"
            :placeholder="placeholder" :value="value" @input="handleInput" @blur="handleBlur(value, fieldName)" />
        <div @click="handleToggleDatePicker" class="misa-date-input-icon misa-icon misa-icon24"></div>
        <span v-if="isShowDatePicker">
            <v-date-picker model="date" :key="'today'" v-model="date" @click="handleChangeValue"
                class="misa-date-picker" :current-value="Date.now()" locale="vi"
                :dayNamesShorter="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" :highlight="'green'" />
        </span>
        <div v-if="error" class="misa-input-msg-error">{{ error }}</div>
    </div>
</template>

<script>
import { CommonJS } from '../../JS/Common/Common'
export default {
    name: 'BaseDateInput',
    // components:{DxDateBox},
    data() {
        return {
            //Xác định ẩn hiện date picker
            isShowDatePicker: false,
            //value date picker
            date: new Date(),
            //placeholder cho input
            placeholder: "DD/MM/YYYY",
        }
    },
    setup() {
        return {
            CommonJS
        }
    },
    async created() {
        if (this.value)
            this.date = this.value
    },
    props: {
        //label cho field
        label: String,
        tabIndex: Number,
        //giá trị của field
        value: String,
        //Hàm thay đổi giá trị
        changeValue: Function,
        //Tên field
        fieldName: String,
        //thông báo lỗi
        error: String,
        //Hàm xử lý blur
        handleBlur: Function,
    },
    watch: {
        value(newValue, oldValue) {
            if (this.CommonJS.checkDate(newValue)) {
                this.date = this.CommonJS.createDateDDMMYYYY(newValue)
            } else
                this.date = new Date()
        }
    },
    methods: {
        /**
         * Func : ẩn hiện date picker
         * Author : Lê Mạnh Hùng (29/7/2022)
         */
        handleToggleDatePicker() {
            this.isShowDatePicker = !this.isShowDatePicker;
        },

        /**
         * Func : chọn ngày
         * Author : Lê Mạnh Hùng (29/7/2022)
         */
        handleChangeValue(e) {
            this.isShowDatePicker = false
            this.changeValue(this.CommonJS.formatDate(this.date), this.fieldName)
            this.handleBlur(this.CommonJS.formatDate(this.date), this.fieldName)
        },

        /**
         * Func : lắng nghe sự kiện nhập
         * Author : Lê Mạnh Hùng (29/7/2022)
         */
        handleInput(e) {
            this.changeValue(e.target.value, this.fieldName)
        }
    }
}
</script>

<style scoped>
@import url(../../CSS/components/dateInput.css);
</style>