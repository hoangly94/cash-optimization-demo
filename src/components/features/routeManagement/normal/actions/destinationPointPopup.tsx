import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_SEACHVEHICLEPERS_CONTINUE, REQUEST_SEACHVEHICLEPERS_CANCEL, SELECT_COMBOX_FILTER, REQUEST_VEHICLE, REQUEST_PERS, REQUEST_VEHICLE_CANCEL, REQUEST_PERS_CANCEL, REQUEST_SEACHVEHICLEPERS_UPDATE, REQUEST_SEACHVEHICLEPERS_BACK, SELECT_ROW_DESTINATION_POINT, SELECT_DESTINATION_POINT, REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL, } from '~stores/routeManagement/normal/constants';
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

  const selector = useSelector(state => state['routeManagement'].organizingPopup);
  const dispatch = useDispatch();
  return (
    <Popup.Element
      {...props}
      // closePopUpCallback={() => dispatch({ type: REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL })}
    >

      <Title.Element text='Thông tin xe đính kèm lái xe được chọn tham gia lộ trình'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...vehicleTableData(selector.routeDetailVehicle?.map(vehicleMapResponseToData(handleRowClick(dispatch))))}
          backgroundColor={Base.BackgroundColor.WHITE}
          style={{
            minWidth: '1800px',
          }}
        />
      </Block.Element>

      <Title.Element text='Thông tin NHÂN VIÊN được chọn tham gia lộ trình'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...persTableData(selector.routeDetailPers?.map(persMapResponseToData(handleRowClick(dispatch))))}
          backgroundColor={Base.BackgroundColor.WHITE}
          style={{
            minWidth: '1800px',
          }}
        />
      </Block.Element>

      <Title.Element text='Thông tin tên và địa chỉ điểm đến theo PYC được chọn tham gia lộ trình'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...pycTableData(selector.routeCashOptimization?.map(pycMapResponseToData(handleRowClick(dispatch), dispatch)))}
          backgroundColor={Base.BackgroundColor.WHITE}
          style={{
            minWidth: '1800px',
          }}
        />
      </Block.Element>

      <Title.Element text='Thông tin tên và địa chỉ đến theo ĐVTLT'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...orgsTableData((selector.categoryOrgs ? [selector.categoryOrgs] : [])?.map(orgsMapResponseToData(handleRowClick(dispatch))))}
          backgroundColor={Base.BackgroundColor.WHITE}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element
            text='Select'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'destinationPointPopup', 'isShown'],
                value: false,
              }
            }}
            onClick={() => dispatch({ type: SELECT_DESTINATION_POINT })}
            isDisabled={!selector.selectedItem}
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
                keys: ['routeManagement', 'destinationPointPopup', 'isShown'],
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

const handleRowClick = (dispatch) => (item, tableType) => (e) => {
  dispatch({ type: SELECT_ROW_DESTINATION_POINT, data: item, tableType });
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
          children: 'Tên điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Biển số xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên Lái xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã đơn vị quản lý xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên đơn bị quản lý xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT Lái xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Vị trí GPS của xe',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const vehicleMapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 1),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.categoryVehicle?.categoryOrgs?.orgsName,
    },
    {
      children: item.categoryVehicle?.categoryOrgs?.orgsAddress,
    },
    {
      children: item.vehicleCode,
    },
    {
      children: item.categoryVehicle?.vehicleStatus,
    },
    {
      children: item.categoryVehicle?.categoryOrgs?.orgsCode,
    },
    {
      children: item.categoryVehicle?.categoryOrgs?.orgsName,
    },
    {
      children: item.categoryVehicle?.driverName,
    },
    {
      children: item.categoryVehicle?.categoryPers?.persMobile,
    },
    {
      children: item.gps,
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
          children: 'Tên điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên nhân viên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Chức danh',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT Nhân viên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVQL NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVQL NV',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const persMapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 2),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsName,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsAddress,
    },
    {
      children: item.persCode,
    },
    {
      children: item.categoryPers?.persStatus,
    },
    {
      children: item.persName,
    },
    {
      children: item.categoryPers?.persTitle,
    },
    {
      children: item.categoryPers?.persMobile,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsCode,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsName,
    },
  ]
})

const pycTableData = (queryResult?): Table.Props => ({
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
          children: 'Tên điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVYCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thông tin chi tiết HĐB',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Khoảng cách',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const pycMapResponseToData = (handleRowClick, dispatch) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 3),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.cashOptimization?.orgsName,
    },
    {
      children: item.cashOptimization?.orgsName,
    },
    {
      children: item.cashOptimizationId,
    },
    {
      children: item.cashOptimization?.routeStatus,
    },
    {
      children: item.cashOptimization?.priorityLevelName,
    },
    {
      children: item.cashOptimization?.orgsName,
    },
    {
      children: <a
        style={{
          color: 'blue',
          cursor: 'pointer',
        }}
        onClick={() => dispatch({
          type: HANDLE_POPUP,
          keys: ['routeManagement', 'special', 'isShown'],
          value: true,
        })} >Link</a>,
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
    },
  ]
})

const orgsTableData = (queryResult?): Table.Props => ({
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
          children: 'Tên điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đến',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const orgsMapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 4),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.orgsAddress,
    },
  ]
})

export default Element;
Element.displayName = 'DestinationPointPopup'
