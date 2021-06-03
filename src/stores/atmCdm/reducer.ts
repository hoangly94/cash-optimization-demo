import { SUBMIT, RESET, CREATE, EDIT, REQUEST_QUERY, FETCH_DATA, SHOW_DATA } from './constants'
import * as Base from '~/_settings';

const initState = {
    isLoading: false,
    filters: {
        managementUnitName: '',
        atmCdmStatus: '',
    },
    queryResult: { ...testData() },
}

export default (state = initState, action) => {
    switch (action.type) {
        case SUBMIT:
            return {
                ...state,
            }
        case RESET:
            return {
                ...state,
            }
        case CREATE:
            return {
                ...state,
            }
        case EDIT:
            return {
                ...state,
            }
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true,
            }
        case REQUEST_QUERY:
            return {
                ...state,
                filters: {
                    managementUnitName: action.filters.managementUnitName,
                    atmCdmStatus: action.filters.atmCdmStatus,
                },
            }
        case SHOW_DATA:
            return {
                ...state,
                isLoading: true,
                queryResult: { ...action.queryResult },
            }
        default:
            return state
    }
}

const tableData_$rows_$cells_title = {
    whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}
function testData() {
    return {
        $rows: [
            {
                backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
                color: Base.Color.WHITE,
                $cells: [
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'STT',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Mã ATM/CDM',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Tên ATM/CDM',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Loại máy ATM/CDM',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Địa chỉ ATM/CDM',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Trạng thái ATM/CDM',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Mã DVQL',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Tên DVQL',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Ngày đăng ký',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'NV đăng ký',
                    },
                    {
                        ...tableData_$rows_$cells_title,
                        children: 'Datelastmaint',
                    },
                ],
            },
            {
                $cells: [
                    {
                        children: 'bbbb1',
                    },
                    {
                        children: 'bbbb2',
                    },
                    {
                        children: 'bbbb3',
                    }
                ],
            },
        ],
    }
}