import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW } from '~stores/category/person/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { getCurrentDate } from '@utils';

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

const handleRowClick = (dispatch) => (item) => (e)=> {
  dispatch({ type: SELECT_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['person', 'edit', 'isDisabled'], value: false });
}

const tableData = (queryResult?): Table.Props => ({
  $rows: [
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
          children: 'Persnbr',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Chức danh',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'CMND',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày cấp',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Nơi cấp',
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
          children: 'Email',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
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
    ...(queryResult ? queryResult : []),
  ],
})

const mapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.persCode,
    },
    {
      children: item.persFullname,
    },
    {
      children: item.persTitle
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
      children: getCurrentDate(item.createddate),
    },
    {
      children: item.createdby,
    },
    {
      children: getCurrentDate(item.updateddate),
    },
  ]
})

Element.displayName = 'SearchDataTable'

