import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_COMBOX, HANDLE_SPECIAL_ADD, CHANGE_EDITING_INPUT, REQUEST_EDITING, HANDLE_CONTINUE_ACTION, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_ORGSSEARCHING_CONTINUE, } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_ATMCDMS, FETCH_NHNNTCTDS } from '~stores/dashboardRoot/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  useEffect(() => {
    dispatch({ type: FETCH_ATMCDMS });
    dispatch({ type: FETCH_NHNNTCTDS });
  }, []);

  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');
  const selector = useSelector(state => state['pycRegistration'].orgsSearchingPopup);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(selector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: HANDLE_ORGSSEARCHING_UPDATE });
      if (setIsShown)
        setIsShown(false)
    }
  }
  const handleContinueButtonClick = () => {
    const isValidForm = validateForm(selector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: HANDLE_ORGSSEARCHING_UPDATE });
      dispatch({ type: HANDLE_ORGSSEARCHING_CONTINUE });
      if (setIsShown)
        setIsShown(false)
    }
  }

  const submitButtonProps: Button.Props = {
    text: 'Update',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handleSubmitButtonClick,
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
        <Title.Element text='Số PYC HT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          store={{
            selectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'id'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'cashOptimizationStatus'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Đối tượng điều quỹ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'objectType', 'value'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVĐQ' {...inputTitleProps} />

        <Button.Element
          width={Base.Width.PER_70}
          border={Base.Border.SOLID}
          textAlign={Base.TextAlign.LEFT}
          text='ĐVUQ'
          store={{
            textSelectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'orgsName'],
            action: {
              type: HANDLE_POPUP,
              keys: ['pycRegistration', 'pycSearchOrgs2', 'isShown'],
              value: true,
            }
          }}
          style={{
            color: '#828282',
          }}
          onClick={()=> dispatch({
            type: HANDLE_POPUP,
            keys: ['pycRegistration', 'orgsSearching', 'isShown'],
            value: false,
          })}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element
          text='Tên ATM'
          {...inputTitleProps}
          width={Base.Width.PER_30}
        />
        <Combox.Element
          width={Base.Width.PX_400}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'atmCdm'],
            selectorKeys: ['root', 'atmCdms'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'atmCdmName',
              value: 'atmCdmCode',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element
          text='Tên NH đối tác KPP mở TK'
          {...inputTitleProps}
          width={Base.Width.PER_30}
        />
        <Combox.Element
          width={Base.Width.PX_400}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'nhnnTctd'],
            selectorKeys: ['root', 'nhnnTctds'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'nnhnTctdName',
              value: 'nnhnTctdCode',
            },
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khoảng cách ĐVĐQ với ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          // store={{
          //   selectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'objectType', 'value'],
          //   reducerType: '',
          // }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
          <Title.Element text={errorMsg} color={Base.Color.RED} />
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element
            {...submitButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'orgsSearching', 'isShown'],
                value: false,
              }
            }}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...submitButtonProps}
            text='Continue'
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'orgsSearching', 'isShown'],
                value: false,
              }
            }}
            onClick={handleContinueButtonClick}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'orgsSearching', 'isShown'],
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

const validateForm = (selector, setErrorMsg) => {
  if (selector.objectType === 'ATM' && !selector.atmCdm.value) {
    setErrorMsg('Chưa chọn Tên ATM');
    return false;
  }
  if (selector.objectType === 'Tên NH đối tác KPP mở TK' && !selector.nhnnTctd.value) {
    setErrorMsg('Chưa chọn Tên ATM');
    return false;
  }

  return true;
}



const validateSpecialForm = (selector, setErrorMsg) => {
  if (!selector.type.value) {
    setErrorMsg('');
    return false;
  }
  if (!selector.currencyType.value) {
    setErrorMsg('');
    return false;
  }
  if (!selector.goldType.value) {
    setErrorMsg('');
    return false;
  }
  if (!selector.quanlity || selector.quanlity == '0') {
    setErrorMsg('');
    return false;
  }
  if (!selector.attribute.value) {
    setErrorMsg('');
    return false;
  }
  return true;
}


export default Element;
Element.displayName = 'OrgsSearchingPopup'