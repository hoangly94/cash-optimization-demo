import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/category/person/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['person'].queryResult.data);
  const dispatch = useDispatch();
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    width:Base.Width.FULL,
    style: {
      // maxHeight: '500px',
      overflow: 'auto',
    },
    ...props,
  };

  const tableProps: Table.Props = {
    ...tableData(queryResult?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    style:{
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
  dispatch({ type: HANDLE_BUTTON, keys: ['person', 'edit', 'isDisabled'], value: false });
}

const tableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style:{
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
          children: 'Mã nhân viên',
          sort: {
            type: REQUEST_QUERY,
            data: 'persCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên',
          sort: {
            type: REQUEST_QUERY,
            data: 'persFullname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Chức danh',
          sort: {
            type: REQUEST_QUERY,
            data: 'persTitle',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT',
          sort: {
            type: REQUEST_QUERY,
            data: 'persMobile',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'CMND',
          sort: {
            type: REQUEST_QUERY,
            data: 'persCmndCccd',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày cấp',
          sort: {
            type: REQUEST_QUERY,
            data: 'persCmndCccdYear',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Nơi cấp',
          sort: {
            type: REQUEST_QUERY,
            data: 'persCmndCccdPlace',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã DVQL',
          sort: {
            type: REQUEST_QUERY,
            data: 'categoryOrgs.orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên DVQL',
          sort: {
            type: REQUEST_QUERY,
            data: 'categoryOrgs.orgsName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Email',
          sort: {
            type: REQUEST_QUERY,
            data: 'persEmail',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
          sort: {
            type: REQUEST_QUERY,
            data: 'persStatus',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày đăng ký',
          sort: {
            type: REQUEST_QUERY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'NV đăng ký',
          sort: {
            type: REQUEST_QUERY,
            data: 'createdby',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Datelastmaint',
          sort: {
            type: REQUEST_QUERY,
            data: 'updateddate',
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
      children: item.persCode,
    },
    {
      children: item.persFullname,
    },
    {
      children: item.categoryTitle?.titleName,
    },
    {
      children: item.persMobile,
    },
    {
      children: item.persCmndCccd,
    },
    {
      children: item.persCmndCccdYear,
    },
    {
      children: item.persCmndCccdPlace,
    },
    {
      children: item.categoryOrgs.orgsCode,
    },
    {
      children: item.categoryOrgs.orgsName,
    },
    {
      children: item.persEmail,
    },
    {
      children: item.persStatus,
    },
    {
      children: item.createddate, //item.createddate.split('-').join('/'),
    },
    {
      children: item.createdbyname,
    },
    {
      children: item.updateddate, //item.updateddate?.split('-').join('/'),
    },
  ]
})

Element.displayName = 'SearchDataTable'

