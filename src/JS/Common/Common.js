export class CommonJS {
    /**
     * Func : Format Date
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {Ngày cần format} dateIn 
     */
    static formatDate(dateIn) {
        if (!dateIn)
            return ""

        const date = new Date(dateIn)

        return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 9 ? `${0}${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear()}`
    }

    /**
     * Func : Format date for input date
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {ngày cần format}
     */
    static formatDateInput(dateIn) {
        const date = new Date(dateIn)

        return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
    }

    /**
     * Func : kiểm tra ngày
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} dateIn ngày cần kiểm tra 
     * @returns true nếu ngày kiểm tra nhỏ hơn ngày hiện tại và ngược lại
    */
    static validateDate(dateIn) {
        const date = new Date(dateIn)

        if (date > new Date())
            return false
        return true
    }

    /**
     * Func : kiểm tra định dạng email
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} email cần kiểm tra
     * @returns true nếu đúng định dạng email và ngược lại
     */
    static validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return (true)
        return (false)
    }

    /**
     * Func : tạo một mảng item page number
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} totalPage tổng số trang
     * @param {*} currentPage trang hiện tại
     * @returns list item render
     */
    static getListPageNumber(totalPage, currentPage) {
        let pageRender = [];

        if (totalPage > 4) {
            if(currentPage < 3)
                pageRender = [1,2,3,null,totalPage]
            else if(currentPage > totalPage - 3)
                pageRender = [1,null,totalPage - 2,totalPage - 1, totalPage]
            else
                pageRender = [1,null,currentPage,currentPage + 1,currentPage + 2,null,totalPage]
        } else {
            for (let i = 1; i <= totalPage; i++)
                pageRender.push(i)
        }

        return pageRender
    }

    /**
     * Func : So sánh giá trị 2 ngày
     * Author : Lê Mạnh Hùng (19/7/2022)
     * @param {*} dateIn1 giá trị date 1
     * @param {*} dateIn2 giá trị date 2
     * @returns true nếu date 1 = date 2 và ngược lại
     */
    static compareDate(dateIn1, dateIn2) {
        const date1 = new Date(dateIn1)
        const date2 = new Date(dateIn2)

        if (date1.getTime() === date2.getTime())
            return true
        return false
    }

    /**
     * Func : Đổi tên field sang tiếng việt
     * Author : Lê Mạnh Hùng (3/8/2022)
     * @param {*} fieldName tên field 
     * @returns tên field tiếng việt
     */
    static convertFieldName(fieldName) {
        switch (fieldName) {
            case 'employeeCode':
                return 'Mã nhân viên'
            case 'departmentId':
                return 'Đơn vị'
            case 'fullName':
                return 'Tên'
            case 'dateOfBirth':
                return 'Ngày sinh'
            case 'identityDate':
                return 'Ngày cấp'
            default:
                return fieldName
        }
    }

    /**
     * Func : Kiểm tra ngày
     * Author : Lê Mạnh Hùng (3/8/2022)
     * @param {*} dateIn ngày cần kiểm tra
     */
    static checkDate(dateIn) {
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateIn))
            return false;

        // Parse the date parts to integers
        var parts = dateIn.split("/");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    /**
     * Func : Tạo một date từ date string có dạng dd/mm/yyyy
     * Author : Lê Mạnh Hùng (3/8/2022)
     * @param {*} date chuỗi string date có dạng dd/mm/yyyy 
     * @returns giá trị date
     */
    static createDateDDMMYYYY(date){
        const [day, month, year] = date.split("/")
        return new Date(year, month - 1, day,7);
    }
}