import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Combox from "~commons/combox";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { getCurrentDate } from "@utils";
import { HANDLE_BUTTON, HANDLE_POPUP } from '_/stores/_base/constants';
import { INPUT_VALUE_FILTER, REQUEST_QUERY, SELECT_ROW, SELECT_TYPE_FILTER } from '~stores/authority/searchOrgs/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const dispatch = useDispatch();
  const queryResultSelector = useSelector(state => state['searchOrgs'].queryResult.data);
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
          margin={Base.MarginRight.PX_18}
        >
          <Combox.Element
            width={Base.Width.PX_80}
            store={{
              defaultSelectorKeys: ['searchOrgs', 'filters', 'locationType'],
              selectorKeys: ['searchOrgs', 'filters', 'locationTypes'],
              reducerType: SELECT_TYPE_FILTER,
              reducerKeys: {
                text: 'text',
                value: 'value',
              },
            }}
          />

          <Input.Element
            width={Base.Width.PX_150}
            store={{
              selectorKeys: ['searchOrgs', 'filters', 'locationValue'],
              reducerType: INPUT_VALUE_FILTER,
            }}
            max={200}
          />
        </Block.Element>

        <Block.Element
          flex={Base.Flex.START}
          margin={Base.MarginRight.PX_18}
        >
          <Combox.Element
            width={Base.Width.PX_100}
            store={{
              defaultSelectorKeys: ['searchOrgs', 'filters', 'orgsType'],
              selectorKeys: ['searchOrgs', 'filters', 'orgsTypes'],
              reducerType: SELECT_TYPE_FILTER,
              reducerKeys: {
                text: 'text',
                value: 'value',
              },
            }}
          />

          <Input.Element
            width={Base.Width.PX_150}
            store={{
              selectorKeys: ['searchOrgs', 'filters', 'orgsValue'],
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
          width={Base.Width.PX_150}
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
            totalSelectorKeys: ['searchOrgs', 'queryResult'],
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
              isDisabledSelectorKeys: ['base', 'buttons', 'searchOrgs', 'select'],
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'searchOrgs', 'isShown'],
                value: false,
              }
            }}
          />
          <Button.Element
            text='Close'
            flexGrow={Base.FlexGrow.G1}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'searchOrgs', 'isShown'],
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

const handleRowClick = (dispatch) => (item) => (e) => {
  dispatch({ type: SELECT_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['searchOrgs', 'select', 'isDisabled'], value: false });
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
          children: 'Mã đơn vị',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên đơn vị',
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
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
  ]
})

export default Element;
Element.displayName = 'SearchOrgsPopup'
