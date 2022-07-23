import axios from 'axios'
import { defineStore } from 'pinia'
import {CommonJS} from '../../JS/Common/Common'

export const employeeStore = defineStore({
  id: 'EmployeeStore',
  state: () => ({
    pageSize: 10,
    pageNumber:1,
    totalRecord: 100,
    totalPage: 100,
    baseApi:'https://cukcuk.manhnv.net/api/v1/Employees',
    employeesFilter:'',
    pageNumberRender:[],
    data:[],
    idSelected:[],
    isSelectAll:false
  }),
  getters: {
    getData: (state) => state.data,
    getApi: (state) => {
        let api = `${state.baseApi}/filter?pageSize=${state.pageSize}&pageNumber=${state.pageNumber}`

        if(state.employeesFilter != "")
            api += `&employeeFilter=${state.employeesFilter}`

        return api
    }
  },
  actions: {
    /**
     * Func : chức năng load data
     * Author : Lê Mạnh Hùng (15/7/2022)
     */
    async loadData(){
        const api = this.getApi

        await axios.get(api)
            .then(res => {
              console.log(res)
              const {TotalPage,TotalRecord,Data} = res.data
              this.data = Data
              this.totalPage = TotalPage
              this.totalRecord = TotalRecord
              this.pageNumberRender = CommonJS.getListPageNumber(TotalPage,this.pageNumber)
            })
            .catch(err => {
                console.log(err)
            })
    },

    /**
     * Func : Thay đổi page number
     * Author : Lê Mạnh Hùng (16/7/2022)
     * @param {*} pageNumber số trang muốn thay đổi
     */
    async changePageNumber(pageNumber){
        this.pageNumber = pageNumber
        await this.loadData()
    },

    /**
     * Func : Thay đổi page size
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} pageSize kích thước trang muốn thay đổi
     */
    async changePageSize(pageSize){
        this.pageSize = pageSize
        this.pageNumber = 1
        await this.loadData()
    },

    /**
     * Func : chức năng tìm kiếm
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} keyword từ khóa tìm kiếm
     */
    async search(keyword){
      this.employeesFilter = keyword
      this.pageNumber = 1
      await this.loadData()
    },

    /**
     * Func : Chọn item
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} id 
     */
    selectItem(id){
      if(this.idSelected.includes(id))
        this.idSelected = this.idSelected.filter(i => i != id)
      else
        this.idSelected.push(id)

      if(this.idSelected.length == this.data.length)
        this.isSelectAll = true
      else
        this.isSelectAll = false
    },

    /**
     * Func : Xóa một nhân viên
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} id nhân viên muốn xóa
     * @returns 1 nếu xóa thành công hoặc undefined nếu fail
     */
    async deleteEmployee(id){
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

    toggleSelectAll(){
      if(!this.isSelectAll)
        this.idSelected = this.data.map(employee => employee["EmployeeId"])
      else
        this.idSelected = []

      this.isSelectAll = !this.isSelectAll
    }
  }
})
