import React, { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ORGS_CODE_EDITING, REQUEST_EDITING, REQUEST_EDITING_CANCEL, CHANGE_EDITING_INPUT, SELECT_TITLE_EDITING, SELECT_STATUS_EDITING } from '~stores/category/person/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Datepicker from "~commons/datepicker";
import { comboxProps } from ".";
import { getCurrentDate, isMatchDateDD_MM_YYYY } from "@utils";
import { ADD_NOTI, HANDLE_POPUP } from '~/stores/_base/constants';
import moment from 'moment';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const selectedItemSelector = useSelector(state => state['person'].selectedItem);

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(selectedItemSelector, dispatch);
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
    // onClick: () => dispatch({ type: REQUEST_CREATING_CANCEL }),
    onClick: handleCancelButtonClick,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }
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
        <Title.Element text='Mã nhân viên' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='Mã nhân viên'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persCode'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Họ và tên' {...inputTitleProps} />
        <Input.Element
          placeholder='Họ và tên'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persFullname'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức danh' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['person', 'selectedItem', 'persTitleSelected'],
            selectorKeys: ['root', 'titles'],
            reducerType: SELECT_TITLE_EDITING,
            reducerKeys: {
              text: 'titleName',
              value: 'titleCode',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số điện thoại' {...inputTitleProps} />
        <Input.Element
          placeholder='Số điện thoại'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persMobile'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={32}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='CMND/CCCD' {...inputTitleProps} />
        <Input.Element
          placeholder='CMND/CCCD'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persCmndCccd'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={20}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày cấp' {...inputTitleProps} />
        <Datepicker.Element
          flexGrow={Base.FlexGrow.G1}
          $input={{
            placeholder: 'dd/mm/yyyy',
            width: Base.Width.FULL,
            store: {
              selectorKeys: ['person', 'selectedItem', 'persCmndCccdYear'],
              reducerType: CHANGE_EDITING_INPUT,
            },
            max: 10,
          }}
          $datepicker={{
            store: {
              selectorKeys: ['person', 'selectedItem', 'persCmndCccdYear'],
              action: { type: CHANGE_EDITING_INPUT },
            },
          }}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Nơi cấp' {...inputTitleProps} />
        <Input.Element
          placeholder='Nơi cấp'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persCmndCccdPlace'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên DVQL' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['person', 'selectedItem', 'orgsSelected'],
            selectorKeys: ['root', 'orgs'],
            reducerType: SELECT_ORGS_CODE_EDITING,
            reducerKeys: {
              text: 'orgsName',
              value: 'id',
            },
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Email' {...inputTitleProps} />
        <Input.Element
          placeholder='Email'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persEmail'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái' {...inputTitleProps} />
        <Combox.Element
          {...comboxProps}
          store={{
            defaultSelectorKeys: ['person', 'selectedItem', 'persStatusSelected'],
            selectorKeys: ['root', 'persStatuses'],
            reducerType: SELECT_STATUS_EDITING,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>

      <Block.Element {...actionsWrapperProps}>
        <Block.Element >
          <Title.Element text={errorMsg} color={Base.Color.RED}  />
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element {...submitButtonProps} />
          <Button.Element {...cancelButtonProps} />
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['person', 'edit', 'isShown'],
                value: false,
              }
            }}
          />
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

const validateForm = (popupSelector, dispatch) => {
  // if (!popupSelector.persCode) {
  //   setErrorMsg('Persnbr không được để trống');
  //   return false;
  // }
  // if (!popupSelector.persFullname) {
  //   setErrorMsg('Họ và tên không được để trống');
  //   return false;
  // }
  // if (!popupSelector.persTitleSelected.value) {
  //   setErrorMsg('Chức danh không được để trống');
  //   return false;
  // }
  // if (!popupSelector.persMobile) {
  //   setErrorMsg('Số điện thoại không được để trống');
  //   return false;
  // }
  // if (!popupSelector.persCmndCccd) {
  //   setErrorMsg('CMND/CCCD không được để trống');
  //   return false;
  // }
  if (!popupSelector.persCmndCccdYear) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Bạn phải nhập ngày cấp' } });

    return false;
  }
  if (!moment(popupSelector.persCmndCccdYear, 'DD/MM/YYYY', true).isValid()) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Vui lòng nhập ngày cấp theo cấu trúc DD/MM/YYYY' } });
    return false;
  }
  // if (!popupSelector.persCmndCccdPlace){
  //   setErrorMsg('Nơi cấp không được để trống');
  //   return false;
  // }
  // if (!popupSelector.orgsSelected.value) {
  //   setErrorMsg('Tên DVQL không được để trống');
  //   return false;
  // }
  // if (!popupSelector.persEmail) {
  //   setErrorMsg('Email không được để trống');
  //   return false;
  // }
  // if (!popupSelector.persStatusSelected.value) {
  //   setErrorMsg('Trạng thái không được để trống');
  //   return false;
  // }
  return true;
}

export default Element;
Element.displayName = 'EditingPopup'
