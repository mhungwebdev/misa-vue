import axios from 'axios'
import { defineStore } from 'pinia'
import {CommonJS} from '../../JS/Common/Common'

export const FormMode = {
    FORM_ADD : 'add',
    FORM_EDIT : 'edit',
}

export const employeeFormStore = defineStore({
  id: 'EmployeeFormStore',
  state: () => ({
    employee:{
        EmployeeCode:'',
        FullName:'',
        DepartmentId:'',
        PositionName:'',
        DateOfBirth:'',
        Gender:0,
        IdentityNumber:'',
        IdentityDate:'',
        IdentityPlace:'',
        Address:'',
        PhoneNumber:'',
        Email:''
    },
    error:{
        EmployeeCode:'',
        FullName:'',
        DepartmentId:'',
        PositionName:'',
        DateOfBirth:'',
        Gender:'',
        IdentityNumber:'',
        IdentityDate:'',
        IdentityPlace:'',
        Address:'',
        PhoneNumber:'',
        Email:''
    },
    formMode:FormMode.FORM_ADD,
    api:'https://cukcuk.manhnv.net/api/v1/Employees',
    idEmployeeEdit:undefined,
    isShowForm:false,
    errorForm:"",
    oldEmployee:undefined,
    isShowConfirmForm:false,
  }),
  getters: {
    getEmployee: (state) => state.employee,
    getError: (state) => state.error
  },
  actions: {
    /**
     * Func : thay đổi giá trị của field
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} value giá trị thay đổi
     * @param {*} fieldName tên field thay đổi
     */
    changeValue(value, fieldName) {
        this.employee[fieldName] = value;

        // if(value != "" && this.validate(value,fieldName)) {
        //     this.error[fieldName] = ""
        // }
        this.error[fieldName] = "";

        if(fieldName != 'EmployeeCode' && fieldName != 'FullName' && fieldName != 'DepartmentId' && value == ""){
            this.error[fieldName] = ""
        }
    },

    /**
     * Func : validate từng field
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} value giá trị của field
     * @param {*} fieldName tên field tương ứng
     * @returns 
     */
    validate(value, fieldName) {
        if(fieldName == 'EmployeeCode' || fieldName == 'FullName' || fieldName == 'DepartmentId'){
            if(value == ""){
                this.error[fieldName] = `${CommonJS.convertFieldName(fieldName)} không được để trống !`
                return false
            }
        }

        if(fieldName == 'DateOfBirth' || fieldName == 'IdentityDate'){
            if(value && !CommonJS.validateDate(value)){
                this.error[fieldName] = `Ngày không được lớn hơn ngày hiện tại !`
                return false
            }
        }

        if(fieldName == "Email" && value && !CommonJS.validateEmail(value)){
            this.error[fieldName] = "Email không đúng định dạng !"
            return false
        }

        return true
    },

    /**
     * Func : Khởi tạo giá trị cho form
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} id của employee muốn sửa trong trường hợp form sửa 
     */
    async initForm() {
        this.emptyForm()
        this.isShowConfirmForm = false
        if(this.formMode == FormMode.FORM_ADD){
            await axios.get('https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode')
                    .then(res => {
                        this.employee.EmployeeCode = res.data
                    })
                    .catch(err => console.error(err))
        }else{
            await axios.get(`https://cukcuk.manhnv.net/api/v1/Employees/${this.idEmployeeEdit}`)
                    .then(res => {
                        const {EmployeeCode,
                        FullName,
                        DepartmentId,
                        PositionName,
                        DateOfBirth,
                        Gender,
                        IdentityNumber,
                        IdentityDate,
                        IdentityPlace,
                        Address,
                        PhoneNumber,
                        Email} = res.data

                        this.oldEmployee = res.data

                        this.employee = {
                            EmployeeCode,
                            FullName,
                            DepartmentId,
                            PositionName,
                            DateOfBirth:DateOfBirth ? CommonJS.formatDateInput(DateOfBirth) : "",
                            Gender,
                            IdentityNumber,
                            IdentityDate:IdentityDate ? CommonJS.formatDateInput(IdentityDate) : "",
                            IdentityPlace,
                            Address,
                            PhoneNumber,
                            Email
                        }
                    })
        }
    },

    /**
     * Func : Lưu thông tin form (thêm nếu formMode == FormMode.FORM_ADD và sửa nếu formMode == FormMode.FORM_EDIT)
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @returns 1 luu thanh cong hoac undefined nếu fail
     */
    async saveForm(){
        let result = undefined
        const fieldNames = Object.keys(this.employee)
        let canSave = true

        fieldNames.forEach(fieldName => {
            const validate = this.validate(this.employee[fieldName],fieldName)

            if(!validate)
                canSave = false
        })

        if(canSave){
            await axios({
                method: this.formMode == FormMode.FORM_ADD ? 'POST' : 'PUT',
                url:`${this.api}${this.formMode == FormMode.FORM_EDIT ? `/${this.idEmployeeEdit}` : ''}`,
                data:this.employee
            }).then(res => {
                console.log(res)
                result = res.data
            }).catch(err => {
                const msgs = err.response.data.devMsg.split(" ")
                if(msgs[0] == "Duplicate")
                    this.errorForm = `Mã nhân viên <${msgs[2]}> đã tồn tại !`
                console.log(err)
            })
        }else{
            this.errorForm = 'Lỗi nhập liệu. Vui lòng kiểm tra lại !'
        }

        return result
    },

    /**
     * Func : làm trống dữ liệu và error
     * Author : Lê Mạnh Hùng (18/7/2022)
     */
    emptyForm(){
        this.employee.EmployeeCode = '',
        this.employee.FullName = '',
        this.employee.DepartmentId = '',
        this.employee.PositionName = '',
        this.employee.DateOfBirth='',
        this.employee.Gender=0,
        this.employee.IdentityNumber='',
        this.employee.IdentityDate='',
        this.employee.IdentityPlace='',
        this.employee.Address='',
        this.employee.PhoneNumber='',
        this.employee.Email=''

        this.error.EmployeeCode = '',
        this.error.FullName = '',
        this.error.DepartmentId = '',
        this.error.PositionName = '',
        this.error.DateOfBirth='',
        this.error.Gender=0,
        this.error.IdentityNumber='',
        this.error.IdentityDate='',
        this.error.IdentityPlace='',
        this.error.Address='',
        this.error.PhoneNumber='',
        this.error.Email=''
    },

    /**
     * Func : xác định form đã thay đổi chưa
     * Author : Lê Mạnh Hùng (19/7/2022)
     */
    isChanged(){
        const fieldNames = Object.keys(this.employee)
        let isChanged = false
        if(this.formMode == FormMode.FORM_ADD){
            fieldNames.forEach(fieldName => {
                if(this.employee[fieldName] && fieldName != 'EmployeeCode'){
                    isChanged = true
                }
            })
        }else{
            fieldNames.forEach(fieldName => {
                if(this.employee[fieldName] && this.oldEmployee[fieldName]){
                    if(fieldName == 'DateOfBirth' || fieldName == 'IdentityDate' ){
                        if(!CommonJS.compareDate(this.oldEmployee[fieldName], this.oldEmployee[fieldName]))                        
                            isChanged = true
                    }else{
                        if(this.employee[fieldName] != this.oldEmployee[fieldName]){
                            isChanged = true
                        }
                    }
                }
            })
        }

        return isChanged
    }
  }
})
