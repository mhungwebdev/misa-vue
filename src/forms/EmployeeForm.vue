<template>
    <div tabindex="-1" @keydown="handleKeydownForm" id="misa-form-employee" class="misa-dialog-bg">
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
                            <BaseInput :autoFocus="autoFocus" class="misa-field160" :label="'Mã'" :tabIndex="1"
                                :fieldRequire="true" :fieldName="'employeeCode'"
                                :value="EmployeeFormStore.getEmployee.employeeCode"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.employeeCode"
                                :handleBlur="EmployeeFormStore.validate" />

                            <BaseInput class="misa-field226" :label="'Tên'" :tabIndex="2" :fieldRequire="true"
                                :fieldName="'fullName'" :value="EmployeeFormStore.getEmployee.fullName"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.fullName" :handleBlur="EmployeeFormStore.validate" />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseDropdown class="misa-field392" :fieldDisplay="'departmentName'" :label="'Đơn vị'"
                                :fieldRequired="true" :tabIndex="3" :api="api"
                                :listFieldRender="fieldDepartmentRenderDropdown" :fieldName="'departmentId'"
                                :value="EmployeeFormStore.getEmployee.departmentId"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.departmentId"
                                :handleBlur="EmployeeFormStore.validate" />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput :label="'Chức danh'" class="misa-field392" :tabIndex="4" :fieldRequire="false"
                                :fieldName="'positionName'" :value="EmployeeFormStore.getEmployee.positionName"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.positionName"
                                :handleBlur="EmployeeFormStore.validate" />
                        </div>
                    </div>

                    <div class="misa-form-employee-info-right">
                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseDateInput :label="'Ngày sinh'" :tabIndex="5" :style="{ marginRight: '16px', }"
                                :fieldName="'dateOfBirth'" :value="EmployeeFormStore.getEmployee.dateOfBirth"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.dateOfBirth"
                                :handleBlur="EmployeeFormStore.validate" />
                            <BaseRadioGroup :label="'Giới tính'" :tabIndex="6"
                                :listItem="[{ display: 'Nam', value: 0 }, { display: 'Nữ', value: 1 }, { display: 'Khác', value: 2 }]"
                                :value="EmployeeFormStore.getEmployee.gender"
                                :changeValue="EmployeeFormStore.changeValue" :fieldName="'gender'" />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput class="misa-field226" :tabIndex="7" :fieldRequire="false" :label="'Số CMND'"
                                :fieldName="'identityNumber'" :value="EmployeeFormStore.getEmployee.identityNumber"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.identityNumber"
                                :handleBlur="EmployeeFormStore.validate" :type="'number'" />
                            <BaseDateInput :tabIndex="8" class="misa-field160" :label="'Ngày cấp'"
                                :fieldName="'identityDate'" :value="EmployeeFormStore.getEmployee.identityDate"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.identityDate"
                                :handleBlur="EmployeeFormStore.validate" />
                        </div>

                        <div class="misa-form-employee-field-gr misa-field392">
                            <BaseInput class="misa-field392" :fieldRequire="false" :label="'Nơi cấp'" :tabIndex="9"
                                :fieldName="'identityPlace'" :value="EmployeeFormStore.getEmployee.identityPlace"
                                :changeValue="EmployeeFormStore.changeValue"
                                :error="EmployeeFormStore.getError.identityPlace"
                                :handleBlur="EmployeeFormStore.validate" />
                        </div>
                    </div>
                </div>

                <div class="misa-form-employee-contact">
                    <div class="misa-form-employee-field-gr">
                        <BaseInput class="misa-field810" :label="'Địa chỉ'" :fieldRequire="false" :tabIndex="10"
                            :fieldName="'address'" :value="EmployeeFormStore.getEmployee.address"
                            :changeValue="EmployeeFormStore.changeValue" :error="EmployeeFormStore.getError.address"
                            :handleBlur="EmployeeFormStore.validate" />
                    </div>

                    <div class="misa-form-employee-field-gr">
                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="11" :label="'DT Di động'"
                            :fieldName="'phoneNumber'" :value="EmployeeFormStore.getEmployee.phoneNumber"
                            :changeValue="EmployeeFormStore.changeValue" :error="EmployeeFormStore.getError.phoneNumber"
                            :handleBlur="EmployeeFormStore.validate" :type="'number'" />
                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="12" :label="'DT Cố định'"
                            :type="'number'" :fieldName="'landlineNumber'"
                            :value="EmployeeFormStore.getEmployee.landlineNumber"
                            :changeValue="EmployeeFormStore.changeValue"
                            :error="EmployeeFormStore.getError.landlineNumber"
                            :handleBlur="EmployeeFormStore.validate" />
                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="13" :label="'Email'"
                            :fieldName="'email'" :value="EmployeeFormStore.getEmployee.email"
                            :changeValue="EmployeeFormStore.changeValue" :error="EmployeeFormStore.getError.email"
                            :handleBlur="EmployeeFormStore.validate" />
                    </div>

                    <div class="misa-form-employee-field-gr">
                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="14"
                            :label="'Tài khoản ngân hàng'" :type="'number'" :fieldName="'bankAccount'"
                            :value="EmployeeFormStore.getEmployee.bankAccount"
                            :changeValue="EmployeeFormStore.changeValue" :error="EmployeeFormStore.getError.bankAccount"
                            :handleBlur="EmployeeFormStore.validate" />

                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="15" :label="'Tên ngân hàng'"
                            :fieldName="'bankName'" :value="EmployeeFormStore.getEmployee.bankName"
                            :changeValue="EmployeeFormStore.changeValue" :error="EmployeeFormStore.getError.bankName"
                            :handleBlur="EmployeeFormStore.validate" />

                        <BaseInput class="misa-field160" :fieldRequire="false" :tabIndex="16" :label="'Chi nhánh'"
                            :fieldName="'bankBranch'" :value="EmployeeFormStore.getEmployee.bankBranch"
                            :changeValue="EmployeeFormStore.changeValue" :error="EmployeeFormStore.getError.bankBranch"
                            :handleBlur="EmployeeFormStore.validate" />
                    </div>
                </div>

                <div class="misa-form-employee-line"></div>

                <div class="misa-form-employee-button-gr">
                    <div class="misa-form-employee-button-left">
                        <BaseButton @keyup="e => { if (e.key == 'Enter') handleHideForm() }" @click="handleHideForm"
                            :tabIndex="17" :textButton="'Hủy'" />
                    </div>

                    <div class="misa-form-employee-button-right">
                        <BaseButton @keyup="e => { if (e.key == 'Enter') handleSaveForm() }" :method="handleSaveForm"
                            :tooltip="'(Ctrl + S)'" :tabIndex="18" :textButton="'Cất'" :typeButton="'outline'" />
                        <BaseButton @click="handleSaveAndAdd" :tooltip="'(Ctrl + Shift + S)'"
                            @keyup="handleKeyupLastButton" :tabIndex="19" :textButton="'Cất và thêm'"
                            :typeButton="'contain'" ref="btnSaveAndAdd" />
                    </div>
                </div>
            </div>
        </div>

        <BasePopup :methodCancel="handleCancelConfirmForm" :methodAccept="handleAcceptConfirm"
            :methodReject="handleHideForm" :message="'Dữ liệu đã thay đổi. Bạn có muốn cất không ?'"
            :type="'confirm-form'" :textAccept="'Có'" v-if="EmployeeFormStore.isShowConfirmForm">
            <div class="misa-popup-icon misa-icon misa-popup-icon-confirm-form"></div>
        </BasePopup>

        <BasePopup :methodAccept="() => EmployeeFormStore.errorDuplicateEmployeeCode = ''"
            :message="EmployeeFormStore.errorDuplicateEmployeeCode" :textAccept="'Đóng'" :type="'error-popup'"
            v-if="EmployeeFormStore.errorDuplicateEmployeeCode">
            <div :class="{ 'misa-popup-icon': true, 'misa-icon': true }"></div>
        </BasePopup>
    </div>
</template>

<script>
import { API } from '../assets/Resource/api'
import { fieldDepartmentRenderDropdown } from '../assets/Resource/static/fieldRender'
import { FormMode } from '../Enum/Enum';
import { appStore } from '../stores/AppStore';
import { employeeFormStore } from '../stores/forms/EmployeeForm';
import { employeeStore } from '../stores/Pages/EmployeeStore';

export default {
    data() {
        return {
            //biến dùng để focus input đầu tiên của form
            autoFocus: true,
        }
    },
    setup() {
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
        handleKeyupLastButton(e) {
            if (e.key == "Tab")
                this.autoFocus = !this.autoFocus
        },

        /**
         * Func : Xử lý sự kiện lưu form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleSaveForm() {
            if (!this.EmployeeFormStore.isChanged() && this.EmployeeFormStore.formMode == FormMode.FORM_EDIT) {
                this.EmployeeFormStore.isShowForm = false
            } else {
                const res = await this.EmployeeFormStore.saveForm()
                if (res) {
                    const AppStore = new appStore()
                    AppStore.toastMessage = "Lưu thành công"
                    setTimeout(() => {
                        AppStore.toastMessage = ""
                    }, 3000);

                    this.EmployeeFormStore.isShowForm = false
                    this.EmployeeStore.loadData()
                }
            }
        },

        /**
         * Func : Xử lý sự kiện lưu form và thêm mới
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleSaveAndAdd() {
            if (!this.EmployeeFormStore.isChanged() && this.EmployeeFormStore.formMode == FormMode.FORM_EDIT) {
                this.EmployeeFormStore.formMode = FormMode.FORM_ADD
                this.EmployeeFormStore.initForm()
                this.autoFocus = !this.autoFocus
            } else {
                const res = await this.EmployeeFormStore.saveForm()
                if (res) {
                    const AppStore = new appStore()
                    AppStore.toastMessage = "Lưu thành công"
                    setTimeout(() => {
                        AppStore.toastMessage = ""
                    }, 3000);

                    this.EmployeeStore.loadData()
                    this.EmployeeFormStore.formMode = FormMode.FORM_ADD
                    this.EmployeeFormStore.initForm()
                    this.autoFocus = !this.autoFocus
                }
            }
        },

        /**
         * Func : Xử lý sự kiện accept confirm popup
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleAcceptConfirm() {
            this.EmployeeFormStore.isShowConfirmForm = false
            await this.handleSaveForm()
        },

        /**
         * Func : Xử lý sự kiện hủy confirm popup
         */
        handleCancelConfirmForm() {
            this.EmployeeFormStore.isShowConfirmForm = false
        },

        /**
         * Func : Xử lý sự kiện ẩn form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleHideForm() {
            this.EmployeeFormStore.isShowForm = false
        },

        /**
         * Func : Xử lý sự kiện ẩn form (nút X)
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleCloseForm() {
            const isChanged = this.EmployeeFormStore.isChanged()

            if (isChanged) {
                this.EmployeeFormStore.isShowConfirmForm = true
            } else {
                this.handleHideForm()
            }
        },

        /**
         * Func : lắng nghe keydown trên form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleKeydownForm(e) {
            if (e.key == "Escape")
                this.handleCloseForm()

            if (e.ctrlKey && e.key.toLowerCase() === "s" && !e.shiftKey) {
                e.preventDefault()
                this.handleSaveForm()
            }

            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
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