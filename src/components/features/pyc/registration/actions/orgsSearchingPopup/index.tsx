import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_COMBOX, HANDLE_SPECIAL_ADD, CHANGE_EDITING_INPUT, REQUEST_EDITING, HANDLE_CONTINUE_ACTION, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_ORGSSEARCHING_CONTINUE, REQUEST_ORGSSEARCHING_CANCEL} from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_ATMCDMS, FETCH_NHNNTCTDS } from '~stores/dashboardRoot/constants';
import { useConfirmationDialog } from '_/hooks';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  useEffect(() => {
    dispatch({ type: FETCH_ATMCDMS });
    dispatch({ type: FETCH_NHNNTCTDS });
  }, []);
  // useEffect(() => {
  //   dispatch({ type: FETCH_ORGSSEARCHING_DATA })
  // });

  const selector = useSelector(state => state['pycRegistration'].orgsSearchingPopup);
  const dispatch = useDispatch();
  const [confirmationDialog, setConfirmationDialog] = useConfirmationDialog({});
  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      
      setConfirmationDialog({
        title: 'Bạn muốn lưu thông tin đăng ký vào hệ thống?',
        description: 'Nhấn YES để lưu thông tin, nhấn NO để quay lại',
        onConfirmClick: () => {
          dispatch({ type: HANDLE_ORGSSEARCHING_UPDATE });
          dispatch({
            type: HANDLE_POPUP,
            keys: ['pycRegistration', 'orgsSearching', 'isShown'],
            value: false,
          });
        },
        onDismissClick: () => {
          dispatch({
            type: HANDLE_POPUP,
            keys: ['routeManagement', 'orgsSearching', 'isShown'],
            value: false,
          })
        },
        isShown: true,
      });
      if (setIsShown)
        setIsShown(false)
    }
  }

  const handleContinueButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      setConfirmationDialog({
        title: 'Bạn muốn lưu thông tin đăng ký và chuyển trạng thái PYC sang trạng thái= Chờ CPD ĐVYCĐQ phê duyệt?',
        description: 'Nhấn YES để lưu thông tin, nhấn NO để quay lại',
        onConfirmClick: () => {
          dispatch({ type: HANDLE_ORGSSEARCHING_CONTINUE });
          dispatch({
            type: HANDLE_POPUP,
            keys: ['pycRegistration', 'orgsSearching', 'isShown'],
            value: false,
          });
        },
        onDismissClick: () => {
          dispatch({
            type: HANDLE_POPUP,
            keys: ['routeManagement', 'orgsSearching', 'isShown'],
            value: false,
          })
        },
        isShown: true,
      });
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
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }


  return (
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_ORGSSEARCHING_CANCEL })}
      extractHtml={confirmationDialog}
    >
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
          defaultValue='Searching'
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
          text='ĐVĐQ'
          store={{
            textSelectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'orgsDestName'],
            action: {
              type: HANDLE_POPUP,
              keys: ['pycRegistration', 'pycSearchOrgs2', 'isShown'],
              value: true,
            }
          }}
          style={{
            color: '#828282',
          }}
          onClick={() => dispatch({
            type: HANDLE_POPUP,
            keys: ['pycRegistration', 'orgsSearching', 'isShown'],
            value: false,
          })}
          isDisabled={!(selector.objectType.text === 'KPP')}
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
          isDisabled={!(selector.objectType.text === 'ATM')}
          isInputDisabled={!(selector.objectType.text === 'ATM')}
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
          isDisabled={!(selector.objectType.text === 'TCTD/NHNN')}
          isInputDisabled={!(selector.objectType.text === 'TCTD/NHNN')}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khoảng cách ĐVĐQ với ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['pycRegistration', 'distanceOrgsToOrgsRequest'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element
            {...submitButtonProps}
            flexGrow={Base.FlexGrow.G1}
            onClick={handleSubmitButtonClick}
          />
          <Button.Element
            {...submitButtonProps}
            text='Continue'
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
            onClick={()=> dispatch({ type: REQUEST_ORGSSEARCHING_CANCEL })}
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


const validateForm = (dispatch, selector) => {
  if (selector.objectType.text === 'KPP' && !selector.orgsDestCode) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Tên ĐVĐQ' } });
    return false;
  }
  if (selector.objectType.text === 'ATM' && !selector.atmCdm.value) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Tên ATM' } });
    return false;
  }
  if (selector.objectType.text === 'TCTD/NHNN' && !selector.nhnnTctd.value) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa chọn Tên NH đối tác KPP mở TK' } });
    return false;
  }
  return true;
}


export default Element;
Element.displayName = 'OrgsSearchingPopup'
