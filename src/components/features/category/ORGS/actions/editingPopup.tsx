import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_AREA_EDITING, SELECT_ORGS_PARENT_EDITING, REQUEST_EDITING, REQUEST_EDITING_CANCEL, CHANGE_EDITING_INPUT } from '~stores/category/orgs/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Title from "~commons/title";
import * as Label from "~commons/label";
import * as Input from "~commons/input";
import * as Block from "~commons/block";
import * as Dropdown from "~commons/dropdown";
import { comboxProps } from "./";
import * as Combox from "~commons/combox";
import { HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const selectedItemSelector = useSelector(state => state['orgs'].selectedItem);

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
          max={50}
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
          max={200}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên cụm' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['orgs', 'selectedItem', 'areaSelected'],
            selectorKeys: ['root', 'areas'],
            reducerType: SELECT_AREA_EDITING,
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
            defaultSelectorKeys: ['orgs', 'selectedItem', 'orgsParentSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_PARENT_EDITING,
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
            selectorKeys: ['orgs', 'selectedItem', 'dvqlKc'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...actionsWrapperProps}>
        <Block.Element >
          <Title.Element text={errorMsg} color={Base.Color.RED}/>
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element {...submitButtonProps} />
          <Button.Element {...cancelButtonProps} />
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['orgs', 'edit', 'isShown'],
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


const validateForm = (popupSelector, setErrorMsg) => {
  // if (!popupSelector.orgsCode) {
  //   setErrorMsg('Mã đơn vị không được để trống');
  //   return false;
  // }
  // if (!popupSelector.orgsParentSelected.value) {
  //   setErrorMsg('DVQL phải được chọn');
  //   return false;
  // }
  return true;
}

export default Element;
Element.displayName = 'Actions_Button'
