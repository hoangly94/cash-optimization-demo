import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT, SELECT_TITLE_CREATING,SELECT_STATUS_CREATING } from '~stores/category/person/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { getCurrentDate, isMatchDateDD_MM_YYY } from "@utils";
import { comboxProps } from "./";
import { HANDLE_POPUP } from '_/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const creatingPopupSelector = useSelector(state => state['person'].creatingPopup);
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
        <Title.Element text='Persnbr' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Persnbr'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Họ và tên' {...inputTitleProps} />
        <Input.Element
          placeholder='Họ và tên'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persFullname'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức danh' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['person', 'creatingPopup', 'persTitleSelected'],
            selectorKeys: ['root', 'titles'],
            reducerType: SELECT_TITLE_CREATING,
            reducerKeys: {
              text: 'titleName',
              value: 'titleCode',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số điện thoại' {...inputTitleProps} />
        <Input.Element
          placeholder='Số điện thoại'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persMobile'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={20}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='CMND/CCCD' {...inputTitleProps} />
        <Input.Element
          placeholder='CMND/CCCD'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persCmndCccd'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={20}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày cấp' {...inputTitleProps} />
        <Input.Element
          placeholder='dd-mm-yyy'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persCmndCccdYear'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Nơi cấp' {...inputTitleProps} />
        <Input.Element
          placeholder='Nơi cấp'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persCmndCccdPlace'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['person', 'creatingPopup', 'orgsSelected'],
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
        <Title.Element text='Email' {...inputTitleProps} />
        <Input.Element
          placeholder='Email'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'creatingPopup', 'persEmail'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['person', 'creatingPopup', 'persStatusSelected'],
            selectorKeys: ['root', 'persStatuses'],
            reducerType: SELECT_STATUS_CREATING,
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
                keys: ['person', 'create', 'isShown'],
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
  if (!popupSelector.persCode) {
    setErrorMsg('Persnbr không được để trống');
    return false;
  }
  if (!isMatchDateDD_MM_YYY(popupSelector.persCmndCccdYear)) {
    setErrorMsg('Ngày cấp CMND/CCCD sai định dạng');
    return false;
  }
  if (!popupSelector.orgsSelected.value){
    setErrorMsg('Phải chọn đơn vị quản lý');
    return false;
  }
  return true;
}

export default Element;
Element.displayName = 'CreatingPopup'
