import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/category/function/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import { _Date, getCurrentDate } from "@utils";
import { HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState(false);
  const creatingPopupSelector = useSelector(state => state['function'].creatingPopup);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(creatingPopupSelector);
    if (isValidForm) {
      setErrorMsg(false)
      dispatch({ type: REQUEST_CREATING })
      if (setIsShown)
        setIsShown(false)
    }
    if (!isValidForm)
      setErrorMsg(true)
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
        <Title.Element text='Mã chức năng' {...inputTitleProps} />
        <Input.Element
          placeholder='Mã chức năng'
          {...inputProps}
          store={{
            selectorKeys: ['function', 'creatingPopup', 'functionCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={4}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức năng' {...inputTitleProps} />
        <Input.Element
          placeholder='Chức năng'
          {...inputProps}
          store={{
            selectorKeys: ['function', 'creatingPopup', 'functionName'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={15}
        />
      </Block.Element>

      <Block.Element {...actionsWrapperProps}>
        <Block.Element >
          <Title.Element text="Vui lòng điền đủ thông tin." color={Base.Color.RED} style={{ ...errorMsgDisplay }} />
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element {...submitButtonProps} />
          <Button.Element {...cancelButtonProps} />
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['function', 'create', 'isShown'],
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


const validateForm = (creatingPopupSelector) => {
  // if (!creatingPopupSelector.functionCode)
  //   return false;
  return true;
}

export default Element;
Element.displayName = 'CreatingPopup'
