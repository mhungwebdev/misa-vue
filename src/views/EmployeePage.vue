<template>
    <div class="misa-grid-wrapper">
        <div class="misa-grid-header">
            <div class="misa-grid-title">Nhân viên</div>

            <BaseButton :method="() => setStateForm(true)" :textButton="'Thêm mới nhân viên'" :typeButton="'contain'" />
        </div>

        <div class="misa-grid">
            <div class="misa-grid-func">
                <BaseInputWithIcon 
                    :keyupMethod="searchEmployee" 
                    :value="EmployeeStore.employeesFilter" 
                    :changeMethod="EmployeeStore.changeEmployeeFilter" 
                />

                <div @click="handleReload" class="misa-grid-reload misa-icon misa-icon24"></div>
            </div>
            <BaseTable 
                :showFormEdit="handleShowFormEdit" 
                :data="EmployeeStore.getData" 
                :fieldRender="fieldRenderEmployee" 
                :idRow="'EmployeeId'" 
                @delete-row="handleShowConfirmDelete"
                :listItemSelected="EmployeeStore.idSelected"
                :handleSelectItem="EmployeeStore.selectItem"
                :handleToggleAll="EmployeeStore.toggleSelectAll"
            />
            <BasePaging 
                :pageNumberRender="EmployeeStore.pageNumberRender" 
                :currentPage="EmployeeStore.pageNumber" 
                :totalRecord="EmployeeStore.totalRecord"
                :changePageNumber="changePageNumber"
                :pageSize="EmployeeStore.pageSize"
                :changePageSize="changePageSize"
                :totalPage="EmployeeStore.totalPage"
            />
        </div>

        <EmployeeForm v-if="EmployeeFormStore.isShowForm" />
        <BasePopup 
            :methodAccept="hidePopup" 
            v-if="EmployeeFormStore.errorForm" 
            :message="EmployeeFormStore.errorForm" 
        />

        <BasePopup 
            :methodCancel="handleCancelDelete" 
            :methodAccept="handleDeleteEmployee" 
            :message="messageConfirm" 
            :type="'confirm-delete'" 
            v-if="isShowConfirm"
        />
    </div>
</template>

<script>
import BaseInputWithIcon from "../components/Base/BaseInputWithIcon.vue"
import BaseTable from "../components/Base/BaseTable.vue"
import BasePaging from "../components/Base/BasePaging.vue"
import BaseButton from "../components/Base/BaseButton.vue"
import { employeeStore } from "../stores/Pages/EmployeeStore"
import { fieldRenderEmployee } from "../assets/Resource/static/fieldRender"
import { appStore } from "../stores/AppStore"
import { ref } from "vue"
import EmployeeForm from "../forms/EmployeeForm.vue"
import { employeeFormStore, FormMode } from "../stores/forms/EmployeeForm"
import BasePopup from "../components/Base/BasePopup.vue"

    export default {
        data(){
            const searchRef = ref(null)

            return {
                //ref dùng làm debounce tìm kiếm
                searchRef,
                //nhân viên đang được focus
                itemFocus:null,
                //message confirm xóa
                messageConfirm:"",
                //biến xác định ẩn hiện của popup confirm xóa
                isShowConfirm:false,
            }
        },
        components:{ BaseInputWithIcon, BaseTable, BasePaging, BaseButton, EmployeeForm, BasePopup },
        setup(){
            const EmployeeStore = employeeStore()
            const EmployeeFormStore = employeeFormStore()
            const AppStore = appStore()
            
            return {
                EmployeeStore,
                fieldRenderEmployee,
                AppStore,
                EmployeeFormStore
            }
        },
        async created(){
            this.AppStore.isLoading = true
            await this.EmployeeStore.loadData()
            this.AppStore.isLoading = false
        },
        methods:{
            /**
             * Func : chuyển trang
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} pageNumber được chọn 
             */
            async changePageNumber(pageNumber){
                this.AppStore.setStateLoading(true)
                await this.EmployeeStore.changePageNumber(pageNumber)
                this.AppStore.setStateLoading(false)
            },

            /**
             * Func : thay đổi size của trang
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} pageSize được chọn
             */
            async changePageSize(pageSize){
                this.AppStore.setStateLoading(true)
                await this.EmployeeStore.changePageSize(pageSize)
                this.AppStore.setStateLoading(false)
            },

            /**
             * Func : Tìm kiếm với từ khóa
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} e tham số mặc định
             * @param {*} keyword từ khóa tìm kiếm
             */
            async searchEmployee(e,keyword){
                if(e.key == "Enter" && this.EmployeeStore.employeesFilter != keyword){
                    this.reLoad(keyword)
                }

                if(keyword == ""){
                    this.searchRef = setTimeout(() => {
                        this.EmployeeStore.employeesFilter = ""
                        this.reLoad(keyword)
                    },1500)
                }

                if(keyword != "" && this.searchRef){
                    clearTimeout(this.searchRef)
                }
            },

            /**
             * Func : Tìm kiếm với từ khóa (tạo loading)
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} keyword từ khóa tìm kiếm
             */
            async reLoad(keyword){
                this.AppStore.setStateLoading(true)
                await this.EmployeeStore.search(keyword)
                this.AppStore.setStateLoading(false)
            },

            /**
             * Func : show form
             * Author : Lê Mạnh Hùng (15/7/2022)
             * @param {*} state trạng thái của form (true-hiện, false-ẩn)
             */
            setStateForm(state){
                this.EmployeeFormStore.isShowForm = state

                this.EmployeeFormStore.formMode = FormMode.FORM_ADD
            },

            /**
             * Func : ẩn pop up báo lỗi của form
             * Author : Lê Mạnh Hùng (18/7/2022)
             */
            hidePopup(){
                this.EmployeeFormStore.errorForm = ""
            },

            /**
             * Func : Xử lý show form với mode sửa
             * Author : Lê Mạnh Hùng (18/7/2022)
             * @param {*} id của đối tượng edit
             */
            handleShowFormEdit(id){
                this.EmployeeFormStore.formMode = FormMode.FORM_EDIT
                this.EmployeeFormStore.idEmployeeEdit = id
                this.EmployeeFormStore.initForm()
                this.EmployeeFormStore.isShowForm = true
            },

            /**
             * Func : xử lý chức năng reload
             * Author : Lê Mạnh Hùng (18/7/2022)
             */
            async handleReload(){
                this.AppStore.isLoading = true
                await this.EmployeeStore.loadData()
                this.AppStore.isLoading = false
            },

            /**
             * Func : Xử lý show popup confirm xóa nhân viên
             * Author : Lê Mạnh Hùng (18/7/2022)
             * @param {*} employee đối tượng nhân viên muốn xóa
             */
            handleShowConfirmDelete(employee){
                this.itemFocus = employee
                this.messageConfirm = `Bạn có thực sự muốn xóa Nhân viên <${employee["EmployeeCode"]}> không ?`
                this.isShowConfirm = true
            },

            /**
             * Func : Xử lý sự kiện hủy xóa
             * Author : Lê Mạnh Hùng (18/7/2022)
             */
            handleCancelDelete(){
                this.isShowConfirm = false
            },

            /**
             * Func : Xử lý sự kiện xóa nhân viên
             * Author : Lê Mạnh Hùng (18/7/2022)
             */
            async handleDeleteEmployee(){
                await this.EmployeeStore.deleteEmployee(this.itemFocus["EmployeeId"])
                        .then(async res => {
                            console.log(res)
                            if(res){
                                this.isShowConfirm = false
                                this.AppStore.isLoading = true
                                await this.EmployeeStore.loadData()
                                this.AppStore.isLoading = false
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
            }
        }
    }
</script>

<style>
@import url(../CSS/components/Grid.css);
</style>