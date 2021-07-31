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
import { HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { INPUT_ORGS_VALUE_FILTER, REQUEST_QUERY, SELECT_LOCATION_TYPE_FILTER, SELECT_ORGS_TYPE_FILTER, SELECT_ROW } from '~stores/routeManagement/searchOrgs/constants';
import * as RegionAreaFilter from './regionAreaFilter';
import { FETCH_ORGSSEARCHING_DISTANCE, REQUEST_ORGSSEARCHING_CANCEL } from '~/stores/pyc/registration/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const dispatch = useDispatch();
  const queryResultSelector = useSelector(state => state['pycSearchOrgs'].queryResult.data);
  useLayoutEffect(() => {
    dispatch({ type: REQUEST_QUERY });
  }, []);

  //create props
  const tableProps: Table.Props = {
    ...tableData(queryResultSelector?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
  }
  const borderWrapperProps = {
    width: Base.Width.FULL,
    margin: Base.MarginBottom.PX_18,
    style: {
      overflow: 'auto',
      minHeight: '200px',
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
            $selectorWrapper={{
              style: {
                backgroundColor: '#e8e8e8',
              }
            }}
            width={Base.Width.PX_80}
            store={{
              defaultSelectorKeys: ['pycSearchOrgs', 'filters', 'locationType'],
              selectorKeys: ['pycSearchOrgs', 'filters', 'locationTypes'],
              reducerType: SELECT_LOCATION_TYPE_FILTER,
              reducerKeys: {
                text: 'text',
                value: 'value',
              },
            }}
            isInputDisabled={true}
          />
          <RegionAreaFilter.Element
            width={Base.Width.PX_150}
          />
        </Block.Element>

        <Block.Element
          flex={Base.Flex.START}
          margin={Base.MarginRight.PX_18}
        >
          <Combox.Element
            $selectorWrapper={{
              style: {
                backgroundColor: '#e8e8e8',
              }
            }}
            width={Base.Width.PX_100}
            store={{
              defaultSelectorKeys: ['pycSearchOrgs', 'filters', 'orgsType'],
              selectorKeys: ['pycSearchOrgs', 'filters', 'orgsTypes'],
              reducerType: SELECT_ORGS_TYPE_FILTER,
              reducerKeys: {
                text: 'text',
                value: 'value',
              },
            }}
            isInputDisabled={true}
          />

          <Input.Element
            placeholder='Nhập giá trị...'
            width={Base.Width.PX_150}
            store={{
              selectorKeys: ['pycSearchOrgs', 'filters', 'orgsValue'],
              reducerType: INPUT_ORGS_VALUE_FILTER,
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
            totalSelectorKeys: ['pycSearchOrgs', 'queryResult'],
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
              // isDisabledSelectorKeys: ['base', 'buttons', 'pycSearchOrgs2', 'select'],
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'pycSearchOrgs2', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({
              type: HANDLE_POPUP,
              keys: ['routeManagement', 'orgsSearching', 'isShown'],
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
                keys: ['routeManagement', 'pycSearchOrgs2', 'isShown'],
                value: false,
              }
            }}
            onClick={() => {
              dispatch({
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'orgsSearching', 'isShown'],
                value: true,
              });
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
  dispatch({ type: SELECT_ROW, data: item, searchOrgsType: 2 });
  dispatch({ type: HANDLE_BUTTON, keys: ['pycSearchOrgs', 'select', 'isDisabled'], value: false });
  dispatch({ type: FETCH_ORGSSEARCHING_DISTANCE });
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
          children: 'Mã đơn vị',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên đơn vị',
          sort: {
            type: REQUEST_QUERY,
            data: 'orgsName',
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
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
  ]
})

export default Element;
Element.displayName = 'SearchOrgsPopup'
