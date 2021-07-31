import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_CREATING, SELECT_NHNNTCTD_TYPE_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/category/nhnnTctd/constants';
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

  const [errorMsg, setErrorMsg] = useState('');
  const creatingPopupSelector = useSelector(state => state['nhnnTctd'].creatingPopup);
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
        <Title.Element text='Mã TCTD/NHNN' {...inputTitleProps} />
        <Input.Element
          placeholder='Mã TCTD/NHNN'
          {...inputProps}
          store={{
            selectorKeys: ['nhnnTctd', 'creatingPopup', 'nnhnTctdCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={22}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên TCTD/NHNN' {...inputTitleProps} />
        <Input.Element
          placeholder='Tên TCTD/NHNN'
          {...inputProps}
          store={{
            selectorKeys: ['nhnnTctd', 'creatingPopup', 'nnhnTctdName'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={60}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ TCTD/NHNN' {...inputTitleProps} />
        <Input.Element
          placeholder='Địa chỉ TCTD/NHNN'
          {...inputProps}
          store={{
            selectorKeys: ['nhnnTctd', 'creatingPopup', 'nnhnTctdAddress'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={200}
        />
      </Block.Element>
        
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Phân loại TCTD/NHNN' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['nhnnTctd', 'creatingPopup', 'nnhnTctdTypeSelected'],
            selectorKeys: ['root', 'nhnnTctdTypes'],
            reducerType: SELECT_NHNNTCTD_TYPE_CREATING,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['nhnnTctd', 'creatingPopup', 'orgsSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_CODE_CREATING,
            reducerKeys: {
              text: 'orgsName',
              value: 'id',
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
                keys: ['nhnnTctd', 'create', 'isShown'],
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
  // if (!popupSelector.nnhnTctdCode) {
  //   setErrorMsg('Mã TCTD/NHNN không được để trống');
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
