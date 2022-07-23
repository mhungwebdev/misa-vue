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
        fieldName: 'EmployeeCode',
        fieldDisplay:'MÃ NHÂN VIÊN'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'FullName',
        fieldDisplay:'TÊN NHÂN VIÊN'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'GenderName',
        fieldDisplay:'GIỚI TÍNH'
    },
    {
        textPositionClass:'misa-text-center',
        fieldName: 'DateOfBirth',
        fieldDisplay:'NGÀY SINH',
        type:"date"
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'IdentityNumber',
        fieldDisplay:'SỐ CMND'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'PositionName',
        fieldDisplay:'CHỨC DANH'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: 'DepartmentName',
        fieldDisplay:'TÊN ĐƠN VỊ'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: '',
        fieldDisplay:'SỐ TÀI KHOẢN'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: '',
        fieldDisplay:'TÊN NGÂN HÀNG'
    },
    {
        textPositionClass:'misa-text-left',
        fieldName: '',
        fieldDisplay:'CHI NHÁNH TÀI KHOẢN NGÂN HÀNG'
    },
]

export const fieldDepartmentRenderDropdown = [
    {
        FieldName: 'DepartmentCode',
        TextPosition: 'misa-text-left',
        FieldDisplay: 'Mã đơn vị'
    },{
        FieldName: 'DepartmentName',
        TextPosition:'misa-text-left',
        FieldDisplay: 'Tên đơn vị'
    }
]