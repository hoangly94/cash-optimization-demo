import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, SELECT_ROW } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import {HANDLE_BUTTON} from "~stores/_base/constants";
import * as Table from "~commons/table";
import { _Date, getCurrentDate } from '@utils';
import moment from 'moment';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['pycRegistration'].queryResult.data);
  const userSelector = useSelector(state => state['auth'].user);
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
    ...tableData(queryResult?.map(mapResponseToData(handleRowClick(dispatch, userSelector)))),
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

const handleRowClick = (dispatch, userSelector) => (item) => (e) => {
  dispatch({ type: SELECT_ROW, data: item, user: userSelector });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: false });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'orgsSearching', 'isDisabled'], value: false });
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
          children: 'Ng??y t???o PYC',
          sort: {
            type: REQUEST_QUERY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'S??? PYC HT',
          sort: {
            type: REQUEST_QUERY,
            data: 'id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'S??? PYC ??V',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgs_request_id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'M?? ??VYC??Q ',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgs_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'T??n ??VYC??Q',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgs_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'M?? ??V??Q',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_orgs_dest_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'T??n ??V??Q',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_orgs_dest_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tr???ng th??i PYC',
          sort: {
            type: REQUEST_QUERY,
            data: 'cash_optimization_status',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: '?????i t?????ng ??Q',
          sort: {
            type: REQUEST_QUERY,
            data: 'object_type',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'M?? h??nh ??Q',
          sort: {
            type: REQUEST_QUERY,
            data: 'model',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'M???c ????? ??u ti??n',
          sort: {
            type: REQUEST_QUERY,
            data: 'priority_level_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'S??? LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'route_id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tr???ng th??i LT',
          sort: {
            type: REQUEST_QUERY,
            data: 'route_status',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'M?? ATM',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_atm_cdm_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'T??n ATM',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_atm_cdm_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'M?? NH ?????i t??c KPP m??? TK',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_nnhn_tctd_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'T??n NH ?????i t??c KPP m??? TK',
          sort: {
            type: REQUEST_QUERY,
            data: 'coo_nnhn_tctd_name',
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
      children: item.createddate && moment(item.createddate, 'DD-MM-YYYY').format('DD/MM/YYYY'),
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
      children: item?.priorityLevelName,
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
      children: item.updateddate && moment(item.updateddate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
    },
  ]
})

Element.displayName = 'SearchDataTable';

