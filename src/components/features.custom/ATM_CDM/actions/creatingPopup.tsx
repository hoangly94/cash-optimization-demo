import React, { useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_CREATING, SELECT_ATMCDM_STATUS_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, CHANGE_CREATING_INPUT } from '~stores/atmCdm/constants';
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
  const creatingPopupSelector = useSelector(state => state['atmCdm'].creatingPopup);
  const orgsListSelector = useSelector(state => state['atmCdm'].orgsList);
  const dispatch = useDispatch();
  // const [creatingPopupState, setCreatingPopupState] = useState({ ...creatingPopupSelector });
  const atmCdmCodeRef = useRef(null);
  const atmCdmNameRef = useRef(null);
  const atmCdmTypeRef = useRef(null);
  const atmAddressRef = useRef(null);

  const atmCdmCodeOnChange = handleInputChange(dispatch, 'atmCdmCode');
  const atmCdmNameOnChange = handleInputChange(dispatch, 'atmCdmName');
  const atmCdmTypeOnChange = handleInputChange(dispatch, 'atmCdmType');
  const atmAddress = handleInputChange(dispatch, 'atmAddress');
  const orgsCodeOptions = {
    // $options: orgsList.map(item => ({ ...item, key: item.$children.value, onClick: handleOptionClick(dispatch, SELECT_ORGS_CODE_CREATING, item.$children) })),
    $options: orgsListSelector.map(item => {
      const children = { text: item.orgsName, value: item.id };
      return {
        ...{ $children: children },
        onClick: handleOptionClick(dispatch, SELECT_ORGS_CODE_CREATING, children)
      };
    }),
  }
  
  const atmCdmStatusOptions = {
    $options: atmCdmStatusList.map(item => ({ ...item, key: item.$children.value, onClick: handleOptionClick(dispatch, SELECT_ATMCDM_STATUS_CREATING, item.$children) })),
  }

  const clearInput = () => {
    (atmCdmCodeRef as any).current.value = '';
    (atmCdmNameRef as any).current.value = '';
    (atmCdmTypeRef as any).current.value = '';
    (atmAddressRef as any).current.value = '';
  }
  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(creatingPopupSelector);
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
        <Title.Element text='Mã ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Mã ATM/CDM' refs={atmCdmCodeRef} {...inputProps} onChange={atmCdmCodeOnChange} valueType={Input.ValueType.NUMBER} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Tên ATM/CDM' refs={atmCdmNameRef} {...inputProps} onChange={atmCdmNameOnChange} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Loại máy ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Loại máy ATM/CDM' refs={atmCdmTypeRef} {...inputProps} onChange={atmCdmTypeOnChange} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Địa chỉ ATM/CDM' refs={atmAddressRef} {...inputProps} onChange={atmAddress} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Dropdown.Element {...dropdownProps} $selectorWrapper={{ defaultText: creatingPopupSelector.orgsCodeSelected.text }} $optionsWrapper={{ ...orgsCodeOptions }} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái ATM/CDM' {...inputTitleProps} />
        <Dropdown.Element {...dropdownProps} $selectorWrapper={{ defaultText: creatingPopupSelector.atmCdmSelected.text }} $optionsWrapper={{ ...atmCdmStatusOptions }} />
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

const handleInputChange = (dispatch, key) => debounce((e) => {
  dispatch({ type: CHANGE_CREATING_INPUT, data: { [key]: e.target.value } });
}, 300)

const validateForm = (creatingPopupSelector) => {
  console.log(creatingPopupSelector);
  if (!creatingPopupSelector.atmCdmCode)
    return false;
  if (!creatingPopupSelector.atmCdmName)
    return false;
  if (!creatingPopupSelector.atmCdmType)
    return false;
  if (!creatingPopupSelector.atmAddress)
    return false;
  if (!creatingPopupSelector.orgsCodeSelected.value)
    return false;
  if (!creatingPopupSelector.atmCdmSelected.value)
    return false;
  return true;
}

const orgsList = [
  {
    $children: {
      text: 'ORGS Code 4',
      value: '1',
    },

  },
];

const atmCdmStatusList = [
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
