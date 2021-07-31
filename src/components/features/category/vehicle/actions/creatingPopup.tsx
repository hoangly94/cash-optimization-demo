import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT, SELECT_FUNCTIONS_CREATING, SELECT_STATUS_CREATING, SELECT_PERS_CREATING, REQUEST_PERS } from '~stores/category/vehicle/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { _Date, getCurrentDate } from "@utils";
import { comboxProps } from "./";
import { HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: REQUEST_PERS });
  });
  const [errorMsg, setErrorMsg] = useState('');
  const creatingPopupSelector = useSelector(state => state['vehicle'].creatingPopup);

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(creatingPopupSelector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: REQUEST_CREATING });
      if (setIsShown)
        setIsShown(false)
    }
  }


  const submitButtonProps: Button.Props = {
    text: 'Create',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handleSubmitButtonClick,
  }

  const handleCancelButtonClick = () => {
    dispatch({ type: REQUEST_CREATING_CANCEL });
  }
  const cancelButtonProps: Button.Props = {
    text: 'Cancel',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    color: Base.Color.WHITE,
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
            selectorKeys: ['vehicle', 'creatingPopup', 'vehicleCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={10}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Loại xe' {...inputTitleProps} />
        <Input.Element
          placeholder='Loại xe'
          {...inputProps}
          store={{
            selectorKeys: ['vehicle', 'creatingPopup', 'vehicleType'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức năng' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'creatingPopup', 'vehicleFunctionSelected'],
            selectorKeys: ['root', 'functions'],
            reducerType: SELECT_FUNCTIONS_CREATING,
            reducerKeys: {
              text: 'functionName',
              value: 'id',
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
            selectorKeys: ['vehicle', 'creatingPopup', 'vehicleYearManufacture'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={20}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'creatingPopup', 'orgsSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_CODE_CREATING,
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
            selectorKeys: ['vehicle', 'creatingPopup', 'region'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['vehicle', 'creatingPopup', 'vehicleStatusSelected'],
            selectorKeys: ['root', 'vehicleStatuses'],
            reducerType: SELECT_STATUS_CREATING,
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
            defaultSelectorKeys: ['vehicle', 'creatingPopup', 'driverCodeSelected'],
            selectorKeys: ['vehicle', 'pers'],
            reducerType: SELECT_PERS_CREATING,
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
                keys: ['vehicle', 'create', 'isShown'],
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
  // if (!popupSelector.vehicleCode) {
  //   setErrorMsg('Biển số xe không được để trống');
  //   return false;
  // }
  // if (!popupSelector.vehicleFunctionSelected.value){
  //   setErrorMsg('Phải chọn Chức năng');
  //   return false;
  // }
  // if (!popupSelector.orgsSelected.value){
  //   setErrorMsg('Phải chọn DVQL');
  //   return false;
  // }
  return true;
}

export default Element;
Element.displayName = 'CreatingPopup'
