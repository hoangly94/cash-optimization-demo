import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Combox from "~commons/combox";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { _Date, getCurrentDate } from "@utils";
import { HANDLE_BUTTON, HANDLE_POPUP } from '_/stores/_base/constants';
import { INPUT_VALUE_FILTER, REQUEST_QUERY, SELECT_ROW, SELECT_TYPE_FILTER } from '_/stores/authority/searchPers/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const dispatch = useDispatch();
  const queryResultSelector = useSelector(state => state['searchPers'].queryResult.data);
  const popupTypeSelector = useSelector(state => state['registration'].popupType);
  useLayoutEffect(() => {
    dispatch({ type: REQUEST_QUERY });
  }, []);

  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    style: {
      minHeight: '200px',
      maxHeight: '500px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    ...props,
  };
  const tableProps: Table.Props = {
    ...tableData(queryResultSelector?.map(mapResponseToData(handleRowClick(dispatch)))),
    // height: Base.Height.PX_300,
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
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
      <Block.Element
        flex={Base.Flex.BETWEEN}
        margin={Base.MarginBottom.PX_18}
      >
        <Block.Element
          flex={Base.Flex.START}
        >
          <Combox.Element
            $selectorWrapper={{
              style: {
                backgroundColor: '#e8e8e8',
              }
            }}
            width={Base.Width.PX_200}
            store={{
              defaultSelectorKeys: ['searchPers', 'filters', 'type'],
              selectorKeys: ['searchPers', 'filters', 'types'],
              reducerType: SELECT_TYPE_FILTER,
              reducerKeys: {
                text: 'text',
                value: 'value',
              },
              // defaultOptions: [{
              //   text: 'Tất cả',
              //   value: 0,
              // }],
            }}
          />

          <Input.Element
            width={Base.Width.PX_300}
            store={{
              selectorKeys: ['searchPers', 'filters', 'value'],
              reducerType: INPUT_VALUE_FILTER,
            }}
            max={200}
          />
        </Block.Element>

        <Button.Element
          text='Query'
          backgroundColor={Base.BackgroundColor.GREEN}
          border={Base.Border.NONE}
          color={Base.Color.WHITE}
          width={Base.Width.PX_200}
          store={{
            action: { type: REQUEST_QUERY },
          }}
        />
      </Block.Element>
      <Block.Element {...borderWrapperProps}>
        <Table.Element {...tableProps} />
      </Block.Element>
      <Block.Element {...actionsWrapperProps}>
        <Pagination.Element
          store={{
            totalSelectorKeys: ['searchPers', 'queryResult'],
            action: {
              type: REQUEST_QUERY,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />

        <Block.Element
          flex={Base.Flex.END}
          width={Base.Width.PER_50}
        >
          <Button.Element
            flexGrow={Base.FlexGrow.G1}
            color={Base.Color.WHITE}
            text='Select'
            backgroundColor={Base.BackgroundColor.TIGERLILY}
            margin={Base.MarginRight.PX_18}
            store={{
              isDisabledSelectorKeys: ['base', 'buttons', 'searchPers', 'select'],
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'searchPers', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({
              type: HANDLE_POPUP,
              keys: ['registration', popupTypeSelector == 1 ? 'create' : 'edit', 'isShown'],
              value: true,
            })}
          />
          <Button.Element
            text='Close'
            flexGrow={Base.FlexGrow.G1}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'searchPers', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({
              type: HANDLE_POPUP,
              keys: ['registration', popupTypeSelector == 1 ? 'create' : 'edit', 'isShown'],
              value: true,
            })}
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

const handleRowClick = (dispatch) => (item) => (e) => {
  dispatch({ type: SELECT_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['searchPers', 'select', 'isDisabled'], value: false });
}

const tableData = (queryResult): Table.Props => ({
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
          children: 'Mã NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ Tên NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'CMND',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Chức vụ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT Nhân viên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã chi nhánh quản lý',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên chi nhánh quản lý',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái NV',
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
      children: item.persCode,
    },
    {
      children: item.persFullname,
    },
    {
      children: item.persCmndCccd,
    },
    {
      children: item.persTitle,
    },
    {
      children: item.persMobile,
    },
    {
      children: item.categoryOrgs.orgsCode,
    },
    {
      children: item.categoryOrgs.orgsName,
    },
    {
      children: item.categoryOrgs.orgsAddress,
    },
    {
      children: item.persStatus,
    },
  ]
})

export default Element;
Element.displayName = 'SearchPersPopup'
