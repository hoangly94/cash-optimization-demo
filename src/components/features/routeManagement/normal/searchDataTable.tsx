import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['routeManagement'].queryResult.data);
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
      minWidth: '1800px',
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
  dispatch({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: false });
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
          children: 'Ngày tạo LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số lộ trình',
          sort: {
            type: REQUEST_QUERY,
            data: 'id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVTLT',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVTLT',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'routeStatus',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Version LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgs_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên thủ quỹ ĐVTLT',
          sort: {
            type: REQUEST_QUERY,
            data: 'tqDltltName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian bắt đầu LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'startTime',
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
      children: _Date.getDate(item.createddate),
    },
    {
      children: item.id,
    },
    {
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.routeStatus,
    },
    {
      children: item.routeVersion,
    },
    {
      children: item.tqDltltName,
    },
    {
      children: _Date.getDate(item.startTime),
    },
    {
      children: _Date.getDate(item.updateddate),
    },
  ]
})

Element.displayName = 'SearchDataTable';

