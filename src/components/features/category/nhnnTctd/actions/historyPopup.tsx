import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_HISTORY } from '~stores/category/nhnnTctd/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { getCurrentDate } from "@utils";
import { HANDLE_POPUP } from '_/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const dispatch = useDispatch();
  const historySelector = useSelector(state => state['nhnnTctd'].history);
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    style: {
      maxHeight: '500px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    ...props,
  };
  const tableProps: Table.Props = {
    ...tableData(historySelector.data?.map(mapResponseToData)),
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
    width:Base.Width.FULL,
    margin:Base.MarginBottom.PX_18,
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
            totalSelectorKeys: ['nhnnTctd', 'history'],
            action: {
              type: FETCH_HISTORY,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />
        <Block.Element>
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['nhnnTctd', 'history', 'isShown'],
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

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const tableData = (queryResult?): Table.Props => ({
  $rows: [
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
          children: 'Mã NHNN/TCTD',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên NHNN/TCTD',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ NHNN/TCTD',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Phân loại NHNN/TCTD',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã DVQL',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên DVQL',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày đăng ký',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'NV đăng ký',
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

const mapResponseToData = (item, index) => ({
  isSelected: item.isSelected ?? false,
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.nnhnTctdCode,
    },
    {
      children: item.nnhnTctdName,
    },
    {
      children: item.nnhnTctdAddress,
    },
    {
      children: item.nnhnTctdType,
    },
    {
      children: item.categoryOrgs.orgsCode,
    },
    {
      children: item.categoryOrgs.orgsName,
    },
    {
      children: getCurrentDate(item.createddate),
    },
    {
      children: item.createdby,
    },
    {
      children: getCurrentDate(item.updateddate),
    },
  ]
})

export default Element;
Element.displayName = 'HistoryPopup'
