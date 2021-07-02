import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['pycRegistration'].queryResult.data);
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
  console.log(queryResult);
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
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: false });
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
          children: 'Ngày tạo PYC',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC ĐV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVUCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVUCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái PYC',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đối tượng ĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình ĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Lộ trình',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái Lộ trình',
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
      children: item.createddate,
    },
    {
      children: item.id,
    },
    {
      children: item.orgsRequestId,
    },
    {
      children: item.orgsHolderCode,
    },
    {
      children: item.orgsHolderName,
    },
    {
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.cashOptimizationStatus,
    },
    {
      children: item.objectType,
    },
    {
      children: item.model,
    },
    {
      children: item.priorityLevelName,
    },
    {
      children: item.routeId,
    },
    {
      children: item.routeStatus,
    },
    {
      children: item.updateddate,
    },
  ]
})

Element.displayName = 'SearchDataTable';

