import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/category/area/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['area'].queryResult.data);
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
      minWidth: '1500px',
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
  dispatch({ type: HANDLE_BUTTON, keys: ['area', 'edit', 'isDisabled'], value: false });
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
          children: 'Mã cụm',
          sort: {
            type: REQUEST_QUERY,
            data: 'areaCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên cụm',
          sort: {
            type: REQUEST_QUERY,
            data: 'areaName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã vùng',
          sort: {
            type: REQUEST_QUERY,
            data: 'categoryRegion.regionCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên vùng',
          sort: {
            type: REQUEST_QUERY,
            data: 'categoryRegion.regionName',
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
      children: index + 1,
    },
    {
      children: item.areaCode,
    },
    {
      children: item.areaName,
    },
    {
      children: item.categoryRegion.regionCode,
    },
    {
      children: item.categoryRegion.regionName,
    },
    {
      children: _Date.getCurrentDate(item.createddate),
    },
    {
      children: item.createdby,
    },
    {
      children: _Date.getCurrentDate(item.updateddate),
    },
  ]
})

Element.displayName = 'SearchDataTable'

