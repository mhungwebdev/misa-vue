<template>
    <div @keydown="handleKeydownForm" id="misa-form-employee" class="misa-dialog-bg">
        <div class="misa-dialog-wrapper">
            <div class="misa-dialog-icon">
                <div class="misa-dialog-icon-question misa-icon misa-icon24"></div>
                <div @click="handleCloseForm" class="misa-dialog-icon-close misa-icon misa-icon24">
                    <div class="misa-icon-tooltip">Đóng (ESC)</div>
                </div>
            </div>
            <div class="misa-form-employee">
                <div class="misa-form-employee-header">
                    <div class="misa-form-employee-title">Thông tin nhân viên</div>
                    <div class="misa-form-employee-header-options">
                        <div class="misa-form-employee-header-option">
                            <BaseCheckbox />
                            <div>Là khách hàng</div>
                        </div>

                        <div class="misa-form-employee-header-option">
                            <BaseCheckbox />
                            <div>Là nhà cung cấp</div>
                        </div>
                    </div>
                </div>

                <div class="misa-form-employee-info-general">
                    <div class="misa-form-employee-info-left">
                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput 
                                :autoFocus="autoFocus" 
                                class="misa-field160" 
                                :label="'Mã'" 
                                :tabIndex="1" 
                                :fieldRequire="true" 
                                :fieldName="'EmployeeCode'"
                                :value="EmployeeFormStore.getEmployee.EmployeeCode"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.EmployeeCode"
                                :handleBlur="EmployeeFormStore.validate"
                            />

                            <BaseInput 
                                class="misa-field226" 
                                :label="'Tên'" 
                                :tabIndex="2" 
                                :fieldRequire="true" 
                                :fieldName="'FullName'"
                                :value="EmployeeFormStore.getEmployee.FullName"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.FullName"
                                :handleBlur="EmployeeFormStore.validate"
                            />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseDropdown 
                                class="misa-field392" 
                                :fieldDisplay="'DepartmentName'" 
                                :label="'Đơn vị'"
                                :fieldRequired="true"
                                :tabIndex="3"   
                                :api="api"
                                :listFieldRender="fieldDepartmentRenderDropdown" 
                                :fieldName="'DepartmentId'"
                                :value="EmployeeFormStore.getEmployee.DepartmentId"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.DepartmentId"
                                :handleBlur="EmployeeFormStore.validate"
                            />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput 
                                :label="'Chức danh'" 
                                class="misa-field392" 
                                :tabIndex="4" 
                                :fieldRequire="false" 
                                :fieldName="'PositionName'"
                                :value="EmployeeFormStore.getEmployee.PositionName"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.PositionName"  
                                :handleBlur="EmployeeFormStore.validate"
                            />
                        </div>
                    </div>

                    <div class="misa-form-employee-info-right">
                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseDateInput 
                                :label="'Ngày sinh'" 
                                :tabIndex="5" 
                                :style="{marginRight: '32px',}" 
                                :fieldName="'DateOfBirth'"
                                :value="EmployeeFormStore.getEmployee.DateOfBirth"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.DateOfBirth"    
                                :handleBlur="EmployeeFormStore.validate"
                            />
                            <BaseRadioGroup 
                                :label="'Giới tính'" 
                                :tabIndex="6" 
                                :listItem="[{display: 'Nam',value:0},{display: 'Nữ',value:1},{display: 'Khác',value:2}]"
                                :value="EmployeeFormStore.getEmployee.Gender"
                                :changeValue="EmployeeFormStore.changeValue"
                                :fieldName="'Gender'"
                            />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput 
                                class="misa-field226" 
                                :tabIndex="7" 
                                :fieldRequire="false" 
                                :label="'Số CMND'" 
                                :fieldName="'IdentityNumber'"
                                :value="EmployeeFormStore.getEmployee.IdentityNumber"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.IdentityNumber"
                                :handleBlur="EmployeeFormStore.validate"
                                :type="'number'"
                            />
                            <BaseDateInput 
                                :tabIndex="8" 
                                class="misa-field160" 
                                :label="'Ngày cấp'" 
                                :fieldName="'IdentityDate'"
                                :value="EmployeeFormStore.getEmployee.IdentityDate"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.IdentityDate"    
                                :handleBlur="EmployeeFormStore.validate"
                            />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput 
                                class="misa-field392" 
                                :fieldRequire="false" 
                                :label="'Nơi cấp'" 
                                :tabIndex="9" 
                                :fieldName="'IdentityPlace'"
                                :value="EmployeeFormStore.getEmployee.IdentityPlace"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.IdentityPlace"   
                                :handleBlur="EmployeeFormStore.validate"
                            />
                        </div>
                    </div>
                </div>

                <div class="misa-form-employee-contact">
                    <div class="misa-form-employee-field-gr">
                        <BaseInput 
                            class="misa-field816" 
                            :label="'Địa chỉ'" 
                            :fieldRequire="false" 
                            :tabIndex="10" 
                            :fieldName="'Address'"
                            :value="EmployeeFormStore.getEmployee.Address"
                            :changeValue="EmployeeFormStore.changeValue"
                            :error="EmployeeFormStore.getError.Address"  
                            :handleBlur="EmployeeFormStore.validate"
                        />
                    </div>

                    <div class="misa-form-employee-field-gr">
                        <BaseInput 
                            class="misa-field160" 
                            :fieldRequire="false" 
                            :tabIndex="11" 
                            :label="'DT Di động'" 
                            :fieldName="'PhoneNumber'"
                            :value="EmployeeFormStore.getEmployee.PhoneNumber"
                            :changeValue="EmployeeFormStore.changeValue"
                            :error="EmployeeFormStore.getError.PhoneNumber"
                            :handleBlur="EmployeeFormStore.validate"
                            :type="'number'"
                        />
                        <BaseInput 
                            class="misa-field160" 
                            :fieldRequire="false" 
                            :tabIndex="12" 
                            :label="'DT Cố định'"
                            :type="'number'"
                        />
                        <BaseInput 
                            class="misa-field160" 
                            :fieldRequire="false" 
                            :tabIndex="13" 
                            :label="'Email'" 
                            :fieldName="'Email'"
                            :value="EmployeeFormStore.getEmployee.Email"
                            :changeValue="EmployeeFormStore.changeValue"
                            :error="EmployeeFormStore.getError.Email"    
                            :handleBlur="EmployeeFormStore.validate"
                        />
                    </div>

                    <div class="misa-form-employee-field-gr">
                        <BaseInput 
                            class="misa-field160" 
                            :fieldRequire="false" 
                            :tabIndex="14" 
                            :label="'Tài khoản ngân hàng'" 
                            :type="'number'"
                        />
                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="15" :label="'Tên ngân hàng'"/>
                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="16" :label="'Chi nhánh'" />
                    </div>
                </div>

                <div class="misa-form-employee-line"></div>

                <div class="misa-form-employee-button-gr">
                    <div class="misa-form-employee-button-left">
                        <BaseButton @click="handleHideForm" :tabIndex="17" :textButton="'Hủy'" />
                    </div>

                    <div class="misa-form-employee-button-right">
                        <BaseButton :method="handleSaveForm" :tooltip="'(Ctrl + S)'" :tabIndex="18" :textButton="'Cất'" :typeButton="'outline'"/>
                        <BaseButton @click="handleSaveAndAdd" :tooltip="'(Ctrl + Shift + S)'" @keyup="handleKeyupLastButton" :tabIndex="19" :textButton="'Cất và thêm'" :typeButton="'contain'"/>
                    </div>
                </div>
            </div>
        </div>

        <BasePopup 
            :methodCancel="handleCancelConfirmForm" 
            :methodAccept="handleAcceptConfirm" 
            :methodReject="handleHideForm"
            :message="'Dữ liệu đã thay đổi. Bạn có muốn cất không ?'" 
            :type="'confirm-form'" 
            v-if="EmployeeFormStore.isShowConfirmForm"
        />
    </div>
</template>

<script>
import BaseInput from '../components/Base/BaseInput.vue';
import BaseDropdown from '../components/Base/BaseDropdown.vue';
import {API} from '../assets/Resource/api'
import {fieldDepartmentRenderDropdown} from '../assets/Resource/static/fieldRender'
import BaseCheckbox from '../components/Base/BaseCheckbox.vue';
import BaseDateInput from '../components/Base/BaseDateInput.vue';
import BaseRadioGroup from '../components/Base/BaseRadioGroup.vue';
import BaseButton from '../components/Base/BaseButton.vue';
import { employeeFormStore, FormMode } from '../stores/forms/EmployeeForm';
import { employeeStore } from '../stores/Pages/EmployeeStore';
import BasePopup from '../components/Base/BasePopup.vue';

    export default {
    components: { BaseInput, BaseDropdown, BaseCheckbox, BaseDateInput, BaseRadioGroup, BaseButton, BasePopup },
    data(){
        return {
            //biến dùng để focus input đầu tiên của form
            autoFocus: true,
        }
    },
    setup(){
        //api lấy dữ liệu phòng ban
        const api = API.DEPARTMENT_API
        //store của form nhân viên
        const EmployeeFormStore = employeeFormStore()
        //store của page nhân viên
        const EmployeeStore = employeeStore()

        return {
            api,
            fieldDepartmentRenderDropdown,
            EmployeeFormStore,
            EmployeeStore
        }
    },
    methods: {
        /**
         * Func : xử lý tab nút cuối của form
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @param {*} e đối số mặc định của event 
         */
        handleKeyupLastButton(e){
            if(e.key == "Tab")
                this.autoFocus = !this.autoFocus
        },

        /**
         * Func : Xử lý sự kiện lưu form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleSaveForm(){
            const res = await this.EmployeeFormStore.saveForm()
            if(res){
                this.EmployeeFormStore.isShowForm = false
                this.EmployeeStore.loadData()
            }
        },

        /**
         * Func : Xử lý sự kiện lưu form và thêm mới
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleSaveAndAdd(){
            const res = await this.EmployeeFormStore.saveForm()
            if(res){
                this.EmployeeStore.loadData()
                this.EmployeeFormStore.formMode = FormMode.FORM_ADD
                this.EmployeeFormStore.initForm()
                this.autoFocus = !this.autoFocus
            }
        },

        /**
         * Func : Xử lý sự kiện accept confirm popup
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleAcceptConfirm(){
            this.EmployeeFormStore.isShowConfirmForm = false
            await this.handleSaveForm()
        },

        /**
         * Func : Xử lý sự kiện hủy confirm popup
         */
        handleCancelConfirmForm(){
            this.EmployeeFormStore.isShowConfirmForm = false
        },

        /**
         * Func : Xử lý sự kiện ẩn form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleHideForm(){
            this.EmployeeFormStore.isShowForm = false
        },

        /**
         * Func : Xử lý sự kiện ẩn form (nút X)
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleCloseForm(){
            const isChanged = this.EmployeeFormStore.isChanged()

            if(isChanged){
                this.EmployeeFormStore.isShowConfirmForm = true
            }else{
                this.handleHideForm()
            }
        },

        /**
         * Func : lắng nghe keydown trên form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleKeydownForm(e){
            if(e.key == "Escape")
                this.handleCloseForm()

            if(e.ctrlKey && e.key.toLowerCase() === "s" && !e.shiftKey){
                e.preventDefault()
                this.handleSaveForm()
            }

            if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s"){
                e.preventDefault()
                this.handleSaveAndAdd()
            }
        },
    }
}
</script>

<style scoped>
@import url(../CSS/form/employee.css);
@import url(../CSS/components/dialog.css);
</style>