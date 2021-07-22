import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_DUALTABLE_MOVE, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, REQUEST_CREATING, REQUEST_CREATING_CANCEL, REQUEST_QUERY, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, SET_POPUP_TYPE, } from '~stores/authority/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Datepicker from "~commons/datepicker";
import * as DualTable from "~commons/dualTable";
import { getCurrentDate, isMatchDateTimeDD_MM_YYY } from "@utils";
import { HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const popupSelector = useSelector(state => state['registration'].creatingPopup);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(popupSelector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: REQUEST_CREATING });
      dispatch({ type: REQUEST_CREATING_CANCEL });
      if (setIsShown)
        setIsShown(false)
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
    onClick: () => dispatch({ type: REQUEST_CREATING_CANCEL }),
  }
  const errorMsgDisplay = errorMsg ? { display: 'block' } : { display: 'none' };

  return (
    <Popup.Element {...props}>
      <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số UQ' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'id'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='ĐVUQ' {...inputTitleProps} />
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
      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginBottom.PX_28}
      >
        <Title.Element text='Ngày tạo' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          defaultValue={getCurrentDate()}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginBottom.PX_28}
      >
        <Title.Element text='Ngày UQ' {...inputTitleProps} />
        <Block.Element
          width={Base.Width.PER_70}
          flex={Base.Flex.BETWEEN}
        >
          <Datepicker.Element
            flexGrow={Base.FlexGrow.G1}
            margin={Base.MarginRight.PX_18}
            $input={{
              placeholder: 'Đến ngày(dd/mm/yyy)',
              width: Base.Width.FULL,
              store: {
                selectorKeys: ['registration', 'creatingPopup', 'dateFrom'],
                reducerType: INPUT_DATE_FROM_CREATING,
              },
              max: 19,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['registration', 'creatingPopup', 'dateFrom'],
                action: { type: INPUT_DATE_FROM_CREATING },
              },
            }}
          />
          <Datepicker.Element
            flexGrow={Base.FlexGrow.G1}
            $input={{
              placeholder: 'Đến ngày(dd/mm/yyy)',
              width: Base.Width.FULL,
              store: {
                selectorKeys: ['registration', 'creatingPopup', 'dateTo'],
                reducerType: INPUT_DATE_TO_CREATING,
              },
              max: 19,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['registration', 'creatingPopup', 'dateTo'],
                action: { type: INPUT_DATE_TO_CREATING },
              },
            }}
          />
        </Block.Element>
      </Block.Element>

      <Block.Element
        flex={Base.Flex.BETWEEN}
        alignItems={Base.AlignItems.STRETCH}
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      >
        <Title.Element
          tagType={Title.TagType.H3}
          text='Người UQ'
        />
        <Button.Element
          border={Base.Border.NONE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
          color={Base.Color.WHITE}
          width={Base.Width.PX_200}
          text='Search'
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['registration', 'create', 'isShown'],
              value: false,
            }
          }}
          onClick={() => {
            dispatch({
              type: HANDLE_POPUP,
              keys: ['registration', 'searchPers', 'isShown'],
              value: true,
            });
            dispatch({
              type: SEARCH_PERS,
              data: {
                searchPersType: 1,
                popupType: 1,
              },
            });
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Họ và tên người UQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'sendName'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='CMND' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'sendCmnd'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức vụ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'sendTitle'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>


      <Block.Element
        flex={Base.Flex.BETWEEN}
        alignItems={Base.AlignItems.STRETCH}
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      >
        <Title.Element
          tagType={Title.TagType.H3}
          text='Người nhận UQ'
        />
        <Button.Element
          border={Base.Border.NONE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
          color={Base.Color.WHITE}
          width={Base.Width.PX_200}
          text='Search'
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['registration', 'create', 'isShown'],
              value: false,
            }
          }}
          onClick={() => {
            dispatch({
              type: HANDLE_POPUP,
              keys: ['registration', 'searchPers', 'isShown'],
              value: true,
            });
            dispatch({
              type: SEARCH_PERS,
              data: {
                searchPersType: 2,
                popupType: 1,
              },
            });
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Họ và tên người UQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'recvName'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='CMND' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'recvCmnd'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày cấp' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'recvCmndyear'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Nơi cấp' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'recvCmndPlace'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Chức vụ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'recvTitle'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số điện thoại' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'creatingPopup', 'recvPhone'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>


      <Title.Element
        tagType={Title.TagType.H3}
        text='Nội dung UQ'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <DualTable.Element
        title1='Nội dung ủy quyền chưa chọn'
        title2='Nội dung ủy quyền đã chọn'
        store={{
          selector1Keys: ['registration', 'creatingPopup', 'authorityContent1'],
          selector2Keys: ['registration', 'creatingPopup', 'authorityContent2'],
          row1ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 1 },
          row2ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 2 },
          handleMoveActionType: HANDLE_DUALTABLE_MOVE,
        }}
      />

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
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'create', 'isShown'],
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

const validateForm = (popupSelector, setErrorMsg) => {
  if (!isMatchDateTimeDD_MM_YYY(popupSelector.dateFrom)) {
    setErrorMsg('UQ từ ngày sai định dạng');
    return false;
  }
  if (!isMatchDateTimeDD_MM_YYY(popupSelector.dateTo)) {
    setErrorMsg('UQ đến ngày sai định dạng');
    return false;
  }

  if (!popupSelector.sendId) {
    setErrorMsg('Chưa chọn người UQ');
    return false;
  }
  if (!popupSelector.sendId) {
    setErrorMsg('Chưa chọn người nhận UQ');
    return false;
  }
  return true;
}

export default Element;
Element.displayName = 'CreatingPopup'
