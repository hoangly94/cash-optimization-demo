import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_EDITING_INPUT, HANDLE_APPROVE_ACTION, HANDLE_REJECT_ACTION, INPUT_DATE_FROM_CREATING, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_CREATING, INPUT_DATE_TO_EDITING, REQUEST_CREATING, REQUEST_EDITING, SEARCH_PERS, SELECT_AUTHORITY_CONTENT_ROW, SET_POPUP_TYPE, } from '~stores/authority/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
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
  const handleSubmitButtonClick = (actionType) => {
    const isValidForm = actionType == HANDLE_REJECT_ACTION ? validateForm(popupSelector, setErrorMsg) : true;
    if (isValidForm) {
      setErrorMsg('');
      dispatch({ type: actionType });
      dispatch({
        type: HANDLE_POPUP,
        keys: ['registration', 'validate', 'isShown'],
        value: false,
      });

      if (setIsShown)
        setIsShown(false)
    }
  }

  const submitButtonProps: Button.Props = {
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }
  const errorMsgDisplay = errorMsg ? { display: 'block' } : { display: 'none' };

  const tableProps: Table.Props = {
    ...tableData(popupSelector.authorityContent2?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {
      minWidth: '800px',
    }
  }

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
          store={{
            selectorKeys: ['registration', 'editingPopup', 'id'],
            reducerType: '',
          }}
          {...inputProps}
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
          <Input.Element
            {...inputProps}
            flexGrow={Base.FlexGrow.G1}
            margin={Base.MarginRight.PX_18}
            store={{
              selectorKeys: ['registration', 'editingPopup', 'dateFrom'],
              reducerType: '',
            }}
            isDisabled={true}
          />
          <Input.Element
            {...inputProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              selectorKeys: ['registration', 'editingPopup', 'dateTo'],
              reducerType: '',
            }}
            isDisabled={true}
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
      <Table.Element {...tableProps} />

      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Title.Element text='Tên nhân viên đăng ký' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['auth', 'user', 'name'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}
        margin={Base.MarginTop.PX_28}>
        <Title.Element
          text='Lý do từ chối phê duyệt của TDV'
          {...inputTitleProps}
        />
        <Input.Element
          {...inputProps}
          placeholder='Nhập lý do từ chối...'
          store={{
            selectorKeys: ['registration', 'editingPopup', 'rejectReason'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
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
            text='Approve'
            onClick={() => handleSubmitButtonClick(HANDLE_APPROVE_ACTION)}
            backgroundColor={Base.BackgroundColor.GREEN}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...submitButtonProps}
            text='Reject'
            onClick={() => handleSubmitButtonClick(HANDLE_REJECT_ACTION)}
            backgroundColor={Base.BackgroundColor.RED}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'validate', 'isShown'],
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
  flex: Base.Flex.END,
  width: Base.Width.PER_70,
}

const validateForm = (popupSelector, setErrorMsg) => {
  if (!popupSelector.rejectReason) {
    setErrorMsg('Chưa nhập lý do từ chối');
    return false;
  }
  return true;
}

const handleRowClick = (dispatch) => (item) => (e) => {
}

const tableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          children: 'STT',
        },
        {
          children: 'Ngày tạo',
        },
      ],
    },
     ],
  $rows: queryResult ? queryResult : [],
})

const mapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.name,
    },
  ]
})

export default Element;
Element.displayName = 'ValidatePopup'
