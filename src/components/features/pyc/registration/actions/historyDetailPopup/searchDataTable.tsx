import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW, SELECT_SPECIAL_ROW } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import { HANDLE_BUTTON } from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate, thousandSeparator } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['pycRegistration'].history?.detailPopup?.cashOptimizationDetailHistModelList);
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
  dispatch({ type: SELECT_SPECIAL_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'specialDeleteEditing'], value: false });
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
          children: 'Loại yêu cầu',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại Tiền',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại vàng',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số lượng HĐB',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đặc điểm',
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
      children: item.type,
    },
    {
      children: item.currencyType
    },
    {
      children: item.goldType,
    },
    {
      children: thousandSeparator(item.quanlity),
    },
    {
      children: item.attribute,
    },
  ],
})

Element.displayName = 'SearchDataTable'

