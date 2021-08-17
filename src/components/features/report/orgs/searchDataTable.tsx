import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/report/orgs/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';
import moment from 'moment';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['reportOrgs'].queryResult.data);
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
      minWidth: '2500px',
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
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: false });
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
          children: 'Số PYC HT',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashoptimizationid',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên NV áp tải',
          sort: {
            type: REQUEST_QUERY,
            data: 'persfullname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'CMND/CCCD NV áp tải',
          sort: {
            type: REQUEST_QUERY,
            data: 'perscmndcccd',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên đơn vị quản lý',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian thực tế',
          sort: {
            type: REQUEST_QUERY,
            data: 'starttime',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa điểm đi',
          sort: {
            type: REQUEST_QUERY,
            data: 'departurepointname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa điểm đến',
          sort: {
            type: REQUEST_QUERY,
            data: 'destinationpointname',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại yêu cầu',
          sort: {
            type: REQUEST_QUERY,
            data: 'type',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại tiền',
          sort: {
            type: REQUEST_QUERY,
            data: 'currencytype',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại vàng',
          sort: {
            type: REQUEST_QUERY,
            data: 'goldtype',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đặc điểm',
          sort: {
            type: REQUEST_QUERY,
            data: 'attribute',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số tiền',
          sort: {
            type: REQUEST_QUERY,
            data: 'quanlity',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVTLT',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgroutename',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Phương tiện vận chuyển',
          sort: {
            type: REQUEST_QUERY,
            data: 'vehicletype',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Biển số xe',
          sort: {
            type: REQUEST_QUERY,
            data: 'vehiclecode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số lộ trình',
          sort: {
            type: REQUEST_QUERY,
            data: 'routeid',
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
      children: item.cashoptimizationid,
    },
    {
      children: item.persfullname,
    },
    {
      children: item.perscmndcccd,
    },
    {
      children: item.orgsname,
    },
    {
      children: item.starttime && moment(item.starttime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      children: item.departurepointname,
    },
    {
      children: item.destinationpointname,
    },
    {
      children: item.type,
    },
    {
      children: item.currencytype,
    },
    {
      children: item?.goldtype,
    },
    {
      children: item.attribute,
    },
    {
      children: item.quanlity,
    },
    {
      children: item.orgroutename,
    },
    {
      children: item.vehicletype,
    },
    {
      children: item.vehiclecode,
    },
    {
      children: item.routeid || '',
    },
  ]
})

Element.displayName = 'SearchDataTable';

