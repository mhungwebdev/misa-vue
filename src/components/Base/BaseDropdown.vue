<template>
    <div class="misa-dropdown-wrapper">
        <div class="misa-label-field">{{ label }} <span v-if="fieldRequired" style="color:red">*</span></div>
        <div @keyup="handleKeyupDropdown"
            :class="{ 'misa-dropdown': true, 'misa-field-focus': isFocus, 'misa-dropdown-show-list': isShowList, 'misa-field-error': error }">
            <input :tabIndex="tabIndex" :value="valueInput" @focus="focusInput" @blur="blurInput" type="text"
                @keydown="handleKeyup" class="misa-dropdown-input" @input="handleAutoComplete" />
            <div @click="toggleList" class="misa-dropdown-arrow-icon"><span class="misa-icon"></span></div>
            <div class="misa-dropdown-list">
                <table border="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th v-for="(field, index) in listFieldRender" :key="index" :class="field['TextPosition']">
                                {{ field["FieldDisplay"] }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="handleClickChangeValue(item)"
                            :class="{ 'misa-dropdown-item-highlight': isSelected(item) }"
                            v-for="(item, index) in listItem" :key="index">
                            <td v-for="(field, index) in listFieldRender" :key="index" :class="field['TextPosition']">
                                {{ item[field["FieldName"]] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="misa-input-msg-error">{{ error }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import { CommonJS } from '../../JS/Common/Common';
export default {
    name: "BaseDropdown",
    data() {
        return {
            //mảng item sẽ render
            listItem: [],
            //Xác định input focus không
            isFocus: false,
            //Xác định ẩn hiện list
            isShowList: false,
            //item được chọn
            itemSelected: {},
            //value của input
            valueInput: "",
            //data ban đầu
            storeList: [],
            timer: null,
            indexFocus: null
        }
    },
    props: {
        //label cho field
        label: String,
        //Xác định field có bắt buộc không
        fieldRequired: Boolean,
        //Mảng tên field sẽ render
        listFieldRender: Array,
        //api lấy dữ liệu
        api: String,
        //field sẽ hiển thị
        fieldDisplay: String,
        tabIndex: Number,
        //giá trị của field
        value: String,
        //Hàm thay đổi giá trị
        changeValue: Function,
        //Tên field sẽ lấy giá trị
        fieldName: String,
        //thông báo lỗi
        error: String,
        //Hàm xử lý sự kiện blur
        handleBlur: Function,
    },
    async created() {
        await this.loadData()
    },
    watch: {
        value(newValue, oldValue) {
            if (newValue == "") {
                this.itemSelected = {}
            }
        },
        listItem(newValue, oldValue) {
            if (newValue.length == 0) {
                this.listItem = this.storeList
            }
        },
        itemSelected(newValue, oldValue) {
            if (newValue) {
                this.listItem = this.storeList
            }
        }
    },
    methods: {
        /**
         * Func : Loading dữ liệu
         * Author : Lê Mạnh Hùng (29/7/2022)
         */
        async loadData() {
            if (this.api) {
                await axios.get(this.api)
                    .then(res => {
                        this.listItem = res.data
                        this.storeList = res.data
                    })
                    .catch(err => console.log(err))

                const item = this.listItem.find(it => it[this.fieldName] == this.value)
                if (item) {
                    this.itemSelected = item
                    this.valueInput = item[this.fieldDisplay]
                }
            }
        },

        /**
         * Func : thay đổi trạng thái cho input khi focus (đổi màu border)
         * Author : Lê Mạnh Hùng (15/7/2022)
         */
        focusInput() {
            this.isShowList = true
            this.isFocus = true
        },

        /**
         * Func : thay đổi trạng thái cho input khi blur (đổi màu border)
         * Author : Lê Mạnh Hùng (15/7/2022)
         */
        blurInput(e) {
            if (e.relatedTarget.className == "misa-input")
                this.isShowList = false
            this.isFocus = false
            if (this.valueInput && this.itemSelected[this.fieldDisplay] == undefined) {
                this.handleBlur(false, this.fieldName);
            }
            else
                this.handleBlur(this.value, this.fieldName)
        },

        /**
         * Func : Đóng mở listItem
         * Author : Lê Mạnh Hùng (15/7/2022)
         */
        toggleList() {
            this.isShowList = !this.isShowList
        },

        /**
         * Func : Xác định item có được select không
         * Author : Lê Mạnh Hùng (15/7/2022)
         * @param {*} value của item 
         * @return true nếu được focus và ngược lại
         */
        isSelected(item) {
            return this.itemSelected == item
        },

        /**
         * Func : Thay đổi item được chọn
         * Author : Lê Mạnh Hùng (15/7/2022)
         * @param {*} item được chọn 
         */
        handleClickChangeValue(item) {
            this.itemSelected = item
            this.valueInput = item[this.fieldDisplay]
            this.isShowList = false
            this.changeValue(item[this.fieldName], this.fieldName)
        },

        /**
         * Func : lắng nghe sự kiện key up
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleKeyupDropdown(e) {
            if (e.key == "Escape" || e.key == "Enter") {
                this.isShowList = false
            }
        },

        /**
         * Func : Xử lý auto complete cho input
         * Author : Lê Mạnh Hùng (20/7/2022)
         * @param {*} e đối số mặc định của event 
         */
        handleAutoComplete(e) {
            this.valueInput = e.target.value;
            const value = e.target.value.trim();
            this.listItem = this.storeList.filter(item =>
                CommonJS.removeVietnameseTones(item[this.fieldDisplay].trim().toLowerCase()).search(CommonJS.removeVietnameseTones(value.toLowerCase())) > -1)

            if (value != "" && this.listItem.length > 0) {
                this.isShowList = true
            } else {
                this.isShowList = false
            }

            const itemSame = this.storeList.find(item =>
                CommonJS.removeVietnameseTones(item[this.fieldDisplay].trim().toLowerCase()) == CommonJS.removeVietnameseTones(value.toLowerCase()))

            if (this.timer) {
                clearTimeout(this.timer)
            }

            if (itemSame != undefined) {
                this.timer = setTimeout(() => {
                    this.itemSelected = itemSame
                    this.valueInput = itemSame[this.fieldDisplay].trim()
                    this.changeValue(itemSame[this.fieldName], this.fieldName)
                    this.isShowList = false
                }, 500)
            } else {
                this.changeValue("", this.fieldName)
            }
        },

        /**
         * Func : Chọn item bằng mũi tên lên xuống
         * Author : Lê Mạnh Hùng (3/8/2022)
         * @param {*} item focus
         */
        handleArrowChangeValue(item) {
            this.itemSelected = item
            this.valueInput = item[this.fieldDisplay]
            this.changeValue(item[this.fieldName], this.fieldName)
        },

        /**
         * Func : Lắng nghe sự kiện key up
         * Author : Lê Mạnh Hùng (3/8/2022)
         * @param {*} e đối số mặc định 
         */
        handleKeyup(e) {
            if (e.key == "ArrowDown") {
                this.isShowList = true
                var index = this.listItem.indexOf(this.itemSelected)

                if (index != -1) {
                    if (index == this.listItem.length - 1) {
                        this.handleArrowChangeValue(this.listItem[0])
                    } else {
                        this.handleArrowChangeValue(this.listItem[index + 1])
                    }
                } else {
                    this.handleArrowChangeValue(this.listItem[0])
                }
            }

            if (e.key == "ArrowUp") {
                this.isShowList = true
                var index = this.listItem.indexOf(this.itemSelected)

                if (index != -1) {
                    if (index == 0) {
                        this.handleArrowChangeValue(this.listItem[this.listItem.length - 1])
                    } else {
                        this.handleArrowChangeValue(this.listItem[index - 1])
                    }
                } else {
                    this.handleArrowChangeValue(this.listItem[this.listItem.length - 1])
                }
            }
        }
    }
}
</script>

<style scoped>
@import url(../../CSS/components/dropdown.css);
</style>