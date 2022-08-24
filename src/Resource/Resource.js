export class Resource {
    //message toast báo lỗi
    static errorMessage = "Có lỗi xảy ra"
    //message confirm xóa nhiều
    static confirmDeleteMultiEmployeeMessage = "Bạn có thực sự muốn xóa những nhân viên đã chọn không ?"
    //message error dư liệu không có trong danh sách
    static errorNotInList = "Dữ liệu không có trong danh sách"
    //message error ngày không được lớn hơn ngày hiện tại
    static errorDateNotAllowThanNow = "Ngày không được lớn hơn ngày hiện tại !"
    //message error email không đúng định dạng
    static errorEmailInvalidFormat = "Email không đúng định dạng !"
    //message lưu thành công
    static saveSuccessMessage = "Lưu thành công."
    //kiểu lỗi duplicate employee code
    static typeErrorDuplicateEmployeeCode = "Duplicate EmployeeCode"

    /**
     * Func : convert message xóa
     * Author : Lê Mạnh Hùng (10/8/2022)
     * @param {*} recordDeleted số bản ghi đã xóa
     * @returns message xóa thành công
     */
    static messageDeleteSuccessEmployee(recordDeleted){
        return `Xóa thành công ${recordDeleted} nhân viên`
    }

    /**
     * Func : conver message xác nhận xóa một bản ghi
     * Author : Lê Mạnh Hùng (10/8/2022)
     * @param {*} employeeCode 
     * @returns 
     */
    static messageDeleteOneEmployee(employeeCode){
        return `Bạn có thực sự muốn xóa Nhân viên <${employeeCode}> không ?`
    }

    /**
     * Func : convert message error field không được để trống
     * Author : Lê Mạnh Hùng (10/8/2022)
     * @param {*} fieldName tên field
     * @returns message error field không được để trống
     */
    static errorNotEmpty(fieldName){
        return `${fieldName} không được để trống !`
    }

    /**
     * Func : convert message error ngày không đúng định dạng
     * Author : Lê Mạnh Hùng (10/8/2022)
     * @param {*} fieldName tên field
     * @returns error message ngày không đúng định dạng
     */
    static errorDateInvalidFormat(fieldName){
        return `${fieldName} không đúng định dạng.`
    }
}