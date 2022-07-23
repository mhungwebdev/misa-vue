export class CommonJS {
    /**
     * Func : Format Date
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {Ngày cần format} dateIn 
     */
    static formatDate(dateIn){
        if(!dateIn)
            return ""

        const date = new Date(dateIn)

        return `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}/${date.getMonth() < 9 ? `${0}${date.getMonth()+1}` : date.getMonth() + 1}/${date.getFullYear()}`
    }

    /**
     * Func : Format date for input date
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {ngày cần format}
     */
    static formatDateInput(dateIn) {
        const date = new Date(dateIn)

        return `${date.getFullYear()}-${date.getMonth() < 9 ? '0'+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`
    }

    /**
     * Func : kiểm tra ngày
     * Author : Lê Mạnh Hùng (15/7/2022)
     * @param {*} dateIn ngày cần kiểm tra 
     * @returns true nếu ngày kiểm tra nhỏ hơn ngày hiện tại và ngược lại
    */
    static validateDate(dateIn) {
        const date = new Date(dateIn)

        if(date > new Date())
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
    static getListPageNumber(totalPage,currentPage) {
        const pageRender = [];

        if(totalPage > 4){
            switch(totalPage - currentPage){
                case 0:
                    pageRender.push(1)
                    pageRender.push(2)
                    pageRender.push(3)
                    pageRender.push(null)
                    pageRender.push(currentPage)  
                    break
                case 1:
                    pageRender.push(1)
                    pageRender.push(2)
                    pageRender.push(null)
                    pageRender.push(currentPage)
                    pageRender.push(totalPage)  
                break;
                case 2:
                    pageRender.push(1)
                    pageRender.push(null)
                    pageRender.push(currentPage)
                    pageRender.push(currentPage+1)
                    pageRender.push(currentPage+2)  
                break;
                default:
                    pageRender.push(currentPage)
                    pageRender.push(currentPage+1)
                    pageRender.push(currentPage+2)
                    pageRender.push(null)
                    pageRender.push(totalPage)
                break
        }
        }else{
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

        if(date1.getTime() === date2.getTime())
            return true
        return false
    }

    static convertFieldName(fieldName) {
        switch(fieldName){
            case 'EmployeeCode':
                return 'Mã nhân viên'
            case 'DepartmentId':
                return 'Đơn vị'
            case 'FullName':
                return 'Tên'
            default:
                return fieldName
        }
    }
}