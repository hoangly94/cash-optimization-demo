import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PERS_INPUT, HANDLE_DUALTABLE_MOVE, REQUEST_PERS, REQUEST_PERS_CANCEL, REQUEST_QUERY, SELECT_COMBOX_FILTER, SELECT_DUALTABLE_CONTENT_ROW, SELECT_PERS, SELECT_ROW } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Popup from "~commons/popup";
import * as Button from "~commons/button";
import * as Combox from "~commons/combox";
import * as Input from "~commons/input";
import { HANDLE_BUTTON, HANDLE_POPUP } from "~stores/_base/constants";
import * as DualTable from "~commons/dualTable";
import { _Date, getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Popup.Props) => {
  const selector = useSelector(state => state['routeManagement'].persPopup);
  const dispatch = useDispatch();
  return (
    <Popup.Element
      {...props}
    closePopUpCallback={() => dispatch({ type: REQUEST_PERS_CANCEL })}
    >
      <Block.Element
        flex={Base.Flex.START}
        margin={Base.MarginBottom.PX_18}
      >
        <Combox.Element
          width={Base.Width.PX_200}
          store={{
            defaultSelectorKeys: ['routeManagement', 'persPopup', 'searchType'],
            selectorKeys: ['routeManagement', 'persComboxFilter'],
            reducerType: SELECT_COMBOX_FILTER,
            reducerKeys: {
              text: 'text',
              value: 'value',
            },
          }}
        />
        <Input.Element
          store={{
            selectorKeys: ['routeManagement', 'persPopup', 'searchValue'],
            reducerType: CHANGE_PERS_INPUT,
          }}
        />

        <Button.Element
          text='QUERY'
          margin={Base.MarginLeft.PX_28}
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.GREEN}
          onClick={() => dispatch({ type: REQUEST_PERS })}
        />
      </Block.Element>
      <DualTable.Element
        type={DualTable.Type.BLOCK}
        titleCallback1={titleCallback}
        titleCallback2={titleCallback}
        cellMapping1={cellMapping(dispatch)}
        cellMapping2={cellMapping(dispatch)}
        store={{
          selector1Keys: ['routeManagement', 'persPopup', 'tableContent1'],
          selector2Keys: ['routeManagement', 'persPopup', 'tableContent2'],
          row1ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 1 },
          row2ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 2 },
          handleMoveActionType: HANDLE_DUALTABLE_MOVE,
        }}
        actionButtons={{
          oneRightToLeft: {
            text: 'Add',
            disabled: false,
          },
          oneLeftToRight: {
            text: 'Remove',
            disabled: false,
          },
          allRightToLeft: {
            disabled: true,
          },
          allLeftToRight: {
            disabled: true,
          },
        }}
        margin={Base.MarginBottom.PX_28}
        pagination={{
          store:{
            totalSelectorKeys: ['routeManagement', 'persPopup'],
            action: {
              type: REQUEST_PERS,
            }
          },
          style:{
            marginTop: '5px',
          }
        }}
      />

      <Block.Element
        margin={Base.MarginTop.PX_38}
        flex={Base.Flex.BETWEEN}
      >
        <Block.Element >
        </Block.Element>
        <Block.Element >
          <Button.Element
            text='Select'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            flexGrow={Base.FlexGrow.G1}
            margin={Base.MarginRight.PX_18}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'persPopup', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({type: SELECT_PERS})}
            isDisabled={selector.tableContent2?.length === 0}
          />
          <Button.Element
            text='Close'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'persPopup', 'isShown'],
                value: false,
              }
            }}
          />
        </Block.Element>
      </Block.Element>
    </Popup.Element >
  )
}

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const titleCallback = () => ([
  {
    ...tableData_$rows_$cells_title,
    children: 'STT',
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mã nhân viên',
    sort: {
      type: REQUEST_PERS,
      data: 'id',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Họ và tên nhân viên',
    sort: {
      type: REQUEST_PERS,
      data: 'pers_fullname',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Chức danh',
    sort: {
      type: REQUEST_PERS,
      data: 'pers_title',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'SĐT Nhân viên',
    sort: {
      type: REQUEST_PERS,
      data: 'pers_mobile ',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mã đơn vị quản lý NV',
    sort: {
      type: REQUEST_PERS,
      data: 'orgs_code',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Tên đơn vị quản lý NV',
    sort: {
      type: REQUEST_PERS,
      data: 'orgs_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Địa chỉ NV',
    sort: {
      type: REQUEST_PERS,
      data: 'orgs_address',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Trạng thái NV',
    sort: {
      type: REQUEST_PERS,
      data: 'persStatus',
    }
  },
]);

const cellMapping = (dispatch) => (item, index) => ([
  {
    children: index + 1,
  },
  {
    children: item.id,
  },
  {
    children: item.persFullname,
  },
  {
    children: item.persTitle,
  },
  {
    children: item.persMobile,
  },
  {
    children: item.categoryOrgs?.orgsCode,
  },
  {
    children: item.categoryOrgs?.orgsName,
  },
  {
    children: item.categoryOrgs?.orgsAddress,
  },
  {
    children: item.persStatus,
  },
]);

Element.displayName = 'SearchDataTable';

