<template>
    <div class="misa-grid-wrapper">
        <div class="misa-toast-error-list">
            <BaseToast v-for="(message, index) in EmployeeFormStore.listErrorServer" :key="{ index }"
                :style="{ top: `${index * 80 + 10}` + 'px', animationDuration: `${index * 0.2 + 0.3}s` }"
                :type="'error'" :message="message">
                <div class="misa-icon misa-icon-error"></div>
            </BaseToast>
        </div>
        <div class="misa-grid-header">
            <div class="misa-grid-title">Nhân viên</div>

            <BaseButton :method="() => setStateForm(true)" :textButton="'Thêm mới nhân viên'" :typeButton="'contain'" />
        </div>

        <div class="misa-grid">
            <div class="misa-grid-func">
                <div class="misa-grid-fun-left">
                    <BaseButton
                        @click="() => EmployeeStore.idSelected.length > 0 ? EmployeeStore.isShowInteractMulti = !EmployeeStore.isShowInteractMulti : null"
                        class="misa-button-interact-multi" :textButton="'Thực hiện hàng loạt'">
                        <div :style="{ opacity: EmployeeStore.idSelected.length > 0 ? '1' : '' }"
                            class="misa-button-interact-multi-arrow misa-icon"></div>
                    </BaseButton>
                    <div v-if="EmployeeStore.idSelected.length > 0 && EmployeeStore.isShowInteractMulti"
                        class="misa-func-interact-multi" @click="handleDeleteMulti">
                        Xóa
                    </div>
                </div>

                <div class="misa-grid-func-right">
                    <BaseInputWithIcon :valueProp="EmployeeStore.employeesFilter"
                        :onHandleInput="EmployeeStore.search" />

                    <div @click="handleReload" class="misa-grid-reload misa-icon misa-icon24">
                        <div class="misa-grid-tooltip">Lấy lại dữ liệu</div>
                    </div>

                    <div class="misa-grid-export-data misa-icon misa-icon24">
                        <div class="misa-grid-tooltip">Xuất ra Excel</div>
                    </div>
                </div>
            </div>
            <BaseTable :showFormEdit="handleShowFormEdit" :data="EmployeeStore.getData"
                :fieldRender="fieldRenderEmployee" :idRow="'employeeId'" @delete-row="handleShowConfirmDelete"
                :listItemSelected="EmployeeStore.idSelected" :handleSelectItem="EmployeeStore.selectItem"
                :handleToggleAll="EmployeeStore.toggleSelectAll" />

            <BasePaging :pageNumberRender="EmployeeStore.pageNumberRender" :currentPage="EmployeeStore.pageNumber"
                :totalRecord="EmployeeStore.totalRecord" :changePageNumber="changePageNumber"
                :pageSize="EmployeeStore.pageSize" :changePageSize="changePageSize"
                :totalPage="EmployeeStore.totalPage" />
        </div>

        <EmployeeForm v-if="EmployeeFormStore.isShowForm" />
        <BasePopup :methodAccept="hidePopup" v-if="EmployeeFormStore.errorForm" :message="EmployeeFormStore.errorForm"
            :type="'error-popup'" :textAccept="'Đóng'">
            <div class="misa-popup-icon misa-icon misa-popup-icon-error-form"></div>
        </BasePopup>

        <BasePopup :methodCancel="handleCancelDelete" :methodAccept="handleDeleteEmployee" :message="messageConfirm"
            :textAccept="'Có'" :type="'confirm-delete'" v-if="isShowConfirm">
            <div :class="{ 'misa-popup-icon': true, 'misa-icon': true }"></div>
        </BasePopup>
    </div>
</template>

<script>
import { ref } from "vue"
import { fieldRenderEmployee } from "../assets/Resource/static/fieldRender"
import { FormMode, ToastMode,DeleteMode } from "../Enum/Enum"
import EmployeeForm from "../forms/EmployeeForm.vue"
import { appStore } from "../stores/AppStore"
import { employeeFormStore } from "../stores/forms/EmployeeForm"
import { employeeStore } from "../stores/Pages/EmployeeStore"
import {Resource} from "../Resource/Resource"

export default {
    components: { EmployeeForm },
    data() {
        const searchRef = ref(null)

        return {
            //ref dùng làm debounce tìm kiếm
            searchRef,
            //nhân viên đang được focus
            itemFocus: null,
            //message confirm xóa
            messageConfirm: "",
            //biến xác định ẩn hiện của popup confirm xóa
            isShowConfirm: false,
            //mảng thông báo toast
            listMessageToast: []
        }
    },
    setup() {
        const EmployeeStore = employeeStore()
        const EmployeeFormStore = employeeFormStore()
        const AppStore = appStore()

        return {
            EmployeeStore,
            fieldRenderEmployee,
            AppStore,
            EmployeeFormStore,
            DeleteMode,
        }
    },

    async created() {
        this.AppStore.isLoading = true
        await this.EmployeeStore.loadData()
        this.AppStore.isLoading = false
    },
    methods: {
        /**
         * Func : chuyển trang
         * Author : Lê Mạnh Hùng (15/7/2022)
         * @param {*} pageNumber được chọn 
         */
        async changePageNumber(pageNumber) {
            this.AppStore.setStateLoading(true)
            await this.EmployeeStore.changePageNumber(pageNumber)
            this.AppStore.setStateLoading(false)
        },

        /**
         * Func : thay đổi size của trang
         * Author : Lê Mạnh Hùng (15/7/2022)
         * @param {*} pageSize được chọn
         */
        async changePageSize(pageSize) {
            this.AppStore.setStateLoading(true)
            await this.EmployeeStore.changePageSize(pageSize)
            this.AppStore.setStateLoading(false)
        },

        /**
         * Func : show form
         * Author : Lê Mạnh Hùng (15/7/2022)
         * @param {*} state trạng thái của form (true-hiện, false-ẩn)
         */
        async setStateForm(state) {
            this.EmployeeFormStore.formMode = FormMode.FORM_ADD
            await this.EmployeeFormStore.initForm()
            this.EmployeeFormStore.isShowForm = state
        },

        /**
         * Func : ẩn pop up báo lỗi của form
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        hidePopup() {
            this.EmployeeFormStore.errorForm = ""
        },

        /**
         * Func : Xử lý show form với mode sửa
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @param {*} id của đối tượng edit
         */
        async handleShowFormEdit(id) {
            this.EmployeeFormStore.formMode = FormMode.FORM_EDIT
            this.EmployeeFormStore.idEmployeeEdit = id
            await this.EmployeeFormStore.initForm()
            this.EmployeeFormStore.isShowForm = true
        },

        /**
         * Func : xử lý chức năng reload
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleReload() {
            this.AppStore.isLoading = true
            this.EmployeeStore.employeesFilter = ""
            await this.EmployeeStore.loadData()
            this.AppStore.isLoading = false
        },

        /**
         * Func : Xử lý show popup confirm xóa nhân viên
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @param {*} employee đối tượng nhân viên muốn xóa
         */
        handleShowConfirmDelete(employee) {
            if (this.EmployeeStore.deleteMode == DeleteMode.ONE) {
                this.itemFocus = employee
                this.messageConfirm = Resource.messageDeleteOneEmployee(employee["employeeCode"])
            } else {
                this.messageConfirm = Resource.confirmDeleteMultiEmployeeMessage
            }
            this.isShowConfirm = true
        },

        /**
         * Func : Xử lý sự kiện hủy xóa
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        handleCancelDelete() {
            this.isShowConfirm = false
        },

        handleDeleteMulti() {
            this.EmployeeStore.deleteMode = DeleteMode.MULTI
            this.handleShowConfirmDelete()
        },

        /**
         * Func : Xử lý sự kiện xóa nhân viên
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        async handleDeleteEmployee() {
            let res = null
            if (this.EmployeeStore.deleteMode == DeleteMode.ONE) {
                res = await this.EmployeeStore.deleteEmployee(this.itemFocus["employeeId"])
            } else {
                res = await this.EmployeeStore.deleteMultiEmployee()
            }

            if (res) {
                this.AppStore.typeToast = ToastMode.SUCCESS
                this.AppStore.toastMessage = Resource.messageDeleteSuccessEmployee(res)
                setTimeout(() => this.AppStore.toastMessage = "", 3000)
                this.AppStore.isLoading = true
                await this.EmployeeStore.loadData()
                this.AppStore.isLoading = false
            }

            if (!res) {
                this.AppStore.typeToast = ToastMode.ERROR
                this.AppStore.toastMessage = Resource.errorMessage
                setTimeout(() => this.AppStore.toastMessage = "", 3000)
            }

            this.isShowConfirm = false
        }
    }
}
</script>

<style>
@import url(../CSS/components/Grid.css);
</style>