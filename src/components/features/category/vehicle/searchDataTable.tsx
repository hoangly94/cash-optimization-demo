import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/category/vehicle/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['vehicle'].queryResult.data);
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
  dispatch({ type: HANDLE_BUTTON, keys: ['vehicle', 'edit', 'isDisabled'], value: false });
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
          children: 'Biển số xe',
          sort: {
            type: REQUEST_QUERY,
            data: 'vehicleCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại xe',
          sort: {
            type: REQUEST_QUERY,
            data: 'vehicleType',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Chức năng',
          sort: {
            type: REQUEST_QUERY,
            data: 'categoryFunction.functionName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Năm sản xuất',
          sort: {
            type: REQUEST_QUERY,
            data: 'vehicleYearManufacture',
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
          children: 'Khu vực',
          sort: {
            type: REQUEST_QUERY,
            data: 'region',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
          sort: {
            type: REQUEST_QUERY,
            data: 'vehicleStatus',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã lái xe',
          sort: {
            type: REQUEST_QUERY,
            data: 'driverCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên lái xe',
          sort: {
            type: REQUEST_QUERY,
            data: 'driverName',
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
      children: item.vehicleCode,
    },
    {
      children: item.vehicleType,
    },
    {
      children: item.categoryFunction.functionName,
    },
    {
      children: item.vehicleYearManufacture,
    },
    {
      children: item.categoryOrgs.orgsCode,
    },
    {
      children: item.categoryOrgs.orgsName,
    },
    {
      children: item.region,
    },
    {
      children: item.vehicleStatus,
    },
    {
      children: item.driverCode,
    },
    {
      children: item.driverName,
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

