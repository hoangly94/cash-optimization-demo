import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_EDITING_INPUT, HANDLE_VALIDATE_APPROVE1, HANDLE_VALIDATE_APPROVE2, HANDLE_VALIDATE_APPROVE3, HANDLE_VALIDATE_REJECT1, HANDLE_VALIDATE_REJECT2, HANDLE_VALIDATE_REJECT3, REQUEST_EDITING } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as SearchDataTable from "../actions/editingPopup/searchDataTable";
import { HANDLE_POPUP } from '~stores/_base/constants';
import { getCurrentDate, getCurrentDateTime } from '_/utils';

export type Props = Popup.Props & {
  popupType: string,
};

export const Element = (props: Props) => {
  const {
    setIsShown,
    popupType,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const popupSelector = useSelector(state => state['pycRegistration'].editingPopup);
  const userSelector = useSelector(state => state['auth'].user);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = (type) => () => {
    const isValidForm = validateForm(popupSelector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      closePopup();
      if (type === 1) {
        if (popupType === 'validate1')
          dispatch({ type: HANDLE_VALIDATE_APPROVE1 });
        if (popupType === 'validate2')
          dispatch({ type: HANDLE_VALIDATE_APPROVE2 });
        if (popupType === 'validate3')
          dispatch({ type: HANDLE_VALIDATE_APPROVE3 });
      }
      if (type === 2) {
        if (popupType === 'validate1')
          dispatch({ type: HANDLE_VALIDATE_REJECT1 });
        if (popupType === 'validate2')
          dispatch({ type: HANDLE_VALIDATE_REJECT2 });
        if (popupType === 'validate3')
          dispatch({ type: HANDLE_VALIDATE_REJECT3 });
      }
      if (setIsShown)
        setIsShown(false)
    }
  }

  const closePopup = () => {
    dispatch({
      type: HANDLE_POPUP,
      keys: ['pycRegistration', 'validate1', 'isShown'],
      value: false,
    });
    dispatch({
      type: HANDLE_POPUP,
      keys: ['pycRegistration', 'validate2', 'isShown'],
      value: false,
    });
    dispatch({
      type: HANDLE_POPUP,
      keys: ['pycRegistration', 'validate3', 'isShown'],
      value: false,
    });
  };

  const html1 = (function () {
    if (popupType === 'validate1')
      return (<>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên ATM' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.atmCdmName}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên NH đối tác KPP mở TK' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.nnhnTctdName}
            isDisabled={true}
          />
        </Block.Element>
      </>)

    if (popupType === 'validate2')
      return (<>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên Thủ quỹ ĐVĐQ' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.orgsHolderName}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='SĐT Thủ quỹ ĐVĐQ' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.orgsHolderMobile}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên CPD ĐVYCĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cpdDvycdqName}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Thời điểm CPD ĐVYCĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cpdDvycdqDate}
            isDisabled={true}
          />
        </Block.Element>
      </>)

    if (popupType === 'validate3')
      return (<>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên Thủ quỹ ĐVĐQ' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.orgsHolderName}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='SĐT Thủ quỹ ĐVĐQ' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.orgsHolderMobile}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên CPD ĐVYCĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cpdDvycdqName}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Thời điểm CPD ĐVYCĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cpdDvycdqDate}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên TQ ĐVĐQ kiểm soát' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckName}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Thời điểm TQ ĐVĐQ kiểm soát' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckDate}
            isDisabled={true}
          />
        </Block.Element>
      </>)
  })();

  const html2 = (function () {
    if (popupType === 'validate1')
      return (<>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên CPD ĐVYCĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={userSelector.fullname}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Thời điểm CPD ĐVYCĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={getCurrentDateTime()}
            isDisabled={true}
          />
        </Block.Element>
      </>)

    if (popupType === 'validate2')
      return (<>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên TQ ĐVĐQ kiểm soát' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={userSelector.fullname}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Thời điểm TQ ĐVĐQ kiểm soát' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={getCurrentDateTime()}
            isDisabled={true}
          />
        </Block.Element>
      </>)

    if (popupType === 'validate3')
      return (<>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên CPD ĐVĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={userSelector.fullname}
            isDisabled={true}
          />
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Thời điểm CPD ĐVĐQ phê duyệt' {...inputTitleProps} />
          <Input.Element
            {...inputProps}
            defaultValue={getCurrentDateTime()}
            isDisabled={true}
          />
        </Block.Element>
      </>)
  })();
  const approveButtonProps: Button.Props = {
    text: 'Approve',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handleSubmitButtonClick(1),
  }
  const rejectButtonProps: Button.Props = {
    text: 'Reject',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.RED,
    onClick: handleSubmitButtonClick(2),
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
        <Title.Element text='Số PYC HT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số PYC ĐV' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsRequestId}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày tạo PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsHolderName}
          isDisabled={true}
        />
      </Block.Element>
      {/* <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái PYC HT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationStatus}
          isDisabled={true}
        />
      </Block.Element> */}
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên Thủ quỹ ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsHolderName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='SĐT Thủ quỹ ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsHolderMobile}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='SĐT Thủ quỹ ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.objectType.text}
          isDisabled={true}
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
      <SearchDataTable.Element />

      <Block.Element margin={Base.MarginBottom.PX_28} />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mức độ ưu tiên' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.priorityLevelName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Mô hình điều quỹ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.model.text}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Địa điểm nhận' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.placeReceive.text}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Khoảng cách ĐVĐQ với ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.routeId}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={userSelector.orgsName}
          isDisabled={true}
        />
      </Block.Element>

      {html1}

      <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin người phê duyệt'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />

      {html2}



      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Lý do từ chối phê duyệt của CPD ĐVYCĐQ' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          placeholder='Lý do từ chối phê duyệt của CPD ĐVYCĐQ'
          store={{
            selectorKeys: ['pycRegistration', 'editingPopup', 'rejectReason'],
            reducerType: CHANGE_EDITING_INPUT,
          }}
        />
      </Block.Element>


      {/* <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin phê duyệt tạo PYC'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      /> */}



      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
          <Title.Element text={errorMsg} color={Base.Color.RED} />
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element
            {...approveButtonProps}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...rejectButtonProps}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...closeButtonProps}
            // flexGrow={Base.FlexGrow.G1}
            onClick={closePopup}

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

  // if (!popupSelector.sendId) {
  //   setErrorMsg('Chưa chọn người UQ');
  //   return false;
  // }
  // if (!popupSelector.sendId) {
  //   setErrorMsg('Chưa chọn người nhận UQ');
  //   return false;
  // }
  return true;
}

const handleRowClick = (dispatch) => (item) => (e) => {
}

const tableData = (queryResult?): Table.Props => ({
  $rows: [
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
    ...(queryResult ? queryResult : []),
  ],
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
Element.displayName = 'EditingPopup'
