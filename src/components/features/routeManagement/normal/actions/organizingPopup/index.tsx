import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_SEACHVEHICLEPERS_CANCEL, REQUEST_VEHICLE, REQUEST_PERS, REQUEST_VEHICLE_CANCEL, REQUEST_PERS_CANCEL, REQUEST_SEACHVEHICLEPERS_UPDATE, REQUEST_SEACHVEHICLEPERS_BACK, REQUEST_ORGANIZING_CANCEL, REQUEST_ORGANIZING, REQUEST_ORGANIZING_CHECK_STOP_POINT, REQUEST_ORGANIZING_BACK, REQUEST_ORGANIZING_CONTINUE, REQUEST_ORGANIZING_UPDATE, REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL, REQUEST_ORGANIZING_GET_KC, SELECT_COMBOX, HANDLE_SPECIAL_ADD, HANDLE_SPECIAL_DELETE, CHANGE_ORGANIZING_INPUT, REQUEST_ORGANIZING_INSERT, REQUEST_ORGANIZING_ADD_HDB, REQUEST_ORGANIZING_UPDATE_ORDER, FETCH_BALANCE_SPECIAL, } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Table from "~commons/table";
import * as SpecialTable from "./specialTable";
import * as RouteTable from "./routeTable";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_CURRENCIES } from '~/stores/dashboardRoot/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const selector = useSelector(state => state['routeManagement'].organizingPopup);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch({ type: FETCH_CURRENCIES });
  }, []);

  const handleSpecialAddButtonClick = () => {
    const isValidForm = validateSpecialForm(dispatch, selector);
    if (isValidForm) {
      dispatch({ type: HANDLE_SPECIAL_ADD });
    }
  }

  return (
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_ORGANIZING_CANCEL })}
    >
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số lộ trình' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'id'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Phương tiện vận chuyển' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'transportType'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Loại điểm dừng' {...inputTitleProps} />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['routeManagement', 'organizingPopup', 'stopPointType'],
            selectorKeys: ['root', 'stopPointTypes'],
            reducerType: REQUEST_ORGANIZING_CHECK_STOP_POINT,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Tên điểm đi' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'departurePointName'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Địa chỉ điểm đi' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'departurePointAddress'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Tên điểm đến' {...inputTitleProps} />
        <Block.Element
          flex={Base.Flex.BETWEEN}
          width={Base.Width.PER_70}
        >
          <Input.Element
            valueType={Input.ValueType.NUMBER}
            width={Base.Width.PER_70}
            margin={Base.MarginRight.PX_18}
            isDisabled={true}
            store={{
              selectorKeys: ['routeManagement', 'organizingPopup', 'destinationPointName'],
              reducerType: '',
            }}
          />
          <Button.Element
            text={'SEARCH'}
            border={Base.Border.NONE}
            color={Base.Color.WHITE}
            width={Base.Width.PER_30}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'destinationPointPopup', 'isShown'],
                value: true,
                popupType: 3,
              }
            }}
          // onClick={() => dispatch({ type: REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL })}
          />
        </Block.Element>
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Địa chỉ điểm đến' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'destinationPointAddress'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Số PYC HT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'cashOptimizationId'],
            reducerType: '',
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element text='Khoảng cách từ điểm đi đến điểm đến' {...inputTitleProps} />
        <Block.Element
          flex={Base.Flex.BETWEEN}
          width={Base.Width.PER_70}
        >
          <Input.Element
            valueType={Input.ValueType.NUMBER}
            width={Base.Width.PER_40}
            margin={Base.MarginRight.PX_18}
            isDisabled={true}
            store={{
              selectorKeys: ['routeManagement', 'organizingPopup', 'kcDepartureToDestination'],
              reducerType: '',
            }}
          />
          <Button.Element
            text={'GET'}
            border={Base.Border.NONE}
            color={Base.Color.WHITE}
            width={Base.Width.PER_30}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            onClick={() => dispatch({ type: REQUEST_ORGANIZING_GET_KC })}
          />
          <a
            style={{
              color: 'blue',
              cursor: 'pointer',
            }}
            onClick={() => {
              dispatch({
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'balanceSpecial', 'isShown'],
                value: true,
              });
              dispatch({ type: FETCH_BALANCE_SPECIAL })
            }}
          >Số dư HĐB</a>
        </Block.Element>
      </Block.Element>


      <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin chi tiết HĐB'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />

      <Block.Element {...inputWrapperProps} flex={Base.Flex.BETWEEN}>
        <Combox.Element
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            defaultSelectorKeys: ['routeManagement', 'organizingPopup', 'type'],
            selectorKeys: ['root', 'pycTypes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            defaultSelectorKeys: ['routeManagement', 'organizingPopup', 'currencyType'],
            selectorKeys: ['root', 'currencies'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'currencyType',
              value: 'currencyType',
            },
          }}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            defaultSelectorKeys: ['routeManagement', 'organizingPopup', 'goldType'],
            selectorKeys: ['root', 'goldTypes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
          isDisabled={selector.isDisabledGoldTypes ?? true}
          isInputDisabled={selector.isDisabledGoldTypes ?? true}
        />
        <Input.Element
          placeholder='Số lượng HĐB'
          margin={Base.MarginRight.PX_18}
          valueType={Input.ValueType.NUMBER}
          width={Base.Width.PX_300}
          store={{
            selectorKeys: ['routeManagement', 'organizingPopup', 'quanlity'],
            reducerType: CHANGE_ORGANIZING_INPUT,
          }}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['routeManagement', 'organizingPopup', 'attribute'],
            selectorKeys: ['root', 'pycAttributes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element
          flex={Base.Flex.BETWEEN}
        >
          <Button.Element
            text='Add'
            margin={Base.MarginRight.PX_8}
            width={Base.Width.PX_200}
            border={Base.Border.NONE}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            onClick={handleSpecialAddButtonClick}
          />
          <Button.Element
            text='Delete'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            backgroundColor={Base.BackgroundColor.RED}
            store={{
              // isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'specialDeleteEditing'],
              action: { type: HANDLE_SPECIAL_DELETE }
            }}
            isDisabled={!(selector?.selectedSpecial)}
          // onClick={() => dispatch({ type: HANDLE_BUTTON, keys: ['routeManagement', 'specialDeleteEditing', 'isDisabled'], value: true })}
          />
        </Block.Element>
      </Block.Element>
      <SpecialTable.Element />

      <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin thứ tự di chuyển của lộ trình'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
          marginTop: '28px',
        }}
      />
      <RouteTable.Element />
      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element
          flex={Base.Flex.BETWEEN}
        >
          <Button.Element
            text='Insert'
            width={Base.Width.PX_200}
            border={Base.Border.NONE}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            margin={Base.MarginRight.PX_8}
            onClick={() => dispatch({ type: REQUEST_ORGANIZING_INSERT })}
          />
          <Button.Element
            text='Delete'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            margin={Base.MarginRight.PX_8}
            backgroundColor={Base.BackgroundColor.RED}
            store={{
              // isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'specialDeleteEditing'],
              action: { type: REQUEST_ORGANIZING_UPDATE_ORDER, buttonType: 'DELETE' }
            }}
            isDisabled={!(selector?.selectedRouteDetailOganize)}
          />
          <Button.Element
            text='Up'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            margin={Base.MarginRight.PX_8}
            store={{
              // isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'specialDeleteEditing'],
              action: { type: REQUEST_ORGANIZING_UPDATE_ORDER, buttonType: 'UP' }
            }}
            isDisabled={!(selector?.selectedRouteDetailOganize)}
          />
          <Button.Element
            text='Down'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            store={{
              // isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'specialDeleteEditing'],
              action: { type: REQUEST_ORGANIZING_UPDATE_ORDER, buttonType: 'DOWN' }
            }}
            isDisabled={!(selector?.selectedRouteDetailOganize)}
          />
        </Block.Element>
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
            // store={{
            //   action: {
            //     type: HANDLE_POPUP,
            //     keys: ['routeManagement', 'organizingPopup', 'isShown'],
            //     value: false,
            //   }
            // }}
            onClick={() => dispatch({ type: REQUEST_ORGANIZING_UPDATE })}
          />
          <Button.Element
            text='Continue'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
            // store={{
            //   action: {
            //     type: HANDLE_POPUP,
            //     keys: ['routeManagement', 'organizingPopup', 'isShown'],
            //     value: false,
            //   }
            // }}
            onClick={() => dispatch({ type: REQUEST_ORGANIZING_CONTINUE })}
          />
          <Button.Element
            text='Back'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
            // store={{
            //   action: {
            //     type: HANDLE_POPUP,
            //     keys: ['routeManagement', 'organizingPopup', 'isShown'],
            //     value: false,
            //   }
            // }}
            onClick={() => dispatch({ type: REQUEST_ORGANIZING_BACK })}
          />
          <Button.Element
            text='PREVIEW'
            margin={Base.MarginRight.PX_28}
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'mapPopup', 'isShown'],
                value: true,
              }
            }}
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
                keys: ['routeManagement', 'organizingPopup', 'isShown'],
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
          children: 'Tên đơn bị quản lý xe',
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
      children: index + 1,
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
      children: item.persStatus,
    },
  ]
})



const validateSpecialForm = (dispatch, selector) => {
  if (!selector.type?.value) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Loại yêu cầu' } });
    return false;
  }
  if (!selector.currencyType?.value) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Loại tiền' } });
    return false;
  }
  if (['ACB', 'XAU'].includes(selector.currencyType.value) && !selector.goldType.value) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Loại vàng' } });
    return false;
  }
  if (!selector.quanlity || selector.quanlity == '0') {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Số lượng' } });
    return false;
  }
  if (!selector.attribute?.value) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Đặc điểm' } });
    return false;
  }

  return true;
}


export default Element;
Element.displayName = 'OrganizingPopup'
