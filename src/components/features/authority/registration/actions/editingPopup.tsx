import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_DUALTABLE_MOVE, INPUT_DATE_FROM_CREATING, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_CREATING, INPUT_DATE_TO_EDITING, REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, SEARCH_PERS, SELECT_AUTHORITY_CONTENT_ROW, SET_POPUP_TYPE, } from '~stores/authority/registration/constants';
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
import { HANDLE_POPUP } from '_/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const popupSelector = useSelector(state => state['registration'].editingPopup);

  const dispatch = useDispatch();

  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(popupSelector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: REQUEST_EDITING });
      if (setIsShown)
        setIsShown(false)
    }
  }

  const submitButtonProps: Button.Props = {
    text: 'Edit',
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
          store={{
            selectorKeys: ['registration', 'editingPopup', 'id'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='ĐVUQ' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'editingPopup', 'orgsName'],
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
              placeholder: 'Đến ngày(dd-mm-yyy)',
              width: Base.Width.FULL,
              store: {
                selectorKeys: ['registration', 'editingPopup', 'dateFrom'],
                reducerType: INPUT_DATE_FROM_EDITING,
              },
              max: 19,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['registration', 'editingPopup', 'dateFrom'],
                action: { type: INPUT_DATE_FROM_EDITING },
              },
            }}
          />
          <Datepicker.Element
            flexGrow={Base.FlexGrow.G1}
            $input={{
              placeholder: 'Đến ngày(dd-mm-yyy)',
              width: Base.Width.FULL,
              store: {
                selectorKeys: ['registration', 'editingPopup', 'dateTo'],
                reducerType: INPUT_DATE_TO_EDITING,
              },
              max: 19,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['registration', 'editingPopup', 'dateTo'],
                action: { type: INPUT_DATE_TO_EDITING },
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
              keys: ['registration', 'edit', 'isShown'],
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
                popupType: 2,
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
            selectorKeys: ['registration', 'editingPopup', 'sendName'],
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
            selectorKeys: ['registration', 'editingPopup', 'sendCmnd'],
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
            selectorKeys: ['registration', 'editingPopup', 'sendTitle'],
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
              keys: ['registration', 'edit', 'isShown'],
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
                popupType: 2,
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
            selectorKeys: ['registration', 'editingPopup', 'recvName'],
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
            selectorKeys: ['registration', 'editingPopup', 'recvCmnd'],
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
            selectorKeys: ['registration', 'editingPopup', 'recvCmndyear'],
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
            selectorKeys: ['registration', 'editingPopup', 'recvCmndPlace'],
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
            selectorKeys: ['registration', 'editingPopup', 'recvTitle'],
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
            selectorKeys: ['registration', 'editingPopup', 'recvPhone'],
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
        store={{
          selector1Keys: ['registration', 'editingPopup', 'authorityContent1'],
          selector2Keys: ['registration', 'editingPopup', 'authorityContent2'],
          row1ClickAction: { type: SELECT_AUTHORITY_CONTENT_ROW, popupType: 2, tableType: 1 },
          row2ClickAction: { type: SELECT_AUTHORITY_CONTENT_ROW, popupType: 2, tableType: 2 },
          handleMoveActionType:HANDLE_DUALTABLE_MOVE,
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
            onClick={() => {
              handleSubmitButtonClick();
              }}
          />
          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'edit', 'isShown'],
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
  if (!isMatchDateDD_MM_YYY(popupSelector.dateFrom)) {
    setErrorMsg('UQ từ ngày sai định dạng');
    return false;
  }
  if (!isMatchDateDD_MM_YYY(popupSelector.dateTo)) {
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
Element.displayName = 'EditingPopup'
