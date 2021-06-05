import React, { useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_AREA_CREATING, SELECT_ORGS_PARENT_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/orgs/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Dropdown from "~commons/dropdown";
import { getCurrentDate } from "@utils";
import { buttonProps, handlePopupClick, popupProps } from ".";

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  console.log('================creating Popup');
  const [errorMsg, setErrorMsg] = useState(false);
  const popupSelector = useSelector(state => state['orgs'].creatingPopup);
  const dispatch = useDispatch();
  const [popupState, setPopupState] = useState({ ...popupSelector });
  const orgsCodeRef = useRef(null);
  const orgsNameRef = useRef(null);
  const orgsAddressRef = useRef(null);
  const dvqlKcRef = useRef(null);

  const orgsCodeOnChange = handleInputChange(dispatch, 'orgsCode');
  const orgsNameOnChange = handleInputChange(dispatch, 'orgsName');
  const orgsAddressOnChange = handleInputChange(dispatch, 'orgsAddress');
  const dvqlKcOnChange = handleInputChange(dispatch, 'dvqlKc');

  const areaOptions = {
    $options: areaList.map(item => ({ ...item, key: item.$children.value, onClick: handleOptionClick(dispatch, SELECT_AREA_CREATING, item.$children) })),
  }
  const orgsParentOptions = {
    $options: orgsParentList.map(item => ({ ...item, key: item.$children.value, onClick: handleOptionClick(dispatch, SELECT_ORGS_PARENT_CREATING, item.$children) })),
  }

  const clearInput = () => {
    (orgsCodeRef as any).current.value = '';
    (orgsNameRef as any).current.value = '';
    (orgsAddressRef as any).current.value = '';
    (dvqlKcRef as any).current.value = '';
  }
  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(popupSelector);
    if (isValidForm) {
      setErrorMsg(false)
      dispatch({ type: REQUEST_CREATING })
      if (setIsShown)
        setIsShown(false)
      clearInput()
    }
    if (!isValidForm)
      setErrorMsg(true)
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
    clearInput();
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
        <Input.Element placeholder='Ngày đăng ký' value={getCurrentDate()} isDisabled={true} {...inputProps} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mã ĐV' {...inputTitleProps} />
        <Input.Element placeholder='Mã ĐV' refs={orgsCodeRef} {...inputProps} onChange={orgsCodeOnChange}  valueType={Input.ValueType.NUMBER}/>
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐV' {...inputTitleProps} />
        <Input.Element placeholder='Tên ĐV' refs={orgsNameRef} {...inputProps} onChange={orgsNameOnChange} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ ĐV' {...inputTitleProps} />
        <Input.Element placeholder='Địa chỉ ĐV' refs={orgsAddressRef} {...inputProps} onChange={orgsAddressOnChange} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên cụm' {...inputTitleProps} />
        <Dropdown.Element {...dropdownProps} $selectorWrapper={{ defaultText: popupSelector.areaSelected.text }} $optionsWrapper={{ ...areaOptions }} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Dropdown.Element {...dropdownProps} $selectorWrapper={{ defaultText: popupSelector.orgsParentSelected.text }} $optionsWrapper={{ ...orgsParentOptions }} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khoảng cách đến ĐVQL' {...inputTitleProps} />
        <Input.Element placeholder='Khoảng cách đến ĐVQL' refs={dvqlKcRef} {...inputProps} onChange={dvqlKcOnChange}  valueType={Input.ValueType.NUMBER}/>
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

const handleOptionClick = (dispatch, type, data) => () => {
  dispatch({ type: type, data: data })
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

const dropdownProps: Dropdown.Props = {
  width: Base.Width.PER_70,
}

const handleInputChange = (dispatch, key) => (e) => {
  dispatch({ type: CHANGE_CREATING_INPUT, data: { [key]: e.target.value } });
}


const validateForm = (creatingPopupSelector) => {
  console.log(creatingPopupSelector);
  if (!creatingPopupSelector.orgsCode)
    return false;
  if (!creatingPopupSelector.orgsName)
    return false;
  if (!creatingPopupSelector.orgsAddress)
    return false;
  if (!creatingPopupSelector.areaSelected.value)
    return false;
  if (!creatingPopupSelector.orgsParentSelected.value)
    return false;
  return true;
}

const areaList = [
  {
    $children: {
      text: 'Area 1',
      value: '1',
    },
  },
  {
    $children: {
      text: 'Area 2',
      value: '2',
    },
  },
  {
    $children: {
      text: 'Area 3',
      value: '3',
    },
  },
];

const orgsParentList = [
  {
    $children: {
      text: '1',
      value: '1',
    },
  },
  {
    $children: {
      text: '2',
      value: '2',
    },
  },
  {
    $children: {
      text: '3',
      value: '3',
    },
  },
];

export default Element;
Element.displayName = 'Actions_Button'
