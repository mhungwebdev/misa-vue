import axios from 'axios'
import { defineStore } from 'pinia'
import { API } from '../../assets/Resource/api'
import { FormMode, ToastMode } from '../../Enum/Enum'
import { CommonJS } from '../../JS/Common/Common'
import { Resource } from '../../Resource/Resource'

export const employeeFormStore = defineStore({
    id: 'EmployeeFormStore',
    state: () => ({
        employee: {
            employeeCode: '',
            fullName: '',
            departmentId: '',
            positionName: '',
            dateOfBirth: '',
            gender: 0,
            identityNumber: '',
            identityDate: '',
            identityPlace: '',
            address: '',
            phoneNumber: '',
            email: '',
            landlineNumber: '',
            bankAccount: '',
            bankName: '',
            bankBranch: ''
        },
        error: {
            employeeCode: '',
            fullName: '',
            departmentId: '',
            positionName: '',
            dateOfBirth: '',
            gender: '',
            identityNumber: '',
            identityDate: '',
            identityPlace: '',
            address: '',
            phoneNumber: '',
            email: '',
            landlineNumber: '',
            bankA: '',
            bankName: '',
            bankBran: '',
        },
        //mode của form
        formMode: FormMode.FORM_ADD,
        //api
        api: API.EMPLOYEE_API,
        //id của nhân viên sửa
        idEmployeeEdit: undefined,
        //status ẩn hiện của form
        isShowForm: false,
        //message thông báo lỗi
        errorForm: "",
        //nhân viên trước khi update
        oldEmployee: undefined,
        //status ẩn hiện của popup confirm của form
        isShowConfirmForm: false,
        //message lỗi trùng mã nhân viên
        errorDuplicateEmployeeCode: "",
        //thông báo toast
        toastMsg: "",
        //kiểu của toast
        typeToast: ToastMode.ERROR,
        //mảng message thông báo lỗi từ server
        listErrorServer: []
    }),
    getters: {
        getEmployee: (state) => state.employee,
        getError: (state) => state.error,
        getErrorForm: (state) => {
            for (const key in state.error) {
                if (state.error[key] != "")
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
        },

        /**
         * Func : validate từng field
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @param {*} value giá trị của field
         * @param {*} fieldName tên field tương ứng
         * @returns 
         */
        validate(value, fieldName) {
            if (fieldName == 'departmentId' && value.toString() == 'false') {
                this.error[fieldName] = Resource.errorNotInList
                return false
            }

            if (fieldName == 'employeeCode' || fieldName == 'fullName' || fieldName == 'departmentId') {
                if (fieldName == 'departmentId' && this.error[fieldName])
                    return false

                if (value == "") {
                    this.error[fieldName] = Resource.errorNotEmpty(CommonJS.convertFieldName(fieldName))
                    return false
                }
            }

            if (fieldName == 'dateOfBirth' || fieldName == 'identityDate') {
                if (value) {
                    if (!CommonJS.checkDate(value)) {
                        this.error[fieldName] = Resource.errorDateInvalidFormat(CommonJS.convertFieldName(fieldName))
                    } else {
                        const [day, month, year] = value.split('/')

                        if (!CommonJS.validateDate(`${year}-${month}-${day}`)) {
                            this.error[fieldName] = Resource.errorDateNotAllowThanNow
                            return false
                        }
                    }
                }
            }

            if (fieldName == "email" && value && !CommonJS.validateEmail(value)) {
                this.error[fieldName] = Resource.errorEmailInvalidFormat
                return false
            }

            return true
        },

        async getNewEmployeeCode() {
            return await (await axios.get(`${this.api}/NewEmployeeCode`)).data
        },

        async getEmployeeById(id) {
            return await (await axios.get(`${this.api}/${id}`)).data
        },

        /**
         * Func : Khởi tạo giá trị cho form
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @param {*} id của employee muốn sửa trong trường hợp form sửa 
         */
        async initForm(id) {
            this.emptyForm()
            try {
                this.isShowConfirmForm = false
                if (this.formMode == FormMode.FORM_ADD) {
                    this.employee.employeeCode = await this.getNewEmployeeCode()
                } else {
                    this.oldEmployee = await this.getEmployeeById(id)
                    CommonJS.formatDate("15/6/2000")

                    this.employee = {
                        employeeCode: this.oldEmployee.employeeCode,
                        fullName: this.oldEmployee.fullName,
                        departmentId: this.oldEmployee.departmentId,
                        positionName: this.oldEmployee.positionName,
                        dateOfBirth: this.oldEmployee.dateOfBirth ? CommonJS.formatDate(this.oldEmployee.dateOfBirth) : "",
                        gender: this.oldEmployee.gender,
                        identityNumber: this.oldEmployee.identityNumber,
                        identityDate: this.oldEmployee.identityDate ? CommonJS.formatDate(this.oldEmployee.identityDate) : "",
                        identityPlace: this.oldEmployee.identityPlace,
                        address: this.oldEmployee.address,
                        phoneNumber: this.oldEmployee.phoneNumber,
                        email: this.oldEmployee.email,
                        landlineNumber: this.oldEmployee.landlineNumber,
                        bankAccount: this.oldEmployee.bankAccount,
                        bankName: this.oldEmployee.bankName,
                        bankBranch: this.oldEmployee.bankBranch
                    }

                    if (this.formMode == FormMode.FORM_DUPLICATE) {
                        this.employee.employeeCode = await this.getNewEmployeeCode()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Func : Lưu thông tin form (thêm nếu formMode == FormMode.FORM_ADD và sửa nếu formMode == FormMode.FORM_EDIT)
         * Author : Lê Mạnh Hùng (18/7/2022)
         * @returns 1 luu thanh cong hoac undefined nếu fail
         */
        async saveForm() {
            try {
                let result = undefined
                const fieldNames = Object.keys(this.employee)
                let canSave = true

                fieldNames.forEach(fieldName => {
                    const validate = this.validate(this.employee[fieldName], fieldName)

                    if (!validate)
                        canSave = false
                })

                if (canSave) {
                    let dateOfBirth = ""
                    let identityDate = ""
                    if (this.employee.dateOfBirth != "") {
                        dateOfBirth = CommonJS.createDateDDMMYYYY(this.employee.dateOfBirth)
                    }

                    if (this.employee.identityDate != "") {
                        identityDate = CommonJS.createDateDDMMYYYY(this.employee.identityDate)
                    }

                    await axios({
                        method: this.formMode == FormMode.FORM_ADD || this.formMode == FormMode.FORM_DUPLICATE ? 'POST' : 'PUT',
                        url: `${this.api}${this.formMode == FormMode.FORM_EDIT ? `/${this.idEmployeeEdit}` : ''}`,
                        data: this.formMode == FormMode.FORM_ADD || this.formMode == FormMode.FORM_DUPLICATE ?
                            { ...this.employee, dateOfBirth, identityDate, createDate: new Date(Date.now()), modifyDate: new Date(Date.now()) }
                            : { ...this.employee, dateOfBirth, identityDate, modifyDate: new Date(Date.now()) }
                    }).then(res => {
                        console.log(res)
                        result = res.data
                    }).catch(err => {
                        const status = err.response.status
                        if (status == 500) {
                            this.toastMsg = "Có lỗi xảy ra."
                            this.typeToast = ToastMode.ERROR
                            setTimeout(() => {
                                this.toastMsg = ""
                            }, 5000)
                        }

                        if (status == 400) {
                            const { userMsg } = err.response.data
                            const { typeError, errors } = err.response.data.errorMsg

                            if (typeError == Resource.typeErrorDuplicateEmployeeCode) {
                                this.errorDuplicateEmployeeCode = userMsg
                            } else {
                                this.listErrorServer = errors
                                setTimeout(() => {
                                    this.listErrorServer = []
                                }, 5000 + 100 * this.listErrorServer.length)
                            }
                        }

                        console.log(err)
                    })
                } else {
                    for (const key in this.error) {
                        if (this.error[key] != "") {
                            this.errorForm = this.error[key]
                            break
                        }
                    }
                }

                return result
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Func : làm trống dữ liệu và error
         * Author : Lê Mạnh Hùng (18/7/2022)
         */
        emptyForm() {
            for (let key in this.employee) {
                if (key == "gender") {
                    this.employee[key] = 0
                } else {
                    this.employee[key] = ""
                }
                this.error[key] = ""
            }
        },

        /**
         * Func : xác định form đã thay đổi chưa
         * Author : Lê Mạnh Hùng (19/7/2022)
         */
        isChanged() {
            const fieldNames = Object.keys(this.employee)
            let isChanged = false
            if (this.formMode == FormMode.FORM_ADD) {
                fieldNames.forEach(fieldName => {
                    if (this.employee[fieldName] && fieldName != 'employeeCode') {
                        isChanged = true
                    }
                })
            } else {
                fieldNames.forEach(fieldName => {
                    if(fieldName == "gender" && this.employee[fieldName] != this.oldEmployee[fieldName]) {
                        isChanged = true
                    }

                    if (fieldName == 'dateOfBirth' || fieldName == 'identityDate') {
                        if(this.oldEmployee[fieldName] && this.employee[fieldName]){
                            if (!CommonJS.compareDate(this.oldEmployee[fieldName], CommonJS.createDateDDMMYYYY(this.employee[fieldName])))
                                isChanged = true
                        }

                        if(this.oldEmployee[fieldName] && !this.employee[fieldName])
                            isChanged = true
                        
                        if(!this.oldEmployee[fieldName] && this.employee[fieldName])
                            isChanged = true
                    } else {
                        if (this.employee[fieldName] != this.oldEmployee[fieldName]) {
                            isChanged = true
                        }
                    }
                })
            }

            return isChanged
        }
    }
})
