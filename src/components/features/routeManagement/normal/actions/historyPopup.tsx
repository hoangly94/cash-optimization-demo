import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_HISTORY, GET_HISTORY_EXCEL, SELECT_HISTORY_ROW, SELECT_ROW } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';
import { REQUEST_QUERY } from '_/stores/routeManagement/normal/constants';
import { _Date } from '_/utils';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const historySelector = useSelector(state => state['routeManagement'].history);
  const dispatch = useDispatch();
  const tableProps: Table.Props = {
    ...tableData(historySelector?.data?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
    style:{
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
            totalSelectorKeys: ['routeManagement', 'history'],
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
              isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'historyDetail'],
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'history', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'detail', 'isShown'],
                value: true,
                popupType: 3,
            })}
          />
          <Button.Element
            {...buttonProps}
            text='Excel'
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            margin={Base.MarginRight.PX_18}
            onClick={() => dispatch({ type: GET_HISTORY_EXCEL })}
          />
          <Button.Element
            {...buttonProps}
            text='Close'
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'history', 'isShown'],
                value: false,
              }
            }}
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
  dispatch({ type: HANDLE_BUTTON, keys: ['routeManagement', 'historyDetail', 'isDisabled'], value: false });
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
      children: index + 1,
    },
    {
      children: _Date.getDate(item.startTime),
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

export default Element;
Element.displayName = 'Popup'
