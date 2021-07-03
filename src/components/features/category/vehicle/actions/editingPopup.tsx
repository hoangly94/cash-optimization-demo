import React, { useRef, useState } from 'react'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_EDITING, REQUEST_EDITING, REQUEST_EDITING_CANCEL, CHANGE_EDITING_INPUT } from '~stores/category/vehicle/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { comboxProps } from ".";
import { getCurrentDate } from "@utils";
import { HANDLE_POPUP } from '_/stores/_base/constants';
import { SELECT_FUNCTIONS_EDITING, SELECT_PERS_EDITING, SELECT_STATUS_EDITING } from '~stores/category/vehicle/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const selectedItemSelector = useSelector(state => state['vehicle'].selectedItem);

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(selectedItemSelector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: REQUEST_EDITING });
      if (setIsShown)
        setIsShown(false)
    }
  }

  const submitButtonProps: Button.Props = {
    text: 'Update',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    backgroundColor: Base.BackgroundColor.GREEN,
    color: Base.Color.WHITE,
    onClick: handleSubmitButtonClick,
  }

  const handleCancelButtonClick = () => {
    dispatch({ type: REQUEST_EDITING_CANCEL });
  }
  const cancelButtonProps: Button.Props = {
    text: 'Cancel',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    color: Base.Color.WHITE,
    // onClick: () => dispatch({ type: REQUEST_CREATING_CANCEL }),
    onClick: handleCancelButtonClick,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }
  const errorMsgDisplay = errorMsg ? { display: 'block' } : { display: 'none' };
  
  return (
    <Popup.Element {...props}>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày đăng ký' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Ngày đăng ký'
          {...inputProps}
          defaultValue={getCurrentDate()}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Biển số xe' {...inputTitleProps} />
        <Input.Element
          placeholder='Biển số xe'
          {...inputProps}
          store={{
            selectorKeys: ['vehicle', 'selectedItem', 'vehicleCode'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Loại xe' {...inputTitleProps} />
        <Input.Element
          placeholder='Loại xe'
          {...inputProps}
          store={{
            selectorKeys: ['vehicle', 'selectedItem', 'vehicleType'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức năng' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'selectedItem', 'vehicleFunctionSelected'],
            selectorKeys: ['root', 'functions'],
            reducerType: SELECT_FUNCTIONS_EDITING,
            reducerKeys: {
              text: 'functionName',
              value: 'functionCode',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Năm sản xuất' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Năm sản xuất'
          {...inputProps}
          store={{
            selectorKeys: ['vehicle', 'selectedItem', 'vehicleYearManufacture'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={20}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'selectedItem', 'orgsSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_CODE_EDITING,
            reducerKeys: {
              text: 'orgsName',
              value: 'id',
            },
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khu vực' {...inputTitleProps} />
        <Input.Element
          placeholder='Khu vực'
          {...inputProps}
          store={{
            selectorKeys: ['vehicle', 'selectedItem', 'region'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'selectedItem', 'vehicleStatusSelected'],
            selectorKeys: ['root', 'vehicleStatuses'],
            reducerType: SELECT_STATUS_EDITING,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>
      
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Họ và tên lái xe' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'selectedItem', 'driverCodeSelected'],
            selectorKeys: ['root', 'pers'],
            reducerType: SELECT_PERS_EDITING,
            reducerKeys: {
              text: 'persFullname',
              value: 'persCode',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...actionsWrapperProps}>
        <Block.Element >
          <Title.Element text={errorMsg} color={Base.Color.RED} />
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element {...submitButtonProps} />
          <Button.Element {...cancelButtonProps} />
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['vehicle', 'edit', 'isShown'],
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

const validateForm = (popupSelector, setErrorMsg) => {
  if (!popupSelector.vehicleCode) {
    setErrorMsg('Biển số xe không được để trống');
    return false;
  }
  if (!popupSelector.vehicleFunctionSelected.value){
    setErrorMsg('Phải chọn Chức năng');
    return false;
  }
  if (!popupSelector.orgsSelected.value){
    setErrorMsg('Phải chọn DVQL');
    return false;
  }
  return true;
}

export default Element;
Element.displayName = 'EditingPopup'
