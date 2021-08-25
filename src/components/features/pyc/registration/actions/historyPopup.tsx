import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_HISTORY, GET_PYC_HISTORY_EXCEL, SELECT_HISTORY_ROW, SELECT_ROW } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';
import moment from 'moment';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const historySelector = useSelector(state => state['pycRegistration'].history);
  const dispatch = useDispatch();

  // const tableProps: Table.Props = {
  //   ...tableData(historySelector.data?.map(mapResponseToData)),
  //   // height: Base.Height.PX_300,
  //   backgroundColor: Base.BackgroundColor.WHITE,
  //   margin: Base.MarginBottom.PX_18,
  // }
  const tableProps: Table.Props = {
    ...tableData(historySelector?.data?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
    style: {
      minWidth: '2500px',
    }
  }
  const buttonProps: Button.Props = {
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
  }

  const borderWrapperProps = {
    width: Base.Width.FULL,
    margin: Base.MarginBottom.PX_18,
    style: {
      overflow: 'auto',
      maxHeight: '520px',
    }
  }

  return (
    <Popup.Element {...props}>
      <Block.Element {...borderWrapperProps}>
        <Table.Element {...tableProps} />
      </Block.Element>
      <Block.Element {...actionsWrapperProps}>
        <Pagination.Element
          store={{
            totalSelectorKeys: ['pycRegistration', 'history'],
            action: {
              type: FETCH_HISTORY,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />
        <Block.Element {...actionsProps}>
          <Button.Element
            {...buttonProps}
            text='View'
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            margin={Base.MarginRight.PX_18}
            store={{
              isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'historyDetail'],
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'history', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({
              type: HANDLE_POPUP,
              keys: ['pycRegistration', 'historyDetail', 'isShown'],
              value: true,
              popupType: 3,
            })}
          />
          <Button.Element
            {...buttonProps}
            text='Excel'
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            margin={Base.MarginRight.PX_18}
            onClick={() => dispatch({ type: GET_PYC_HISTORY_EXCEL })}
          />
          <Button.Element
            {...buttonProps}
            text='Close'
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'history', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'historyDetail', 'isDisabled'], value: true })}
          />
        </Block.Element>
      </Block.Element>
    </Popup.Element>
  )
}

const actionsWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
}

const actionsProps: Block.Props = {
  flex: Base.Flex.END,
  width: Base.Width.PER_70,
}


const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const handleRowClick = (dispatch) => (item) => (e) => {
  dispatch({ type: SELECT_HISTORY_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'historyDetail', 'isDisabled'], value: false });
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
          children: 'Ngày tạo PYC',
          sort: {
            type: FETCH_HISTORY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC HT',
          sort: {
            type: FETCH_HISTORY,
            data: 'id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC ĐV',
          sort: {
            type: FETCH_HISTORY,
            data: 'orgs_request_id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVYCĐQ ',
          sort: {
            type: FETCH_HISTORY,
            data: 'orgs_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVYCĐQ',
          sort: {
            type: FETCH_HISTORY,
            data: 'orgs_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVĐQ',
          sort: {
            type: FETCH_HISTORY,
            data: 'coo_orgs_dest_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVĐQ',
          sort: {
            type: FETCH_HISTORY,
            data: 'coo_orgs_dest_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái PYC',
          sort: {
            type: FETCH_HISTORY,
            data: 'cash_optimization_status',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đối tượng ĐQ',
          sort: {
            type: FETCH_HISTORY,
            data: 'objectType',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình ĐQ',
          sort: {
            type: FETCH_HISTORY,
            data: 'model',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
          sort: {
            type: FETCH_HISTORY,
            data: 'priority_level_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số LT',
          sort: {
            type: FETCH_HISTORY,
            data: 'route_id',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái LT',
          sort: {
            type: FETCH_HISTORY,
            data: 'route_status',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ATM',
          sort: {
            type: FETCH_HISTORY,
            data: 'coo_atm_cdm_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ATM',
          sort: {
            type: FETCH_HISTORY,
            data: 'coo_atm_cdm_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã NH đối tác KPP mở TK',
          sort: {
            type: FETCH_HISTORY,
            data: 'coo_nnhn_tctd_code',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên NH đối tác KPP mở TK',
          sort: {
            type: FETCH_HISTORY,
            data: 'coo_nnhn_tctd_name',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Datelastmaint',
          sort: {
            type: FETCH_HISTORY,
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
      children: item.createddate.split('-').join('/'),
    },
    {
      children: item.cashOptimizationId,
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
      children: item.cashOptimizationOrgsDetailHistModel?.orgsDestCode || '',
    },
    {
      children: item.cashOptimizationOrgsDetailHistModel?.orgsDestName,
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
      children: item.cashOptimizationOrgsDetailHistModel?.atmCdmCode || '',
    },
    {
      children: item.cashOptimizationOrgsDetailHistModel?.atmCdmName,
    },
    {
      children: item.cashOptimizationOrgsDetailHistModel?.nnhnTctdCode || '',
    },
    {
      children: item.cashOptimizationOrgsDetailHistModel?.nnhnTctdName,
    },
    {
      children: item.updateddate && moment(item.updateddate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
    },
  ]
})

export default Element;
Element.displayName = 'Popup'
