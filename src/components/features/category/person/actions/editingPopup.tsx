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
        <Title.Element text='M?? nh??n vi??n' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder='M?? nh??n vi??n'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persCode'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='H??? v?? t??n' {...inputTitleProps} />
        <Input.Element
          placeholder='H??? v?? t??n'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persFullname'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={50}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ch???c danh' {...inputTitleProps} />
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
        <Title.Element text='S??? ??i???n tho???i' {...inputTitleProps} />
        <Input.Element
          placeholder='S??? ??i???n tho???i'
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
        <Title.Element text='Ng??y c???p' {...inputTitleProps} />
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
        <Title.Element text='N??i c???p' {...inputTitleProps} />
        <Input.Element
          placeholder='N??i c???p'
          {...inputProps}
          store={{
            selectorKeys: ['person', 'selectedItem', 'persCmndCccdPlace'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
          max={30}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n DVQL' {...inputTitleProps} />
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
        <Title.Element text='Tr???ng th??i' {...inputTitleProps} />
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
  //   setErrorMsg('Persnbr kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.persFullname) {
  //   setErrorMsg('H??? v?? t??n kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.persTitleSelected.value) {
  //   setErrorMsg('Ch???c danh kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.persMobile) {
  //   setErrorMsg('S??? ??i???n tho???i kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.persCmndCccd) {
  //   setErrorMsg('CMND/CCCD kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  if (!popupSelector.persCmndCccdYear) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'B???n ph???i nh???p ng??y c???p' } });

    return false;
  }
  if (!moment(popupSelector.persCmndCccdYear, 'DD/MM/YYYY', true).isValid()) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Vui l??ng nh???p ng??y c???p theo c???u tr??c DD/MM/YYYY' } });
    return false;
  }
  // if (!popupSelector.persCmndCccdPlace){
  //   setErrorMsg('N??i c???p kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.orgsSelected.value) {
  //   setErrorMsg('T??n DVQL kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.persEmail) {
  //   setErrorMsg('Email kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  // if (!popupSelector.persStatusSelected.value) {
  //   setErrorMsg('Tr???ng th??i kh??ng ???????c ????? tr???ng');
  //   return false;
  // }
  return true;
}

export default Element;
Element.displayName = 'EditingPopup'
