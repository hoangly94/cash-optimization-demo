import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_SEACHVEHICLEPERS_CANCEL, REQUEST_VEHICLE, REQUEST_PERS, REQUEST_VEHICLE_CANCEL, REQUEST_PERS_CANCEL, REQUEST_SEACHVEHICLEPERS_UPDATE, REQUEST_SEACHVEHICLEPERS_BACK, REQUEST_ORGANIZING_CANCEL, REQUEST_ORGANIZING, REQUEST_ORGANIZING_CHECK_STOP_POINT, REQUEST_ORGANIZING_BACK, REQUEST_ORGANIZING_CONTINUE, REQUEST_ORGANIZING_UPDATE, REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL, REQUEST_ORGANIZING_GET_KC, SELECT_COMBOX, HANDLE_SPECIAL_ADD, HANDLE_SPECIAL_DELETE, CHANGE_ORGANIZING_INPUT, REQUEST_ORGANIZING_INSERT, REQUEST_ORGANIZING_ADD_HDB, REQUEST_ORGANIZING_UPDATE_ORDER, FETCH_BALANCE_SPECIAL, REQUEST_ORGANIZING_URGENT_UPDATE, REQUEST_ORGANIZING_SEARCH_DESTINATION, FETCH_BALANCE_SPECIAL_TOTAL, } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as SpecialTable from "./specialTable";
import * as RouteTable from "./routeTable";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_CURRENCIES } from '~/stores/dashboardRoot/constants';
import { thousandSeparator } from '@utils';
import { useConfirmationDialog } from '@hooks';

export type Props = Popup.Props & {
  popupType: string,
};

export const Element = (props: Props) => {
  const { popupType } = props;
  const selector = useSelector(state => state['routeManagement'].organizingPopup);
  const [confirmationDialog, setConfirmationDialog] = useConfirmationDialog({});
  const dispatch = useDispatch();
  const stopPointType = selector.stopPointType.value;
  const stopPointTypeAllowed = 'Điểm dừng nhận quỹ của ĐVTLT';
  
  const prevSelectedOrder = (selector.selectedRouteDetailOganize?.order || 0) - 1;
  const preRouteDetailOganize = selector.routeDetailOganizeTemp?.filter(item => item.order === prevSelectedOrder)[0];
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
      closePopUpCallback={() => {
        dispatch({ type: REQUEST_ORGANIZING_BACK, confirm: 'NO', noti: true });
        dispatch({ type: REQUEST_ORGANIZING_CANCEL });
      }}
      extractHtml={confirmationDialog}
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

          // onClick={() => dispatch({ type: REQUEST_ORGANIZING_SEARCH_DESTINATION })}
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
              dispatch({ type: FETCH_BALANCE_SPECIAL_TOTAL })
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
            selectorKeys: ['routeManagement', 'pycTypes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
          isDisabled={stopPointType !== stopPointTypeAllowed}
          isInputDisabled={stopPointType !== stopPointTypeAllowed}
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
          isDisabled={stopPointType !== stopPointTypeAllowed}
          isInputDisabled={stopPointType !== stopPointTypeAllowed}
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
          isDisabled={stopPointType !== stopPointTypeAllowed}
          valueMapper={v=>{
            if(v == 0)
              return '';
            const numParts = v?.toString().replaceAll(',', '');
            return thousandSeparator(parseInt(numParts));
          }}
          max={50}
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
          isDisabled={stopPointType !== stopPointTypeAllowed}
          isInputDisabled={stopPointType !== stopPointTypeAllowed}
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
            isDisabled={stopPointType !== stopPointTypeAllowed}
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
            isDisabled={
              !(selector?.selectedSpecial)
              || stopPointType !== stopPointTypeAllowed
            }
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
      <Block.Element
        {...actionsWrapperProps}
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
            store={{
              isLoadingSelectorKeys: ['base', 'buttons', 'routeManagement', 'routeDetailOganizeInsert'],
              action: { type: REQUEST_ORGANIZING_INSERT }
            }}
            onClick={() => {
              dispatch({ type: REQUEST_ORGANIZING_CANCEL });
              dispatch({ type: REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL })
            }}
            isDisabled={!selector.stopPointType?.value || selector?.routeDetailOganizeTemp.filter(item =>
              selector.stopPointType?.text === item.stopPointType &&
              item.routeDetailOganizeStatus === "ACT" && item.stopPointAction === 'Y' && (!selector.cashOptimizationId || selector.cashOptimizationId === item.cashOptimizationId)).length
              || selector.departurePointAddress === 'NULL' || selector.destinationPointAddress === 'NULL'}
          />
          <Button.Element
            text='Delete'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            margin={Base.MarginRight.PX_8}
            backgroundColor={Base.BackgroundColor.RED}
            store={{
              isLoadingSelectorKeys: ['base', 'buttons', 'routeManagement', 'routeDetailOganizeInsert'],
              action: { type: REQUEST_ORGANIZING_UPDATE_ORDER, buttonType: 'DELETE' }
            }}
            isDisabled={!(selector?.selectedRouteDetailOganize)
              || selector.selectedRouteDetailOganize?.routeDetailOganizeStatus != 'ACT'}
          />
          <Button.Element
            text='Up'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            margin={Base.MarginRight.PX_8}
            store={{
              isLoadingSelectorKeys: ['base', 'buttons', 'routeManagement', 'routeDetailOganizeInsert'],
              action: { type: REQUEST_ORGANIZING_UPDATE_ORDER, buttonType: 'UP' }
            }}
            isDisabled={!(selector?.selectedRouteDetailOganize)
              || selector.selectedRouteDetailOganize?.routeDetailOganizeStatus != 'ACT' || preRouteDetailOganize?.routeDetailOganizeStatus != 'ACT'}
          />
          <Button.Element
            text='Down'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            store={{
              isLoadingSelectorKeys: ['base', 'buttons', 'routeManagement', 'routeDetailOganizeInsert'],
              action: { type: REQUEST_ORGANIZING_UPDATE_ORDER, buttonType: 'DOWN' }
            }}
            isDisabled={!(selector?.selectedRouteDetailOganize)
              || selector.selectedRouteDetailOganize?.routeDetailOganizeStatus != 'ACT'}
          />
        </Block.Element>
      </Block.Element>
      <RouteTable.Element 
        margin={Base.MarginTop.PX_28}
        />

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
            onClick={() => {
              setConfirmationDialog({
                title: 'Bạn muốn lưu thông tin đăng ký vào hệ thống',
                description: 'Nhấn YES để lưu thông tin, nhấn NO để quay lại',
                onConfirmClick: () => {
                  if (popupType == 'normal')
                    dispatch({ type: REQUEST_ORGANIZING_UPDATE });
                  if (popupType == 'urgent')
                    dispatch({ type: REQUEST_ORGANIZING_URGENT_UPDATE });
                },
                onDismissClick: () => {
                  dispatch({
                    type: HANDLE_POPUP,
                    keys: ['routeManagement', 'organizingPopup', 'isShown'],
                    value: false,
                  })
                },
                isShown: true,
              });
            }}
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
            onClick={() => {
              setConfirmationDialog({
                title: 'Bạn muốn lưu thông tin đăng ký vào hệ thống',
                description: 'Nhấn YES để lưu thông tin, nhấn NO để quay lại',
                onConfirmClick: () => {
                  dispatch({ type: REQUEST_ORGANIZING_CONTINUE });
                },
                onDismissClick: () => {
                  dispatch({
                    type: HANDLE_POPUP,
                    keys: ['routeManagement', 'organizingPopup', 'isShown'],
                    value: false,
                  })
                },
                isShown: true,
              });
            }}
            isDisabled={!(selector.routeStatus == 'Organizing')}
            style={selector.routeStatus == 'Organizing' ? {} : {
              display: 'none',
            }}
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
            onClick={() => {
              setConfirmationDialog({
                title: 'Trạng thái lộ trình sẽ chuyển về Adding và thông tin sắp xếp lộ trình sẽ bị xóa. Bạn có muốn thực hiện không?',
                description: 'Nhấn YES để lưu thông tin, nhấn NO để quay lại',
                onConfirmClick: () => {
                  dispatch({ type: REQUEST_ORGANIZING_BACK, confirm: 'YES' });
                },
                onDismissClick: () => {
                  dispatch({ type: REQUEST_ORGANIZING_BACK, confirm: 'NO' });
                  dispatch({
                    type: HANDLE_POPUP,
                    keys: ['routeManagement', 'organizingPopup', 'isShown'],
                    value: false,
                  })
                },
                isShown: true,
              });
            }}
            isDisabled={!(selector.routeStatus === 'Organizing')}
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
            onClick={() => dispatch({ type: REQUEST_ORGANIZING_BACK, confirm: 'NO', noti: true })}
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
  if (!selector.quanlity) {
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
