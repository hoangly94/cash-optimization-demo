import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';

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

const handleRowClick = (dispatch) => (item) => (e)=> {
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
          children: 'Ngày tạo PYC',
          sort: {
            type: REQUEST_QUERY,
            data: 'createddate',
          }
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
          children: 'Số PYC ĐV',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsRequestId',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVYCĐQ ',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVYCĐQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVĐQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationOrgsDetailModel.orgsDestCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVĐQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationOrgsDetailModel.orgsDestName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái PYC',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationStatus',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đối tượng ĐQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'objectType',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình ĐQ',
          sort: {
            type: REQUEST_QUERY,
            data: 'model',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
          sort: {
            type: REQUEST_QUERY,
            data: 'priorityLevelName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'routeId',
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
          children: 'Mã ATM',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationOrgsDetailModel.atmCdmCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ATM',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationOrgsDetailModel.atmCdmName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã NH đối tác KPP mở TK',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationOrgsDetailModel.nnhnTctdCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên NH đối tác KPP mở TK',
          sort: {
            type: REQUEST_QUERY,
            data: 'cashOptimizationOrgsDetailModel.nnhnTctdName',
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
      children: item.createddate,
    },
    {
      children: item.id,
    },
    {
      children: item.orgsRequestId,
    },
    {
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.cashOptimizationOrgsDetailModel?.orgsDestCode || '',
    },
    {
      children: item.cashOptimizationOrgsDetailModel?.orgsDestName,
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
      children: item.routeId || '',
    },
    {
      children: item.routeStatus,
    },
    {
      children: item.cashOptimizationOrgsDetailModel?.atmCdmCode || '',
    },
    {
      children: item.cashOptimizationOrgsDetailModel?.atmCdmName,
    },
    {
      children: item.cashOptimizationOrgsDetailModel?.nnhnTctdCode || '',
    },
    {
      children: item.cashOptimizationOrgsDetailModel?.nnhnTctdName,
    },
    {
      children: _Date.getCurrentDate(item.updateddate),
    },
  ]
})

Element.displayName = 'SearchDataTable';

