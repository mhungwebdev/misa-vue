<template>
    <div class="misa-dropdown-wrapper">
        <div class="misa-label-field">{{label}} <span v-if="fieldRequired" style="color:red">*</span></div>
        <div @keyup="handleKeyupDropdown" :class="{'misa-dropdown':true,'misa-field-focus':isFocus,'misa-dropdown-show-list':isShowList,'misa-field-error':error}">
            <input 
                :tabIndex="tabIndex" 
                :value="itemSelected[fieldDisplay]" 
                @focus="focusInput" 
                @blur="blurInput" 
                type="text" 
                class="misa-dropdown-input" 
                @input="handleAutoComplete"
            />
            <div @click="toggleList" class="misa-dropdown-icon"><span class="misa-icon"></span></div>
            <div class="misa-dropdown-list">
                <table border="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th v-for="(field,index) in listFieldRender" 
                                :key="index" :class="field['TextPosition']"
                            >
                                {{field["FieldDisplay"]}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="handleChangeValue(item)" 
                            :class="{'misa-dropdown-item-highlight':isSelected(item[fieldName])}" 
                            v-for="(item,index) in listItem" 
                            :key="index"
                            :tabIndex="tabIndex"
                            @keyup="e => handleKeyupItem(e,item)"
                        >
                            <td 
                                v-for="(field,index) in listFieldRender" 
                                :key="index" 
                                :class="field['TextPosition']">
                                    {{item[field["FieldName"]]}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="misa-input-msg-error">{{error}}</div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:"BaseDropdown",
        data(){
            return {
                //mảng item sẽ render
                listItem: [],
                //Xác định input focus không
                isFocus:false,
                //Xác định ẩn hiện list
                isShowList:false,
                //item được chọn
                itemSelected:{},
            }
        },
        props:{
            //label cho field
            label:String,
            //Xác định field có bắt buộc không
            fieldRequired:Boolean,
            //Mảng tên field sẽ render
            listFieldRender:Array,
            //api lấy dữ liệu
            api:String,
            //field sẽ hiển thị
            fieldDisplay:String,
            tabIndex:Number,
            //giá trị của field
            value:String,
            //Hàm thay đổi giá trị
            changeValue:Function,
            //Tên field sẽ lấy giá trị
            fieldName:String,
            //thông báo lỗi
            error:String,
            //Hàm xử lý sự kiện blur
            handleBlur:Function,
        },
        async mounted(){
            if(this.api){
                await axios.get(this.api)
                    .then(res => {
                        this.listItem = res.data
                    })
                    .catch(err => console.log(err))

                const item = this.listItem.find(it => it[this.fieldName] == this.value)
                if(item)
                    this.itemSelected = item
            }
        },
        watch:{
            value(newValue,oldValue){
                if(newValue == ""){
                    this.itemSelected = {}
                }
            }
        },
        methods:{
            /**
             * Func : thay đổi trạng thái cho input khi focus (đổi màu border)
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            focusInput(){
                this.isFocus = true
            },

            /**
             * Func : thay đổi trạng thái cho input khi blur (đổi màu border)
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            blurInput(){
                this.isFocus = false
                this.handleBlur(this.value,this.fieldName)
            },

            /**
             * Func : Đóng mở listItem
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            toggleList(){
                this.isShowList = !this.isShowList
            },

            /**
             * Func : Xác định item có được select không
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} value của item 
             * @return true nếu được focus và ngược lại
             */
            isSelected(value){
                return this.itemSelected == value
            },

            /**
             * Func : Thay đổi item được chọn
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} item được chọn 
             */
            handleChangeValue(item){
                this.itemSelected = item
                this.isShowList = false
                this.changeValue(item[this.fieldName],this.fieldName)
            },

            /**
             * Func : lắng nghe sự kiện key up
             * Author : Lê Mạnh Hùng (18/7/2022)
             */
            handleKeyupDropdown(e){
                if(e.key == "Enter"){
                    this.isShowList = !this.isShowList
                }
            },

            /**
             * Func : Xử lý auto complete cho input
             * Author : Lê Mạnh Hùng (20/7/2022)
             * @param {*} e đối số mặc định của event 
             */
            handleAutoComplete(e){
                const itemSame = this.listItem.find(item => item[this.fieldDisplay].toLowerCase() == e.target.value.trim().toLowerCase())

                if(itemSame){
                    this.itemSelected = itemSame
                    this.changeValue(itemSame[this.fieldName],this.fieldName)
                }
            }
        }
    }
</script>

<style scoped>
@import url(../../CSS/components/dropdown.css);

</style>