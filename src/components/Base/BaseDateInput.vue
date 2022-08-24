<template>
    <div class="misa-date-input-wrapper">
        <div class="misa-label-field">{{ label }}</div>
        <input @focus="isShowDatePicker = true" :tabindex="tabIndex"
            :class="{ 'misa-date-input': true, 'misa-field-error': error }" :placeholder="placeholder" :value="value"
            @input="handleInput" @blur="blurMethod" @keydown="handleKeydown" />
        <div @click="handleToggleDatePicker" class="misa-date-input-icon misa-icon misa-icon24"></div>
        <span v-if="isShowDatePicker">
            <v-date-picker model="date" :key="'today'" v-model="date" class="misa-date-picker" locale="vi"
                @dayclick="handleChangeValue" :dayNamesShorter="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
                color="green" />
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
            this.date = CommonJS.createDateDDMMYYYY(this.value)
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
            }
        },
        date(newValue) {
            this.changeValue(this.CommonJS.formatDate(newValue), this.fieldName)
            this.handleBlur(this.CommonJS.formatDate(newValue), this.fieldName)
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

        blurMethod(e) {
            this.handleBlur(this.value, this.fieldName)
            if (e.relatedTarget?.className != "vc-day-content vc-focusable")
                this.isShowDatePicker = false

        },

        /**
         * Func : chọn ngày
         * Author : Lê Mạnh Hùng (29/7/2022)
         */
        handleChangeValue(e) {
            if(e.id){
                this.isShowDatePicker = false
            }
        },

        /**
         * Func : lắng nghe sự kiện nhập
         * Author : Lê Mạnh Hùng (29/7/2022)
         */
        handleInput(e) {
            this.changeValue(e.target.value, this.fieldName)
        },

        /**
         * Func : Lắng nghe sự kiện keydown
         * Author : Lê Mạnh Hùng (22/8/2022)
         * @param {*} e 
         */
        handleKeydown(e) {
            if (e.key == "Escape" || e.key == "Enter") this.isShowDatePicker = false

            if (e.key == "ArrowDown") {
                if (!this.isShowDatePicker) {
                    this.isShowDatePicker = true
                } else {
                    this.date = CommonJS.calcDate(this.date, 7, 1)
                }
            }

            if (e.key == "ArrowUp") {
                if (!this.isShowDatePicker) {
                    this.isShowDatePicker = true
                } else {
                    this.date = CommonJS.calcDate(this.date, 7, 0)
                }
            }

            if (e.key == "ArrowLeft") {
                if (this.isShowDatePicker) {
                    this.date = CommonJS.calcDate(this.date, 1, 0)
                }
            }

            if (e.key == "ArrowRight") {
                if (this.isShowDatePicker) {
                    this.date = CommonJS.calcDate(this.date, 1, 1)
                }
            }
        }
    }
}
</script>

<style scoped>
@import url(../../CSS/components/dateInput.css);
</style>