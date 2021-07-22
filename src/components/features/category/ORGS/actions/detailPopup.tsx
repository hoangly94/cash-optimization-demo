import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_HISTORY, SELECT_HISTORY_ROW, FETCH_HISTORY_DETAIL } from '~stores/category/orgs/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { _Date, getCurrentDate } from "@utils";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const dispatch = useDispatch();
  const historySelector = useSelector(state => state['orgs'].detailPopup);
  const tableProps: Table.Props = {
    ...tableData(historySelector?.data?.map(mapResponseToData(handleRowClick(dispatch)))),
    // height: Base.Height.PX_300,
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
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
            totalSelectorKeys: ['orgs', 'detailPopup'],
            action: {
              type: FETCH_HISTORY_DETAIL,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />
        <Block.Element {...actionsProps}>
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['orgs', 'historyDetail', 'isShown'],
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
          children: 'Mã ĐV',
          sort: {
            type: FETCH_HISTORY,
            data: 'orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐV',
          sort: {
            type: FETCH_HISTORY,
            data: 'orgsName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ Đơn vị',
          sort: {
            type: FETCH_HISTORY,
            data: 'orgsAddress',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã cụm',
          sort: {
            type: FETCH_HISTORY,
            data: 'areaCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên cụm',
          sort: {
            type: FETCH_HISTORY,
            data: 'areaName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVQL',
          sort: {
            type: FETCH_HISTORY,
            data: 'categoryOrgsParent.orgsParentId',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVQL',
          sort: {
            type: FETCH_HISTORY,
            data: 'categoryOrgsParent.orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'KC đến ĐVQL',
          sort: {
            type: FETCH_HISTORY,
            data: 'dvqlKc',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày đăng ký',
          sort: {
            type: FETCH_HISTORY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'NV đăng ký',
          sort: {
            type: FETCH_HISTORY,
            data: 'createdby',
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
      children: index + 1,
    },
    {
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.orgsAddress,
    },
    {
      children: item.areaCode,
    },
    {
      children: item.areaName,
    },
    {
      children: item.categoryOrgs.orgsParentId,
    },
    {
      children: item.categoryOrgs.orgsName,
    },
    {
      children: item.dvqlKc,
    },
    {
      children: _Date.getCurrentDate(item.createddate),
    },
    {
      children: item.createdbyname,
    },
    {
      children: _Date.getCurrentDate(item.updateddate),
    },
  ]
})

export default Element;
Element.displayName = 'Popup'
