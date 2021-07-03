import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_AREA_CREATING, SELECT_ORGS_PARENT_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/category/orgs/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { getCurrentDate } from "@utils";
import { comboxProps } from "./";
import { HANDLE_POPUP } from '_/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const creatingPopupSelector = useSelector(state => state['orgs'].creatingPopup);
  const dispatch = useDispatch();

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
    backgroundColor: Base.BackgroundColor.GREEN,
    color: Base.Color.WHITE,
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
          placeholder='Ngày đăng ký'
          {...inputProps}
          defaultValue={getCurrentDate()}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mã ĐV' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Mã ĐV'
          {...inputProps}
          store={{
            selectorKeys: ['orgs', 'creatingPopup', 'orgsCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐV' {...inputTitleProps} />
        <Input.Element
          placeholder='Tên ĐV'
          {...inputProps}
          store={{
            selectorKeys: ['orgs', 'creatingPopup', 'orgsName'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ ĐV' {...inputTitleProps} />
        <Input.Element
          placeholder='Địa chỉ ĐV'
          {...inputProps}
          store={{
            selectorKeys: ['orgs', 'creatingPopup', 'orgsAddress'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={200}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên cụm' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['orgs', 'creatingPopup', 'areaSelected'],
            selectorKeys: ['root', 'areas'],
            reducerType: SELECT_AREA_CREATING,
            reducerKeys: {
              text: 'areaName',
              value: 'id',
            },
            defaultOptions: [{
              text: '',
              value: 0,
            }],
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['orgs', 'creatingPopup', 'orgsParentSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_PARENT_CREATING,
            reducerKeys: {
              text: 'orgsName',
              value: 'id',
            },
            defaultOptions: [{
              text: '',
              value: 0,
            }],
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khoảng cách đến ĐVQL' {...inputTitleProps} />
        <Input.Element
          placeholder='Khoảng cách đến ĐVQL'
          {...inputProps}
          valueType={Input.ValueType.NUMBER}
          store={{
            selectorKeys: ['orgs', 'creatingPopup', 'dvqlKc'],
            reducerType: CHANGE_CREATING_INPUT,
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
                keys: ['orgs', 'create', 'isShown'],
                value: false,
              }
            }}
          />
        </Block.Element>
      </Block.Element>
    </Popup.Element>
  )
}

export const inputWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
  margin: Base.MarginBottom.PX_18,
}

export const inputTitleProps: Title.Props = {
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
  if (!popupSelector.orgsCode) {
    setErrorMsg('Mã đơn vị không được để trống');
    return false;
  }
  if (!popupSelector.orgsParentSelected.value) {
    setErrorMsg('DVQL phải được chọn');
    return false;
  }
  return true;
}


export default Element;
Element.displayName = 'Actions_Button'
