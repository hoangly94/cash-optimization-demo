import React, { useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_AREA_EDITING, SELECT_ORGS_PARENT_EDITING, REQUEST_EDITING, REQUEST_EDITING_CANCEL, CHANGE_EDITING_INPUT } from '~stores/orgs/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Title from "~commons/title";
import * as Label from "~commons/label";
import * as Input from "~commons/input";
import * as Block from "~commons/block";
import * as Dropdown from "~commons/dropdown";
import * as Form from "~commons/form";
import { getCurrentDate, getDateString } from "@utils";
import { comboxProps } from "./";
import * as Combox from "~commons/combox";

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  const [errorMsg, setErrorMsg] = useState(false);
  const selectedItemSelector = useSelector(state => state['orgs'].selectedItem);
  // const popupSelector = useSelector(state => state['atmCdm'].editingPopup);
  const dispatch = useDispatch();



  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(selectedItemSelector);
    if (isValidForm) {
      setErrorMsg(false)
      dispatch({ type: REQUEST_EDITING })
      if (setIsShown)
        setIsShown(false)
    }
    if (!isValidForm)
      setErrorMsg(true)
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
    onClick: handleCancelButtonClick,
  }


  const handleCloseButtonClick = () => {
    if (setIsShown)
      setIsShown(false)
  }
  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    onClick: handleCloseButtonClick,
  }
  const errorMsgDisplay = errorMsg ? { display: 'block' } : { display: 'none' };

  return (
    <Popup.Element {...props}>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày đăng ký' {...inputTitleProps} />
        <Input.Element
          placeholder='Ngày đăng ký'
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['orgs', 'selectedItem', 'createddate'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mã ĐV' {...inputTitleProps} />
        <Input.Element
          placeholder='Mã ĐV'
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['orgs', 'selectedItem', 'orgsCode'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐV' {...inputTitleProps} />
        <Input.Element
          placeholder='Tên ĐV'
          {...inputProps}
          store={{
            selectorKeys: ['orgs', 'selectedItem', 'orgsName'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>
      
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ ĐV' {...inputTitleProps} />
        <Input.Element
          placeholder='Địa chỉ ĐV'
          {...inputProps}
          store={{
            selectorKeys: ['orgs', 'selectedItem', 'orgsAddress'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên cụm' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['orgs', 'selectedItem', 'areaSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_AREA_EDITING,
            reducerKeys: {
              text: 'areaName',
              value: 'id',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['orgs', 'selectedItem', 'orgsParentSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_PARENT_EDITING,
            reducerKeys: {
              text: 'orgsName',
              value: 'id',
            },
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
            selectorKeys: ['orgs', 'selectedItem', 'dvqlKc'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...actionsWrapperProps}>
        <Block.Element >
          <Title.Element text="Vui lòng điền đủ thông tin." color={Base.Color.RED} style={{ ...errorMsgDisplay }} />
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element {...submitButtonProps} />
          <Button.Element {...cancelButtonProps} />
          <Button.Element {...closeButtonProps} />
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
}

const inputLabelProps: Label.Props = {
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

const dropdownProps: Dropdown.Props = {
  width: Base.Width.PER_70,
}

const validateForm = (creatingPopupSelector) => {
  if (!creatingPopupSelector.orgsCode)
    return false;
  return true;
}


export default Element;
Element.displayName = 'Actions_Button'
