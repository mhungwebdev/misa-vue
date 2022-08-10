import axios from 'axios'
import { defineStore } from 'pinia'
import { API } from '../../assets/Resource/api'
import { FormMode } from '../../Enum/Enum'
import {CommonJS} from '../../JS/Common/Common'
import { Resource } from '../../Resource/Resource'

export const employeeFormStore = defineStore({
  id: 'EmployeeFormStore',
  state: () => ({
    employee:{
        employeeCode:'',
        fullName:'',
        departmentId:'',
        positionName:'',
        dateOfBirth:'',
        gender:0,
        identityNumber:'',
        identityDate:'',
        identityPlace:'',
        address:'',
        phoneNumber:'',
        email:'',
        landlineNumber:'',
        bankAccount:'',
        bankName:'',
        bankBranch:''
    },
    error:{
        employeeCode:'',
        fullName:'',
        departmentId:'',
        positionName:'',
        dateOfBirth:'',
        gender:'',
        identityNumber:'',
        identityDate:'',
        identityPlace:'',
        address:'',
        phoneNumber:'',
        email:'',
        landlineNumber:'',
        bankA:'',
        bankName:'',
        bankBran :'',
    },
    //mode của form
    formMode:FormMode.FORM_ADD,
    //api
    api:API.EMPLOYEE_API,
    //id của nhân viên sửa
    idEmployeeEdit:undefined,
    //status ẩn hiện của form
    isShowForm:false,
    //message thông báo lỗi
    errorForm:"",
    //nhân viên trước khi update
    oldEmployee:undefined,
    //status ẩn hiện của popup confirm của form
    isShowConfirmForm:false,
    //mảng message lỗi trả về từ server
    listErrorServer:[],
    //message lỗi trùng mã nhân viên
    errorDuplicateEmployeeCode:""
  }),
  getters: {
    getEmployee: (state) => state.employee,
    getError: (state) => state.error,
    getErrorForm: (state) => {
        for (const key in state.error) {
            if(state.error[key] != "")
                return state.error[key];
        }
    }
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

        this.error[fieldName] = "";

        // if(fieldName != 'employeeCode' && fieldName != 'fullName' && fieldName != 'departmentId' && value == ""){
        //     this.error[fieldName] = ""
        // }
    },

    /**
     * Func : validate từng field
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} value giá trị của field
     * @param {*} fieldName tên field tương ứng
     * @returns 
     */
    validate(value, fieldName) {
        if(fieldName == 'departmentId' && value.toString() == 'false'){
            this.error[fieldName] = Resource.errorNotInList
            return false
        }

        if(fieldName == 'employeeCode' || fieldName == 'fullName' || fieldName == 'departmentId'){
            if(fieldName == 'departmentId' && this.error[fieldName])
                return false

            if(value == ""){
                this.error[fieldName] = Resource.errorNotEmpty(CommonJS.convertFieldName(fieldName))
                return false
            }
        }

        if(fieldName == 'dateOfBirth' || fieldName == 'identityDate'){
            if(value){
                if(!CommonJS.checkDate(value)){
                    this.error[fieldName] = Resource.errorDateInvalidFormat(CommonJS.convertFieldName(fieldName))
                }else{
                    const [day,month,year] = value.split('/')

                    if(!CommonJS.validateDate(`${year}-${month}-${day}`)){
                        this.error[fieldName] = Resource.errorDateNotAllowThanNow
                        return false
                    }
                }
            }
        }

        if(fieldName == "email" && value && !CommonJS.validateEmail(value)){
            this.error[fieldName] = Resource.errorEmailInvalidFormat
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
            await axios.get(`${this.api}/NewEmployeeCode`)
                    .then(res => {
                        this.employee.employeeCode = res.data
                    })
                    .catch(err => console.error(err))
        }else{
            await axios.get(`${this.api}/${this.idEmployeeEdit}`)
                    .then(res => {
                        const {employeeCode,
                        fullName,
                        departmentId,
                        positionName,
                        dateOfBirth,
                        gender,
                        identityNumber,
                        identityDate,
                        identityPlace,
                        address,
                        phoneNumber,
                        email,
                        landlineNumber,
                        bankAccount,
                        bankName,
                        bankBranch} = res.data

                        this.oldEmployee = res.data

                        this.employee = {
                            employeeCode,
                            fullName,
                            departmentId,
                            positionName,
                            dateOfBirth:dateOfBirth ? CommonJS.formatDate(dateOfBirth) : "",
                            gender,
                            identityNumber,
                            identityDate:identityDate ? CommonJS.formatDate(identityDate) : "",
                            identityPlace,
                            address,
                            phoneNumber,
                            email,
                            landlineNumber,
                            bankAccount,
                            bankName,
                            bankBranch
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
            let dateOfBirth = ""
            let identityDate = ""
            if(this.employee.dateOfBirth != ""){
                dateOfBirth = CommonJS.createDateDDMMYYYY(this.employee.dateOfBirth)
            }

            if(this.employee.identityDate != ""){
                identityDate = CommonJS.createDateDDMMYYYY(this.employee.identityDate)
            }

            await axios({
                method: this.formMode == FormMode.FORM_ADD ? 'POST' : 'PUT',
                url:`${this.api}${this.formMode == FormMode.FORM_EDIT ? `/${this.idEmployeeEdit}` : ''}`,
                data:this.formMode == FormMode.FORM_ADD ? 
                    {...this.employee,dateOfBirth,identityDate,createDate:new Date(Date.now()),modifyDate:new Date(Date.now())} 
                    : {...this.employee,dateOfBirth,identityDate,modifyDate:new Date(Date.now())}
            }).then(res => {
                console.log(res)
                result = res.data
            }).catch(err => {
                console.log(err.response.data)
                if(err.response.data.devMsg.split(" ")[0] == "Mã")
                    this.errorDuplicateEmployeeCode = err.response.data.devMsg
                this.listErrorServer = err.response.data.data
                this.deleteErrorServer()
            })
        }else{
            for (const key in this.error) {
                if(this.error[key] != ""){
                    this.errorForm = this.error[key]
                    break
                }
            }
        }

        return result
    },

    /**
     * Func : Xóa error từ server trả về
     * Author : Lê Mạnh Hùng (4/8/2022)
     */
    deleteErrorServer(){
        const errorCount = this.listErrorServer.length

        setTimeout(() => {
            this.listErrorServer = []
        },5000 + errorCount*100)
    },

    /**
     * Func : làm trống dữ liệu và error
     * Author : Lê Mạnh Hùng (18/7/2022)
     */
    emptyForm(){
        for(let key in this.employee){
            if(key == "gender"){
                this.employee[key] = 0
            }else{
                this.employee[key] = ""
            }
            this.error[key] = ""
        }
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
                if(this.employee[fieldName] && fieldName != 'employeeCode'){
                    isChanged = true
                }
            })
        }else{
            fieldNames.forEach(fieldName => {
                if(this.employee[fieldName] && this.oldEmployee[fieldName]){
                    if(fieldName == 'dateOfBirth' || fieldName == 'identityDate' ){
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
