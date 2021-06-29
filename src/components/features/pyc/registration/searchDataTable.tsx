import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW } from '~stores/authority/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['registration'].queryResult.data);
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
  dispatch({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: false });
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
          children: 'Ngày tạo',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số UQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVUQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Người UQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Người nhận UQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian UQ từ ngày',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian UQ đến ngày',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
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
      children: getCurrentDate(item.authorityFromDate),
    },
    {
      children: getCurrentDate(item.authorityToDate),
    },
    {
      children: item.authorityStatus,
    },
  ]
})

Element.displayName = 'SearchDataTable'

