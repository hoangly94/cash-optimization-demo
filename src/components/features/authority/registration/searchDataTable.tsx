import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/authority/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import { HANDLE_BUTTON } from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate, getCurrentDateTime } from '@utils';
import moment from 'moment';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['registration'].queryResult.data);
  const dispatch = useDispatch();
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    width: Base.Width.FULL,
    style: {
      // maxHeight: '500px',
      overflow: 'auto',
    },
    ...props,
  };

  const tableProps: Table.Props = {
    ...tableData(queryResult?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {
      minWidth: '1200px',
    }
  }
  return (
    <Block.Element {...componentWrapperProps}>
      <Table.Element {...tableProps} />
    </Block.Element >
  )
}

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const handleRowClick = (dispatch) => (item) => (e) => {
  dispatch({ type: SELECT_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: false });
}

const tableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày tạo',
          sort: {
            type: REQUEST_QUERY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số UQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVUQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'co_orgs_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Người UQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'pers_fullname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Người nhận UQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'receiver_pers_fullname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian UQ từ ngày',
          sort: {
            type: REQUEST_QUERY,
            data: 'authority_from_date',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian UQ đến ngày',
          sort: {
            type: REQUEST_QUERY,
            data: 'authority_to_date',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
          sort: {
            type: REQUEST_QUERY,
            data: 'authority_status',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Nhân viên Đăng Ký',
          sort: {
            type: REQUEST_QUERY,
            data: 'createdby_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Datelastmaint',
          sort: {
            type: REQUEST_QUERY,
            data: 'datelastmaint',
          }
        },
      ],
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const mapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: item.index || index + 1,
    },
    {
      children: item.createddate,
    },
    {
      children: item.id,
    },
    {
      children: item.categoryOrgs?.orgsName,
    },
    {
      children: item.persFullname,
    },
    {
      children: item.receiverPersFullname,
    },
    {
      children: getCurrentDate(item.authorityFromDate).split('-').join('/'),
    },
    {
      children: getCurrentDate(item.authorityToDate).split('-').join('/'),
    },
    {
      children: item.authorityStatus,
    },
    {
      children: item.createdbyName,
    },
    {
      children: item.datelastmaint && moment(item.datelastmaint, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
    },
  ]
})

Element.displayName = 'SearchDataTable'

