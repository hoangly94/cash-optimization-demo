import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROUTE_ROW, SELECT_SPECIAL_ROW } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import { HANDLE_BUTTON } from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['routeManagement'].organizingPopup.routeDetailOganize);
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
    ...tableData(queryResult?.map(item=>({
      ...item,
      stopPointType: item.stopPointType?.text ?? item.stopPointType,
    }))
    ?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {
      minWidth: '600px',
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
  dispatch({ type: SELECT_ROUTE_ROW, data: item });
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
          children: 'Trạng thái điểm dừng',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại điểm dừng',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên điểm đi',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đi',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Khoảng cách số PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình điều quỹ',
        },
        // {
        //   ...tableData_$rows_$cells_title,
        //   children: 'Số dư HĐB',
        // },
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
      children: index + 1,
    },
    {
      children: item.routeDetailOganizeStatus,
    },
    {
      children: item.stopPointType,
    },
    {
      children: item.departurePointName,
    },
    {
      children: item.departurePointAddress,
    },
    {
      children: item.destinationPointName,
    },
    {
      children: item.destinationPointAddress,
    },
    {
      children: item.kcDepartureToDestination,
    },
    {
      children: item.model,
    },
  ]
})

Element.displayName = 'SearchDataTable'

