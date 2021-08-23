import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_VEHICLE_INPUT, CHECK_VEHICLE, HANDLE_DUALTABLE_MOVE, REQUEST_QUERY, REQUEST_VEHICLE, REQUEST_VEHICLE_CANCEL, SELECT_COMBOX_FILTER, SELECT_DUALTABLE_CONTENT_ROW, SELECT_ROW, SELECT_VEHICLE } from '~stores/routeManagement/normal/constants';
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
  const selector = useSelector(state => state['routeManagement'].vehiclePopup);
  
  const dispatch = useDispatch();
  return (
    <Popup.Element
      {...props}
    closePopUpCallback={() => dispatch({ type: REQUEST_VEHICLE_CANCEL })}
    >
      <Block.Element
        flex={Base.Flex.START}
        margin={Base.MarginBottom.PX_18}
      >
        <Combox.Element
          width={Base.Width.PX_200}
          store={{
            defaultSelectorKeys: ['routeManagement', 'vehiclePopup', 'searchType'],
            selectorKeys: ['routeManagement', 'vehicleComboxFilter'],
            reducerType: SELECT_COMBOX_FILTER,
            reducerKeys: {
              text: 'text',
              value: 'value',
            },
          }}
        />
        <Input.Element
          store={{
            selectorKeys: ['routeManagement', 'vehiclePopup', 'searchValue'],
            reducerType: CHANGE_VEHICLE_INPUT,
          }}
        />

        <Button.Element
          text='QUERY'
          margin={Base.MarginLeft.PX_28}
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.GREEN}
          onClick={() => dispatch({ type: REQUEST_VEHICLE })}
        />
      </Block.Element>
      <DualTable.Element
        type={DualTable.Type.BLOCK}
        title1='Danh sách xe sẵn sàng'
        title2='Xe được chọn'
        titleCallback1={titleCallback}
        titleCallback2={titleCallback}
        cellMapping1={cellMapping(dispatch)}
        cellMapping2={cellMapping(dispatch)}
        store={{
          selector1Keys: ['routeManagement', 'vehiclePopup', 'tableContent1'],
          selector2Keys: ['routeManagement', 'vehiclePopup', 'tableContent2'],
          row1ClickAction: { type: CHECK_VEHICLE, popupType: 1, tableType: 1 },
          row2ClickAction: { type: CHECK_VEHICLE, popupType: 1, tableType: 2 },
          handleMoveActionType: HANDLE_DUALTABLE_MOVE,
        }}
        actionButtons={{
          oneRightToLeft: {
            text: 'Add',
            isShown: false,
            isDisabled: selector?.tableContent2?.length > 0,
            onClick: () => dispatch({type: REQUEST_VEHICLE}),
          },
          oneLeftToRight: {
            text: 'Remove',
            isShown: false,
            onClick: () => dispatch({type: REQUEST_VEHICLE}),
          },
          allRightToLeft: {
            isShown: true,
          },
          allLeftToRight: {
            isShown: true,
          },
        }}
        margin={Base.MarginBottom.PX_28}
        pagination={{
          store:{
            totalSelectorKeys: ['routeManagement', 'vehiclePopup'],
            action: {
              type: REQUEST_VEHICLE,
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
                keys: ['routeManagement', 'vehiclePopup', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({type: SELECT_VEHICLE})}
            // isDisabled={selector.tableContent2?.length === 0}
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
                keys: ['routeManagement', 'vehiclePopup', 'isShown'],
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
    children: 'Trạng thái xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'vehicle_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Biển số xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'vehicle_code',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mã đơn vị quản lý xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'orgs_code',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Tên đơn vị quản lý xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'orgs_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Họ và tên Lái xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'driver_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'SĐT Lái xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'pers_mobile',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Vị trí GPS của xe',
    sort: {
      type: REQUEST_VEHICLE,
      data: 'vehicle_gps',
    }
  },
]);

const cellMapping = (dispatch) => (item, index) => ([
  {
    children: item.index || index + 1,
  },
  {
    children: item.vehicleStatus,
  },
  {
    children: item.vehicleCode,
  },
  {
    children: item.categoryOrgs?.orgsCode,
  },
  {
    children: item.categoryOrgs?.orgsName,
  },
  {
    children: item.driverName,
  },
  {
    children: item.categoryPers?.persMobile,
  },
  {
    children: item.vehicleGps,
  },
]);

Element.displayName = 'SearchDataTable';

