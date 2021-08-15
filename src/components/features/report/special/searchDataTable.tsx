import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/report/special/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';
import moment from 'moment';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['reportSpecial'].queryResult.data);
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
            data: 'id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thời gian thực tế',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgs_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa điểm đi',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgs_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đia điểm đến',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_orgs_dest_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại yêu cầu',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_orgs_dest_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại tiền',
          sort: {
            type: REQUEST_QUERY,
            data: 'cash_optimization_status',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại vàng',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đặc điểm',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số lượng',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVTLT',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Phương tiện vận chuyển',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Biển số xe',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số lộ trình',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên áp tải',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên bảo vệ',
          sort: {
            type: REQUEST_QUERY,
            data: '',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên lái xe',
          sort: {
            type: REQUEST_QUERY,
            data: '',
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
      children: item.starttime,
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
    {
      children: item.tenaptai,
    },
    {
      children: item.tenbaove,
    },
    {
      children: item.tenlaixe,
    },
  ]
})

Element.displayName = 'SearchDataTable';

