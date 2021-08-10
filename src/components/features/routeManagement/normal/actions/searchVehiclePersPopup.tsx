import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_SEACHVEHICLEPERS_CONTINUE, REQUEST_SEACHVEHICLEPERS_CANCEL, SELECT_COMBOX_FILTER, REQUEST_VEHICLE, REQUEST_PERS, REQUEST_VEHICLE_CANCEL, REQUEST_PERS_CANCEL, REQUEST_SEACHVEHICLEPERS_UPDATE, REQUEST_SEACHVEHICLEPERS_BACK, } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Table from "~commons/table";
import * as VehiclePopup from "./vehiclePopup";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import moment from 'moment';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const selector = useSelector(state => state['routeManagement'].searchVehiclePersPopup);
  console.log(selector);
  const dispatch = useDispatch();
  const vehicleTableProps: Table.Props = {
    ...vehicleTableData(selector.vehicles?.map(vehicleMapResponseToData())),
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {
      minWidth: '1800px',
    },
  }

  const persTableProps: Table.Props = {
    ...persTableData(selector.pers?.map(persMapResponseToData())),
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {
      minWidth: '1800px',
    },
  }
  return (
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_SEACHVEHICLEPERS_CANCEL })}
    >
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số lộ trình' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'searchVehiclePersPopup', 'id'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Phương tiện vận chuyển' {...inputTitleProps} />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['routeManagement', 'searchVehiclePersPopup', 'transportType'],
            selectorKeys: ['root', 'routeTransportTypes'],
            reducerType: SELECT_COMBOX_FILTER,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps} alignItems={Base.AlignItems.CENTER}>
        <Title.Element text='Thông tin xe đính kèm lái xe được chọn tham gia lộ trình'
          width={Base.Width.PER_70}
          tagType={Title.TagType.H3}
        />
        <Button.Element
          text={'TÌM XE'}
          border={Base.Border.NONE}
          color={Base.Color.WHITE}
          width={Base.Width.PX_200}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeManagement', 'vehiclePopup', 'isShown'],
              value: true,
              popupType: 3,
            }
          }}
          onClick={() => dispatch({ type: REQUEST_VEHICLE_CANCEL })}
        />
      </Block.Element>
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element {...vehicleTableProps} />
      </Block.Element>

      <Block.Element {...inputWrapperProps} alignItems={Base.AlignItems.CENTER}>
        <Title.Element text='Thông tin nhân viên được chọn tham gia lộ trình'
          width={Base.Width.PER_70}
          tagType={Title.TagType.H3}
        />
        <Button.Element
          text={'TÌM NHÂN VIÊN'}
          border={Base.Border.NONE}
          color={Base.Color.WHITE}
          width={Base.Width.PX_200}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeManagement', 'persPopup', 'isShown'],
              value: true,
              popupType: 4,
            }
          }}
          onClick={() => dispatch({ type: REQUEST_PERS_CANCEL })}
        />
      </Block.Element>
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element {...persTableProps} />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element
            text='Update'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
            onClick={() => dispatch({ type: REQUEST_SEACHVEHICLEPERS_UPDATE })}
          />
          <Button.Element
            text='Continue'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
            onClick={() => dispatch({ type: REQUEST_SEACHVEHICLEPERS_CONTINUE })}
          />
          <Button.Element
            text='Back'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
            onClick={() => dispatch({ type: REQUEST_SEACHVEHICLEPERS_BACK })}
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
                keys: ['routeManagement', 'searchVehiclePersPopup', 'isShown'],
                value: false,
              }
            }}
          />
        </Block.Element>
      </Block.Element>
    </Popup.Element>
  )
}

const inputWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
  margin: Base.MarginBottom.PX_18,
}

const inputTitleProps: Title.Props = {
  width: Base.Width.PER_30,
}

const inputProps: Input.Props = {
  width: Base.Width.PER_70,
}

const actionsWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
}

const actionsProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
  width: Base.Width.PER_70,
}

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const vehicleTableData = (queryResult?): Table.Props => ({
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
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const vehicleMapResponseToData = () => (item, index) => ({
  isSelected: item.isSelected ?? false,
  $cells: [
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
  ]
})

const persTableData = (queryResult?): Table.Props => ({
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
            data: '',
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
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const persMapResponseToData = () => (item, index) => ({
  isSelected: item.isSelected ?? false,
  $cells: [
    {
      children: item.index || index + 1,
    },
    {
      children: item.id,
    },
    {
      children: item.persFullname,
    },
    {
      children: item.categoryTitle?.titleName,
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
  ]
})


const validateForm = (dispatch, selector) => {
  if (!moment(selector.startTime, 'DD/MM/YYYY HH:mm:ss', true).isValid()) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Sai Thời gian bắt đầu lộ trình (dd/mm/yyyy hh:mm:ss)' } });
    return false;
  }
  return true;
}

export default Element;
Element.displayName = 'SearchVehiclePersPopup'
