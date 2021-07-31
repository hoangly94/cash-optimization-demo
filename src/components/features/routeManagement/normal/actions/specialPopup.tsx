import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props & {
  selector?: any,
};

export const Element = (props: Props) => {
  const selector = useSelector(state => state['routeManagement'].special);
  const dispatch = useDispatch();
  const tableProps: Table.Props = {
    ...tableData(selector?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
    style: {
      minWidth: '800px',
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
        <Block.Element {...actionsProps}>
          <Button.Element
            {...buttonProps}
            text='Close'
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'special', 'isShown'],
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
  width: Base.Width.FULL,
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
          children: 'loại tiền',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'loại vàng',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số lượng HĐB',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Đặc điểm',
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
      children: item.currencyType
    },
    {
      children: item.goldType
    },
    {
      children: item.quanlity
    },
    {
      children: item.attribute
    },
  ]
})

export default Element;
Element.displayName = 'Popup'
