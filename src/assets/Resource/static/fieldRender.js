{/* <th class="misa-text-left">MÃ NHÂN VIÊN</th>
<th class="misa-text-left">TÊN NHÂN VIÊN</th>
<th class="misa-text-left">GIỚI TÍNH</th>
<th class="misa-text-center">NGÀY SINH</th>
<th class="misa-text-left">SỐ CMND</th>
<th class="misa-text-left">CHỨC DANH</th>
<th class="misa-text-left">TÊN ĐƠN VỊ</th>
<th class="misa-text-left">SỐ TÀI KHOẢN</th>
<th class="misa-text-left">TÊN NGÂN HÀNG</th>
<th class="misa-text-left">CHI NHÁNH TK NGÂN HÀNG</th>
<th class="misa-text-center">Chức năng</th> */}

export const fieldRenderEmployee = [
    {
        textPositionClass:'misa-text-left',
        fieldName: 'employeeCode',
        fieldDisplay:'MÃ NHÂN VIÊN'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'fullName',
        fieldDisplay:'TÊN NHÂN VIÊN'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'genderName',
        fieldDisplay:'GIỚI TÍNH'
    },
    {
        textPositionClass:'misa-text-center',
        fieldName: 'dateOfBirth',
        fieldDisplay:'NGÀY SINH',
        type:"date"
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'identityNumber',
        fieldDisplay:'SỐ CMND'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'positionName',
        fieldDisplay:'CHỨC DANH'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'departmentName',
        fieldDisplay:'TÊN ĐƠN VỊ'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'bankAccount',
        fieldDisplay:'SỐ TÀI KHOẢN'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'bankName',
        fieldDisplay:'TÊN NGÂN HÀNG'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'bankBranch',
        fieldDisplay:'CHI NHÁNH TÀI KHOẢN NGÂN HÀNG'
    },
]

export const fieldDepartmentRenderDropdown = [
    {
        FieldName: 'departmentCode',
        TextPosition: 'misa-text-left',
        FieldDisplay: 'Mã đơn vị'
    },{
        FieldName: 'departmentName',
        TextPosition:'misa-text-left',
        FieldDisplay: 'Tên đơn vị'
    }
]