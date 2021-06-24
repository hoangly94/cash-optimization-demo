import React, { useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_CREATING, SELECT_ATMCDM_STATUS_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/category/atmCdm/constants';
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
  const creatingPopupSelector = useSelector(state => state['atmCdm'].creatingPopup);
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
        <Title.Element text='Mã ATM/CDM' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Mã ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='Tên ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmName'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Loại máy ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='Loại máy ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmType'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='Địa chỉ ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmAddress'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={200}
        />
      </Block.Element>



      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['atmCdm', 'creatingPopup', 'orgsSelected'],
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
        <Title.Element text='Trạng thái ATM/CDM' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmSelected'],
            selectorKeys: ['root', 'atmcdmStatuses'],
            reducerType: SELECT_ATMCDM_STATUS_CREATING,
            reducerKeys: {
              text: 'name',
              value: 'value',
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
                keys: ['atmCdm', 'create', 'isShown'],
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
  if (!popupSelector.atmCdmCode) {
    setErrorMsg('Mã ATM/CDM không được để trống');
    return false;
  }
  if (!popupSelector.orgsSelected.value){
    setErrorMsg('Phải chọn DVQL');
    return false;
  }
  return true;
}

export default Element;
Element.displayName = 'CreatingPopup'
