import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_COMBOX, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, REQUEST_CREATING, REQUEST_QUERY, SEARCH_PERS, SELECT_AUTHORITY_CONTENT_ROW, SET_POPUP_TYPE, CHANGE_CREATING_INPUT, HANDLE_SPECIAL_DELETE, HANDLE_SPECIAL_ADD, } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Datepicker from "~commons/datepicker";
import * as DualTable from "~commons/dualTable";
import { getCurrentDate, isMatchDateDD_MM_YYY } from "@utils";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import * as SearchDataTable from './searchDataTable';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const selector = useSelector(state => state['pycRegistration'].creatingPopup);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      dispatch({ type: REQUEST_CREATING });
      if (setIsShown)
        setIsShown(false)
    }
  }

  const handleSpecialAddButtonClick = () => {
    const isValidForm = validateSpecialForm(dispatch, selector);
    if (isValidForm) {
      dispatch({ type: HANDLE_SPECIAL_ADD });
    }
  }

  const submitButtonProps: Button.Props = {
    text: 'Create',
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


  return (
    <Popup.Element {...props}>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số PYC HT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
        // store={{
        //   selectorKeys: ['pycRegistration', 'creatingPopup', 'id'],
        //   reducerType: '',
        // }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số PYC ĐV' {...inputTitleProps} />
        <Input.Element
          placeholder='Số PYC ĐV'
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          store={{
            selectorKeys: ['pycRegistration', 'creatingPopup', 'orgsRequestId'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          store={{
            selectorKeys: ['auth', 'user', 'orgsName'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên Thủ Quỹ ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          store={{
            selectorKeys: ['auth', 'user', 'fullname'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='SĐT di động của Thủ Quỹ ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          placeholder='SĐT di động của Thủ Quỹ ĐVYCĐQ'
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          store={{
            selectorKeys: ['auth', 'user', 'phone'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element
          text='Đối tượng điều quỹ'
          {...inputTitleProps}
          width={Base.Width.PER_30}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'objectType'],
            selectorKeys: ['pycRegistration', 'objectTypes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>

      <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin chi tiết HĐB'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />

      <Block.Element {...inputWrapperProps} flex={Base.Flex.BETWEEN}>
        <Combox.Element
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'type'],
            selectorKeys: ['pycRegistration', 'pycTypes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'currencyType'],
            selectorKeys: ['root', 'currencies'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'currencyType',
              value: 'currencyType',
            },
          }}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'goldType'],
            selectorKeys: ['root', 'goldTypes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
          isDisabled={selector.isDisabledGoldTypes}
        />
        <Input.Element
          placeholder='Số lượng HĐB'
          margin={Base.MarginRight.PX_18}
          valueType={Input.ValueType.NUMBER}
          width={Base.Width.PX_300}
          store={{
            selectorKeys: ['pycRegistration', 'creatingPopup', 'quanlity'],
            reducerType: CHANGE_CREATING_INPUT,
          }}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'attribute'],
            selectorKeys: ['root', 'pycAttributes'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element
          flex={Base.Flex.BETWEEN}
        >
          <Button.Element
            text='Add'
            margin={Base.MarginRight.PX_8}
            width={Base.Width.PX_200}
            border={Base.Border.NONE}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            onClick={handleSpecialAddButtonClick}
          />
          <Button.Element
            text='Delete'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            backgroundColor={Base.BackgroundColor.RED}
            store={{
              isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'specialDeleteCreating'],
              action: { type: HANDLE_SPECIAL_DELETE }
            }}
            onClick={() => dispatch({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'specialDeleteCreating', 'isDisabled'], value: true })}
          />
        </Block.Element>
      </Block.Element>
      <SearchDataTable.Element/>

      <Block.Element
        style={{
          borderTop: '1px solid #e8e8e8',
        }} 
        padding={Base.PaddingV.PX_18}
      />
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element
          text='Mức độ ưu tiên'
          {...inputTitleProps}
          width={Base.Width.PER_30}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'priorityLevelCode'],
            selectorKeys: ['root', 'priorities'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'priorityLevelName',
              value: 'priorityLevelCode',
            },
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element
          text='Mô hình điều quỹ'
          {...inputTitleProps}
          width={Base.Width.PER_30}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'model'],
            selectorKeys: ['pycRegistration', 'pycModels'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} flex={Base.Flex.START}>
        <Title.Element
          text='Địa điểm nhận'
          {...inputTitleProps}
          width={Base.Width.PER_30}
        />
        <Combox.Element
          width={Base.Width.PX_300}
          store={{
            defaultSelectorKeys: ['pycRegistration', 'creatingPopup', 'placeReceive'],
            selectorKeys: ['pycRegistration', 'pycPlaceReceives'],
            reducerType: SELECT_COMBOX,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
          }}
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
          />
          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'create', 'isShown'],
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

const validateForm = (dispatch, selector) => {
  if (!selector.orgsRequestId) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa điền Số PYC ĐV'}});
    return false;
  }
  if (!selector.objectType.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Đối tượng điều quỹ'}});
    return false;
  }
  if (!selector.priorityLevelCode.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Mức độ ưu tiên'}});
    return false;
  }
  if (!selector.model.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Mô hình điều quỹ'}});
    return false;
  }
  if (!selector.placeReceive.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Địa điểm nhận'}});
    return false;
  }
  return true;
}



const validateSpecialForm = (dispatch, selector) => {
  if (!selector.type.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Loại yêu cầu'}});
    return false;
  }
  if (!selector.currencyType.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Loại tiền'}});
    return false;
  }
  if (['ACB', 'XAU'].includes(selector.currencyType.value) && !selector.goldType.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Loại vàng'}});
    return false;
  }
  if (!selector.quanlity || selector.quanlity == '0') {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Số lượng'}});
    return false;
  }
  if (!selector.attribute.value) {
    dispatch({type: ADD_NOTI, noti:{type:'error', message:'Chưa chọn Đặc điểm'}});
    return false;
  }

  return true;
}


export default Element;
Element.displayName = 'CreatingPopup'
