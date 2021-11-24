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
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { REQUEST_QUERY as REQUEST_QUERY_ORGS, RESET_SEARCHORGS_FILTER } from '~stores/authority/searchOrgs/constants';
import { thousandSeparator } from '@utils';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const selectedItemSelector = useSelector(state => state['orgs'].selectedItem);

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(selectedItemSelector, dispatch);
    if (isValidForm) {
      dispatch({ type: REQUEST_EDITING });
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
          max={4}
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
        <Block.Element
          width={Base.Width.PER_70}
          flex={Base.Flex.BETWEEN}
        >
          <Input.Element
            placeholder='Địa chỉ ĐV'
            width={Base.Width.PER_80}
            store={{
              selectorKeys: ['orgs', 'selectedItem', 'orgsAddress'],
              reducerType: CHANGE_EDITING_INPUT,
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
                keys: ['orgs', 'mapPopup', 'isShown'],
                value: true,
              }
            }}
          />
        </Block.Element>
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
        /> */}
        <Block.Element
          width={Base.Width.PER_70}
          flex={Base.Flex.BETWEEN}
        >
          <Input.Element
            width={Base.Width.PER_80}
            defaultValue={selectedItemSelector?.orgsParentSelected?.text}
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
            selectorKeys: ['orgs', 'selectedItem', 'dvqlKc'],
            reducerType: CHANGE_EDITING_INPUT,
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


const validateForm = (selector, dispatch) => {
  const dvqlKc = selector.dvqlKc?.toString().replaceAll(',', '');
  if (selector.dvqlKc && !(!isNaN(parseFloat(dvqlKc)) && isFinite(dvqlKc))) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Sai format Khoảng cách đến ĐVQL' } });
    return false;
  }
  return true;
}
export default Element;
Element.displayName = 'Actions_Button'
