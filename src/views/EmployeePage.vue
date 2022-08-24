<template>
    <div class="misa-grid-wrapper">
        <div class="misa-toast-error-list">
            <BaseToast v-for="(message, index) in EmployeeFormStore.listErrorServer" :key="{ index }"
                :style="{ top: `${index * 80 + 10}` + 'px', animationDuration: `${index * 0.2 + 0.3}s` }"
                :type="'error'" :message="message">
                <div class="misa-icon misa-icon-error"></div>
            </BaseToast>
        </div>

        <BaseToast
            v-if="EmployeeStore.toastMessage"
            :type="EmployeeStore.typeToast"
            :message="EmployeeStore.toastMessage"
            :style="{animationDuration:'.3s'}"
        >
            <div class="misa-icon misa-icon-error"></div>
        </BaseToast>

        <div class="misa-grid-header">
            <div class="misa-grid-title">Nhân viên</div>

            <BaseButton :style="{ height: '36px', lineHeight: '36px' }" :method="() => setStateForm(true)"
                :textButton="'Thêm mới nhân viên'" :typeButton="'contain'" />
        </div>

        <div class="misa-grid">
            <div class="misa-grid-func">
                <div class="misa-grid-fun-left">
                    <BaseButton
                        @click="(e) => EmployeeStore.idSelected.length > 1 ? EmployeeStore.isShowInteractMulti = !EmployeeStore.isShowInteractMulti : null"
                        class="misa-button-interact-multi" :textButton="'Thực hiện hàng loạt'">
                        <div :style="{ opacity: EmployeeStore.idSelected.length > 1 ? '1' : '' }"
                            class="misa-button-interact-multi-arrow misa-icon"></div>
                    </BaseButton>
                    <div v-if="EmployeeStore.idSelected.length > 1 && EmployeeStore.isShowInteractMulti"
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

                    <label @click="EmployeeStore.exportData" class="misa-grid-export-data misa-icon misa-icon24">
                        <input :style="{ display: 'none' }" id="open-project" type="file" webkitdirectory directory />
                        <div class="misa-grid-tooltip">Xuất ra Excel</div>
                    </label>
                </div>
            </div>
            <BaseTable :showFormEdit="handleShowFormEdit" :data="EmployeeStore.getData"
                :fieldRender="fieldRenderEmployee" :idRow="'employeeId'" @delete-row="handleShowConfirmDelete"
                :listItemSelected="EmployeeStore.idSelected" :handleSelectItem="EmployeeStore.selectItem"
                :handleToggleAll="EmployeeStore.toggleSelectAll" @duplicate-row="handleDuplicateItem" />

            <BasePaging :pageNumberRender="EmployeeStore.pageNumberRender" :currentPage="EmployeeStore.pageNumber"
                :totalRecord="EmployeeStore.totalRecord" :changePageNumber="changePageNumber"
                :pageSize="EmployeeStore.pageSize" :changePageSize="changePageSize"
                :totalPage="EmployeeStore.totalPage" />
        </div>

        <EmployeeForm v-if="EmployeeFormStore.isShowForm" />

        <BasePopup :horizontalButton="'space-between'" :methodCancel="handleCancelDelete"
            :methodAccept="handleDeleteEmployee" :message="messageConfirm" :textAccept="'Có'" :type="PopupMode.CONFIRM_DELETE"
            v-if="isShowConfirm">
            <div :class="{ 'misa-popup-icon': true, 'misa-icon': true }"></div>
        </BasePopup>
    </div>
</template>

<script>
import { ref } from "vue"
import { fieldRenderEmployee } from "../assets/Resource/static/fieldRender"
import { DeleteMode, FormMode, PopupMode, ToastMode } from "../Enum/Enum"
import EmployeeForm from "../forms/EmployeeForm.vue"
import { Resource } from "../Resource/Resource"
import { appStore } from "../stores/AppStore"
import { employeeFormStore } from "../stores/forms/EmployeeForm"
import { employeeStore } from "../stores/Pages/EmployeeStore"

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
            ToastMode,
            PopupMode
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
        setStateForm(state) {
            this.EmployeeFormStore.formMode = FormMode.FORM_ADD
            this.EmployeeFormStore.initForm()
            this.EmployeeFormStore.isShowForm = state
        },

        /**
         * Func : Xử lý show form với mode sửa
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @param {*} id của đối tượng edit
         */
        async handleShowFormEdit(id) {
            this.EmployeeFormStore.formMode = FormMode.FORM_EDIT
            this.EmployeeFormStore.idEmployeeEdit = id
            await this.EmployeeFormStore.initForm(id)
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
        },

        /**
         * Func : Xử lý show form duplicate
         * Author : Lê Mạnh Hùng (13/8/2022)
         * @param {*} id của đối tượng muốn duplicate
         */
        async handleDuplicateItem(id) {
            this.EmployeeFormStore.formMode = FormMode.FORM_DUPLICATE
            await this.EmployeeFormStore.initForm(id)
            this.EmployeeFormStore.isShowForm = true
        }
    }
}
</script>

<style>
@import url(../CSS/components/Grid.css);
</style>