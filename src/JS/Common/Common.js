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
        date1.setHours(7)
        date2.setHours(7)

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

    /**
     * Func : Bỏ dấu cho chuỗi
     * Author : Lê Mạnh Hùng (19/8/2022)
     * @param {*} str chuỗi muốn bỏ dấu
     * @returns chuỗi đã bỏ dấu
     */
    static removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g," ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        return str;
    }

    /**
     * Func : Thay đổi ngày (cộng - trừ)
     * Author : Lê Mạnh Hùng (22/8/2022)
     * @param {*} date ngày muốn thay đổi
     * @param {*} dayChange số ngày thay đổi
     * @param {*} calcMode phép toán (calcMode = 1 phép cộng, calcMode = 0 phép trừ)
     */
    static calcDate(date, dayChange, calcMode){
        try {
            const newDate = new Date(date)
            const day = newDate.getDate()

            if(calcMode == 1){
                newDate.setDate(day + dayChange)
            }
    
            if(calcMode == 0){
                newDate.setDate(day - dayChange)
            }

            return newDate
        } catch (error) {
            console.log(error);
        }
    }
}