import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_EDITING, REQUEST_EDITING_CANCEL, CHANGE_EDITING_INPUT, SELECT_REGION_EDITING } from '~stores/category/area/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { _Date, getCurrentDate } from "@utils";
import { HANDLE_POPUP } from '~/stores/_base/constants';
import { comboxProps } from '.';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const selectedItemSelector = useSelector(state => state['area'].selectedItem);

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
        <Title.Element text='Ng??y ????ng k??' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Ng??y ????ng k??'
          {...inputProps}
          defaultValue={getCurrentDate()}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='M?? c???m' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='M?? c???m'
          {...inputProps}
          store={{
            selectorKeys: ['area', 'selectedItem', 'areaCode'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          isDisabled={true}
          max={4}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n c???m' {...inputTitleProps} />
        <Input.Element
          placeholder='T??n c???m'
          {...inputProps}
          store={{
            selectorKeys: ['area', 'selectedItem', 'areaName'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n v??ng' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['area', 'selectedItem', 'regionSelected'],
            selectorKeys: ['root', 'regions'],
            reducerType: SELECT_REGION_EDITING,
            reducerKeys: {
              text: 'regionName',
              value: 'id',
            },
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
                keys: ['area', 'edit', 'isShown'],
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
  // if (!popupSelector.areaCode) {
  //   setErrorMsg('M?? c???m kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.regionSelected.value){
  //   setErrorMsg('Ph???i ch???n V??ng');
  //   return false;
  // }
  return true;
}

export default Element;
Element.displayName = 'EditingPopup'
