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
import * as Combox from "~commons/combox";
import { getCurrentDate } from "@utils";
import { comboxProps } from "./";

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  const [errorMsg, setErrorMsg] = useState(false);
  const creatingPopupSelector = useSelector(state => state['atmCdm'].creatingPopup);
  const atmcdmStatusesSelector = useSelector(state => state['root'].atmcdmStatuses);

  const dispatch = useDispatch();

  const atmCdmStatusOptions = {
    $options: atmcdmStatusesSelector.map(item => {
      const children = { text: item.name, value: item.value };
      return {
        key: item.id,
        ...{ $children: children },
        onClick: handleOptionClick(dispatch, SELECT_ATMCDM_STATUS_CREATING, children)
      };
    }),
  }


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
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Ngày đăng ký'
          {...inputProps}
          defaultValue={getCurrentDate()}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mã ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='Mã ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmcdmCode'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ATM/CDM' {...inputTitleProps} />
        <Input.Element
          placeholder='Tên ATM/CDM'
          {...inputProps}
          store={{
            selectorKeys: ['atmCdm', 'creatingPopup', 'atmcdmName'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

<Block.Element {...inputWrapperProps}>
  <Title.Element text='Loại máy ATM/CDM' {...inputTitleProps} />
  <Input.Element
    placeholder='Loại máy ATM/CDM'
    {...inputProps}
    store={{
      selectorKeys: ['atmCdm', 'creatingPopup', 'atmcdmType'],
      reducerType: CHANGE_CREATING_INPUT,
    }}
    max={30}
  />
</Block.Element>

<Block.Element {...inputWrapperProps}>
  <Title.Element text='Địa chỉ ATM/CDM' {...inputTitleProps} />
  <Input.Element
    placeholder='Địa chỉ ATM/CDM'
    {...inputProps}
    store={{
      selectorKeys: ['atmCdm', 'creatingPopup', 'atmcdmAddress'],
      reducerType: CHANGE_CREATING_INPUT,
    }}
    max={200}
  />
</Block.Element>



<Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['atmCdm', 'creatingPopup', 'orgsCodeSelected'],
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
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['atmCdm', 'creatingPopup', 'atmCdmSelected'],
            selectorKeys: ['root', 'orgs'],
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
