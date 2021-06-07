import React, { useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_EDITING, SELECT_ATMCDM_STATUS_EDITING, REQUEST_EDITING, REQUEST_EDITING_CANCEL, CHANGE_EDITING_INPUT } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Dropdown from "~commons/dropdown";
import { getCurrentDate } from "@utils";

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  const [errorMsg, setErrorMsg] = useState(false);
  const selectedItemSelector = useSelector(state => state['atmCdm'].selectedItem);
  const atmcdmStatusesSelector = useSelector(state => state['root'].atmcdmStatuses);
  // const orgsListSelector = useSelector(state => state['atmCdm'].orgsList);
  // const popupSelector = useSelector(state => state['atmCdm'].editingPopup);
  const dispatch = useDispatch();
  const atmCdmCodeRef = useRef(null);
  const atmCdmNameRef = useRef(null);
  const atmCdmTypeRef = useRef(null);
  const atmAddressRef = useRef(null);

  const atmCdmCodeOnChange = handleInputChange(dispatch, 'atmCdmCode');
  const atmCdmNameOnChange = handleInputChange(dispatch, 'atmCdmName');
  const atmCdmTypeOnChange = handleInputChange(dispatch, 'atmCdmType');
  const atmAddress = handleInputChange(dispatch, 'atmAddress');

  const atmCdmStatusOptions = {
    $options: atmcdmStatusesSelector.map(item => {
      const children = { text: item.name, value: item.value };
      return {
        key: item.id,
        ...{ $children: children },
        onClick: handleOptionClick(dispatch, SELECT_ATMCDM_STATUS_EDITING, children)
      };
    }),
  }


  if(selectedItemSelector.atmCdmCode){
    (atmCdmCodeRef as any).current.value = selectedItemSelector.atmCdmCode;
    (atmCdmNameRef as any).current.value = selectedItemSelector.atmCdmName;
    (atmCdmTypeRef as any).current.value = selectedItemSelector.atmCdmType;
    (atmAddressRef as any).current.value = selectedItemSelector.atmAddress;
  }

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(selectedItemSelector);
    if (isValidForm) {
      setErrorMsg(false)
      dispatch({ type: REQUEST_EDITING })
      if (setIsShown)
        setIsShown(false)
    }
    if (!isValidForm)
      setErrorMsg(true)
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
        <Input.Element placeholder='Ngày đăng ký' isDisabled={true} {...inputProps} />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mã ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Mã ATM/CDM' refs={atmCdmCodeRef} {...inputProps} onChange={atmCdmCodeOnChange} isDisabled={true}/>
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Tên ATM/CDM' refs={atmCdmNameRef} {...inputProps} onChange={atmCdmNameOnChange} max={50}/>
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Loại máy ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Loại máy ATM/CDM' refs={atmCdmTypeRef} {...inputProps} onChange={atmCdmTypeOnChange} max={30}/>
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa chỉ ATM/CDM' {...inputTitleProps} />
        <Input.Element placeholder='Địa chỉ ATM/CDM' refs={atmAddressRef} {...inputProps} onChange={atmAddress} max={200}/>
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Dropdown.Element {...dropdownProps} $selectorWrapper={{ defaultText: selectedItemSelector.orgsCodeSelected?.text }} isDisabled={true}/>
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái ATM/CDM' {...inputTitleProps} />
        <Dropdown.Element {...dropdownProps} $selectorWrapper={{ defaultText: selectedItemSelector.atmCdmSelected?.text }} $optionsWrapper={{ ...atmCdmStatusOptions }} />
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
  dispatch({ type: CHANGE_EDITING_INPUT, data: { [key]: e.target.value } });
}, 300)

const validateForm = (popupSelector) => {
  if (!popupSelector.atmCdmCode)
    return false;
  if (!popupSelector.atmCdmName)
    return false;
  if (!popupSelector.atmCdmType)
    return false;
  if (!popupSelector.atmAddress)
    return false;
  if (!popupSelector.orgsCodeSelected.value)
    return false;
  if (!popupSelector.atmCdmSelected.value)
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
