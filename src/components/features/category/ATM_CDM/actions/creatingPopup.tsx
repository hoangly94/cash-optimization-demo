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
import { _Date, getCurrentDate } from "@utils";
import { comboxProps } from "./";
import { HANDLE_POPUP } from '~/stores/_base/constants';

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
        <Title.Element text='M?? ATM/CDM' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='M?? ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='T??n ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmName'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Lo???i m??y ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='Lo???i m??y ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmType'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='?????a ch??? ATM/CDM' {...inputTitleProps} />
        <Block.Element
          width={Base.Width.PER_70}
          flex={Base.Flex.BETWEEN}
        >
          <Input.Element
            placeholder='?????a ch??? ATM/CDM'
            width={Base.Width.PER_80}
            store={{
              selectorKeys: ['atmCdm', 'creatingPopup', 'atmAddress'],
              reducerType: CHANGE_CREATING_INPUT,
            }}
            max={200}
          />
          <Button.Element
            width={Base.Width.PX_200}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            color={Base.Color.WHITE}
            border={Base.Border.SOLID}
            textAlign={Base.TextAlign.CENTER}
            text='Map'
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['atmCdm', 'mapPopup', 'isShown'],
                value: true,
              }
            }}
          />
        </Block.Element>
      </Block.Element>



      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n DVQL' {...inputTitleProps} />
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
        <Title.Element text='Tr???ng th??i ATM/CDM' {...inputTitleProps} />
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
  // if (!popupSelector.atmCdmCode) {
  //   setErrorMsg('M?? ATM/CDM kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.orgsSelected.value){
  //   setErrorMsg('Ph???i ch???n DVQL');
  //   return false;
  // }
  return true;
}

export default Element;
Element.displayName = 'CreatingPopup'
