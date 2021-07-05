import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_HISTORY, GET_PYC_HISTORY_EXCEL, SELECT_HISTORY_ROW, SELECT_ROW } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { HANDLE_POPUP } from '_/stores/_base/constants';

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
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'history', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'detail', 'isShown'],
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
  
const handleRowClick = (dispatch) => (item) => (e)=> {
  dispatch({ type: SELECT_HISTORY_ROW, data: item });
}


const tableData = (queryResult): Table.Props => ({
  $rows: [
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
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC ĐV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVYCĐQ ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVYCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái PYC',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đối tượng ĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình ĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số LT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái LT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ATM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ATM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã NH đối tác KPP mở TK',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên NH đối tác KPP mở TK',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Datelastmaint',
        },
      ],
    },
    ...(queryResult ? queryResult : []),
  ],
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
      children: item.updateddate,
    },
  ]
})

export default Element;
Element.displayName = 'Popup'
