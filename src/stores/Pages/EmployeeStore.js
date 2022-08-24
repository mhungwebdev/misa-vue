import axios from 'axios'
import { defineStore } from 'pinia'
import { API } from '../../assets/Resource/api'
import { DeleteMode, ToastMode } from '../../Enum/Enum'
import { CommonJS } from '../../JS/Common/Common'
import { Resource } from '../../Resource/Resource'

export const employeeStore = defineStore({
  id: 'EmployeeStore',
  state: () => ({
    //số bản ghi trên một trang
    pageSize: 10,
    //trang hiện tại
    pageNumber: 1,
    //tổng số record
    totalRecord: 100,
    //tổng số trang
    totalPage: 100,
    //api
    baseApi: API.EMPLOYEE_API,
    //string filter
    employeesFilter: '',
    //mảng page number sẽ render
    pageNumberRender: [],
    //dữ liệu
    data: [],
    //mảng id được chọn
    idSelected: [],
    //status chọn tất cả
    isSelectAll: false,
    //status ẩn hiện của chức năng xóa nhiều
    isShowInteractMulti: false,
    //trạng thái xóa
    deleteMode: DeleteMode.ONE,
    //biến dùng làm delay search
    searchTimer:null,
    //kiểu của toast
    typeToast:ToastMode.ERROR,
    //message toast
    toastMessage:''
  }),
  getters: {
    getData: (state) => state.data,
    getApi: (state) => {
      let api = `${state.baseApi}/filter?pageSize=${state.pageSize}&pageNumber=${state.pageNumber}`

      if (state.employeesFilter != "")
        api += `&keyword=${state.employeesFilter}`

      return api
    }
  },
  actions: {
    /**
     * Func : chức năng load data
     * Author : Lê Mạnh Hùng (15/7/2022)
     */
    async loadData() {
      const api = this.getApi
      this.idSelected = []
      this.isSelectAll = false

      await axios.get(api)
        .then(res => {
          console.log(res)
          const { totalPage, totalRecord, data } = res.data
          this.data = data
          this.totalPage = totalPage
          this.totalRecord = totalRecord
          this.pageNumberRender = CommonJS.getListPageNumber(totalPage, this.pageNumber)
        })
        .catch(err => {
          this.typeToast = ToastMode.ERROR
          this.toastMessage = Resource.errorMessage
          setTimeout(() => this.toastMessage = "", 3000)
          console.log(err)
        })
    },

    /**
     * Func : Thay đổi page number
     * Author : Lê Mạnh Hùng (16/7/2022)
     * @param {*} pageNumber số trang muốn thay đổi
     */
    async changePageNumber(pageNumber) {
      this.pageNumber = pageNumber
      await this.loadData()
    },

    /**
     * Func : Thay đổi page size
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} pageSize kích thước trang muốn thay đổi
     */
    async changePageSize(pageSize) {
      this.pageSize = pageSize
      this.pageNumber = 1
      await this.loadData()
    },

    /**
     * Func : chức năng tìm kiếm
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} keyword từ khóa tìm kiếm
     */
    search(keyword) {
      try {
        if(this.searchTimer)
          clearTimeout(this.searchTimer);
  
        this.searchTimer = setTimeout(async () => {
          this.employeesFilter = keyword
          this.pageNumber = 1
          await this.loadData()
        },500)
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Func : Chọn item
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} id 
     */
    selectItem(id) {
      if (this.idSelected.includes(id))
        this.idSelected = this.idSelected.filter(i => i != id)
      else
        this.idSelected.push(id)

      if (this.idSelected.length == this.data.length)
        this.isSelectAll = true
      else
        this.isSelectAll = false

      if (this.idSelected.length == 0)
        this.isShowInteractMulti = false
    },

    /**
     * Func : Xóa một nhân viên
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} id nhân viên muốn xóa
     * @returns 1 nếu xóa thành công hoặc undefined nếu fail
     */
    async deleteEmployee(id) {
      let result = undefined
      await axios.delete(`${this.baseApi}/${id}`)
        .then(res => {
          console.log(res)
          result = res.data
        }).catch(err => {
          console.log(err)
        })

      return result
    },

    /**
   * Func : Xóa nhiều nhân viên
   * Author : Lê Mạnh Hùng (10/8/2022)
   * @returns xóa bản ghi xóa được
   */
    async deleteMultiEmployee() {
      let result = undefined
      await axios({
        method:"DELETE",
        url:`${this.baseApi}/multi`,
        data:this.idSelected
      })
        .then(res => {
          console.log(res)
          this.idSelected = []
          this.deleteMode = DeleteMode.ONE
          this.isShowInteractMulti = false
          result = res.data
        }).catch(err => {
          console.log(err)
        })

      return result
    },

    /**
     * Func : toggle chọn tất cả
     * Author : Lê Mạnh Hùng (24/7/2022)
     */
    toggleSelectAll() {
      if (!this.isSelectAll)
        this.idSelected = this.data.map(employee => employee["employeeId"])
      else {
        this.isShowInteractMulti = false
        this.idSelected = []
      }

      this.isSelectAll = !this.isSelectAll
    },

    /**
     * Func : Xuất khẩu dữ liệu
     * Author : Lê Mạnh Hùng (13/8/2022)
     */
    exportData(){
      window.open(`${this.baseApi}/ExportData`,"_parent");
    }
  }
})
