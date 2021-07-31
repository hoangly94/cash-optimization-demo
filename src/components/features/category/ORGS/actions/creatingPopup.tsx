import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_AREA_CREATING, SELECT_ORGS_PARENT_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/category/orgs/constants';
import { REQUEST_QUERY as REQUEST_QUERY_ORGS, RESET_SEARCHORGS_FILTER } from '~stores/authority/searchOrgs/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { _Date, getCurrentDate, thousandSeparator } from "@utils";
import { comboxProps } from "./";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const creatingPopupSelector = useSelector(state => state['orgs'].creatingPopup);
  // const orgsFilterSelector = useSelector(state => state['registration'].filters.orgs);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(creatingPopupSelector, dispatch);
    if (isValidForm) {
      dispatch({ type: REQUEST_CREATING });
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
          max={4}
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
          max={60}
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
              value: 'areaCode',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVQL' {...inputTitleProps} />
        {/* <Combox.Element
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
        /> */}
        <Block.Element
          width={Base.Width.PER_70}
          flex={Base.Flex.BETWEEN}
        >
          <Input.Element
            width={Base.Width.PER_80}
            store={{
              selectorKeys: ['orgs', 'creatingPopup', 'orgsParentSelected', 'text'],
              reducerType: '',
            }}
            isDisabled={true}
          />
          <Button.Element
            width={Base.Width.PX_200}
            backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
            color={Base.Color.WHITE}
            border={Base.Border.SOLID}
            textAlign={Base.TextAlign.CENTER}
            text='Search'
            store={{
              textSelectorKeys: ['registration', 'filters', 'orgs', 'text'],
              action: {
                type: HANDLE_POPUP,
                keys: ['orgs', 'searchOrgs', 'isShown'],
                value: true,
              }
            }}
            onClick={() => {
              dispatch({ type: RESET_SEARCHORGS_FILTER });
              dispatch({ type: REQUEST_QUERY_ORGS });
              dispatch({ type: HANDLE_BUTTON, keys: ['searchOrgs', 'select', 'isDisabled'], value: true });
            }}
          />
        </Block.Element>
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khoảng cách đến ĐVQL' {...inputTitleProps} />
        <Input.Element
          placeholder='Khoảng cách đến ĐVQL'
          {...inputProps}
          store={{
            selectorKeys: ['orgs', 'creatingPopup', 'dvqlKc'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          keyPressPattern='^[0-9\.]$'
          valueMapper={thousandSeparator}
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


const validateForm = (selector, dispatch) => {
  const dvqlKc = selector.dvqlKc?.toString().replaceAll(',', '');
  // if (selector.dvqlKc) {
  //   dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa nhập Khoảng cách đến ĐVQL' } });
  //   return false;
  // }

  if (selector.dvqlKc && !(!isNaN(parseFloat(dvqlKc)) && isFinite(dvqlKc))) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Sai format Khoảng cách đến ĐVQL' } });
    return false;
  }
  return true;
}


export default Element;
Element.displayName = 'Actions_Button'
