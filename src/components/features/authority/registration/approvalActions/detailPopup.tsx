import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { INPUT_DATE_FROM_CREATING, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_CREATING, INPUT_DATE_TO_EDITING, REQUEST_CREATING, REQUEST_EDITING, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, SET_POPUP_TYPE, } from '~stores/authority/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Datepicker from "~commons/datepicker";
import * as DualTable from "~commons/dualTable";
import * as Table from "~commons/table";
import { getCurrentDate, isMatchDateTimeDD_MM_YYY } from "@utils";
import { HANDLE_POPUP } from '~/stores/_base/constants';

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
    onClick: handleSubmitButtonClick,
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
        text='Th??ng tin'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='S??? UQ' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          defaultValue={popupSelector.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='??VUQ' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          defaultValue={popupSelector.orgsName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginBottom.PX_28}
      >
        <Title.Element text='Ng??y t???o' {...inputTitleProps} />
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
        <Title.Element text='Ng??y UQ' {...inputTitleProps} />
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
          text='Ng?????i UQ'
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='H??? v?? t??n ng?????i UQ' {...inputTitleProps} />
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
        <Title.Element text='Ch???c v???' {...inputTitleProps} />
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
          text='Ng?????i nh???n UQ'
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='H??? v?? t??n ng?????i nh???n UQ' {...inputTitleProps} />
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
        <Title.Element text='Ng??y c???p' {...inputTitleProps} />
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
        <Title.Element text='N??i c???p' {...inputTitleProps} />
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
        <Title.Element text='Ch???c v???' {...inputTitleProps} />
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
        <Title.Element text='S??? ??i???n tho???i' {...inputTitleProps} />
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
        text='N???i dung UQ'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      {/* <DualTable.Element
        store={{
          selector1Keys: ['registration', 'editingPopup', 'authorityContent1'],
          selector2Keys: ['registration', 'editingPopup', 'authorityContent2'],
          row1ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 2, tableType: 1 },
          row2ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 2, tableType: 2 },
        }}
      /> */}

      <Table.Element {...tableProps} />

      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Title.Element text='T??n nh??n vi??n ????ng k??' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'editingPopup', 'createdbyName'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Title.Element text='T??n TDV ph?? duy???t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'editingPopup', 'updatedbyName'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element
        {...inputWrapperProps}
        margin={Base.MarginTop.PX_28}
      >
        <Title.Element text='Th???i ??i???m TDV ph?? duy???t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'editingPopup', 'updateddate'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}
        margin={Base.MarginTop.PX_28}>
        <Title.Element
          text='L?? do t??? ch???i ph?? duy???t c???a TDV'
          {...inputTitleProps}
        />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['registration', 'editingPopup', 'rejectReason'],
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
          <Title.Element text={errorMsg} color={Base.Color.RED} />
        </Block.Element>
        <Block.Element {...actionsProps}>
          {/* <Button.Element
            {...submitButtonProps}
            flexGrow={Base.FlexGrow.G1}
          /> */}
          <Button.Element
            {...closeButtonProps}
            // flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'detail', 'isShown'],
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
  if (!isMatchDateTimeDD_MM_YYY(popupSelector.dateFrom)) {
    setErrorMsg('UQ t??? ng??y sai ?????nh d???ng');
    return false;
  }
  if (!isMatchDateTimeDD_MM_YYY(popupSelector.dateTo)) {
    setErrorMsg('UQ ?????n ng??y sai ?????nh d???ng');
    return false;
  }

  if (!popupSelector.sendId) {
    setErrorMsg('Ch??a ch???n ng?????i UQ');
    return false;
  }
  if (!popupSelector.sendId) {
    setErrorMsg('Ch??a ch???n ng?????i nh???n UQ');
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
          children: 'N???i Dung ???y Quy???n',
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
      children: item.index || index + 1,
    },
    {
      children: item.name,
    },
  ]
})

export default Element;
Element.displayName = 'EditingPopup'
