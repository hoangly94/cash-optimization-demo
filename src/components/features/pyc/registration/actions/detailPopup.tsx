import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as SearchDataTable from "../actions/editingPopup/searchDataTable";
import { HANDLE_POPUP } from '~stores/_base/constants';
import { getCurrentDate, getCurrentDateTime, getDateString, _Date } from '~/utils';
import { REQUEST_EDITING_CANCEL } from '~/stores/pyc/registration/constants';

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const popupSelector = useSelector(state => state['pycRegistration'].detailPopup);
  const userSelector = useSelector(state => state['auth'].user);
  const dispatch = useDispatch();

  const handleSubmitButtonClick = (type) => () => {
    const isValidForm = validateForm(popupSelector, setErrorMsg);
    if (isValidForm) {
      setErrorMsg('');
      if (setIsShown)
        setIsShown(false)
    }
  }

  const closePopup = () => {
    dispatch({
      type: HANDLE_POPUP,
      keys: ['pycRegistration', 'detail', 'isShown'],
      value: false,
    });
  };

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
    onClick: () => dispatch({ type: REQUEST_EDITING_CANCEL }),
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
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_EDITING_CANCEL })}
    >
      <Title.Element
        tagType={Title.TagType.H3}
        text='Th??ng tin'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='S??? PYC HT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='S??? PYC ??V' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsRequestId}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ng??y t???o PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.createddate?.split('-').join('/')}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tr???ng th??i PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationStatus}
          isDisabled={true}
        />
      </Block.Element>
      {/* <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tr???ng th??i PYC HT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationStatus}
          isDisabled={true}
        />
      </Block.Element> */}
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n ??VYC??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n Th??? qu??? ??VYC??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsHolderName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='S??T Th??? qu??? ??VYC??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.orgsHolderMobile}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='?????i t?????ng ??i???u qu???' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.objectType?.text}
          isDisabled={true}
        />
      </Block.Element>

      <Title.Element
        tagType={Title.TagType.H3}
        text='Th??ng tin chi ti???t H??B'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <SearchDataTable.Element />

      <Block.Element margin={Base.MarginBottom.PX_28} />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='M???c ????? ??u ti??n' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector?.priorityLevelName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='M?? h??nh ??i???u qu???' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.model?.text}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='?????a ??i???m nh???n' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.placeReceive?.text}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Kho???ng c??ch ??V??Q v???i ??VYC??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          store={{
            selectorKeys: ['pycRegistration', 'orgsSearchingPopup', 'distanceOrgsToOrgsRequest'],
            reducerType: '',
          }}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.orgsDestName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n ATM' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.atmCdmName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n NH ?????i t??c KPP m??? TK' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.nnhnTctdName}
          isDisabled={true}
        />
      </Block.Element>


      <Title.Element
        tagType={Title.TagType.H3}
        text='Th??ng tin ph?? duy???t t???o PYC'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n CPD ??VYC??Q ph?? duy???t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cpdDvycdqName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Th???i ??i???m CPD ??VYC??Q ph?? duy???t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDateTime(popupSelector.cpdDvycdqDate)}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='L?? do t??? ch???i ph?? duy???t c???a CPD ??VYC??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cpdDvycdqReason}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n Th??? qu??? ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqName || ''}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='S??T Th??? qu??? ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqMobile || ''}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n TQ ??V??Q ki???m so??t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Th???i ??i???m TQ ??V??Q ki???m so??t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDateTime(popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckDate)}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='L?? do t??? ch???i ki???m so??t c???a TQ ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckReason}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n CPD ??V??Q ph?? duy???t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.cpdDvdqName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Th???i ??i???m CPD ??V??Q ph?? duy???t' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDateTime(popupSelector.cashOptimizationOrgsDetailModel?.cpdDvdqDate)}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='L?? do t??? ch???i ph?? duy???t c???a CPD ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.cpdDvdqReason}
          isDisabled={true}
        />
      </Block.Element>




      <Title.Element
        tagType={Title.TagType.H3}
        text='Th??ng tin ph?? duy???t h???y PYC'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n Nh??n vi??n h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.nvCancelName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ng??y gi??? h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDateTime(popupSelector.nvCancelDate)}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='L?? do h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.nvCancelReason === 'KH??C' ? popupSelector.cashOptimizationReasonDesc : popupSelector.nvCancelReason}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n CPD ??V??Q ph?? duy???t h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cpdDvycdqCancelName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Th???i ??i???m CPD ??VYC??Q ph?? duy???t h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDateTime(popupSelector.cpdDvycdqCancelDate)}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='L?? do t??? ch???i ph?? duy???t h???y c???a CPD ??VYC??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cpdDvycdqCancelReason}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n TQ ??V??Q ki???m so??t h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckCancelName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Th???i ??i???m TQ ??V??Q ki???m so??t h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDateTime(popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckCancelDate)}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='L?? do t??? ch???i ki???m so??t h???y c???a TQ ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.tqDvdqCheckCancelReason}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='T??n CPD ??V??Q ph?? duy???t h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.cpdDvdqCancelName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Th???i ??i???m CPD ??V??Q ph?? duy???t h???y PYC' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.cpdDvdqCancelDate}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps} margin={Base.MarginBottom.PX_38}>
        <Title.Element text='L?? do t??? ch???i ph?? duy???t h???y c???a CPD ??V??Q' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.cashOptimizationOrgsDetailModel?.cpdDvdqCancelReason}
          isDisabled={true}
        />
      </Block.Element>

      <Title.Element
        tagType={Title.TagType.H3}
        text='Th??ng tin L??? tr??nh'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='S??? LT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.routeId || ''}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tr???ng th??i LT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.routeStatus}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Version LT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={popupSelector.routeVersion}
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
  //   setErrorMsg('Ch??a ch???n ng?????i UQ');
  //   return false;
  // }
  // if (!popupSelector.sendId) {
  //   setErrorMsg('Ch??a ch???n ng?????i nh???n UQ');
  //   return false;
  // }
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
          children: 'Ng??y t???o',
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
Element.displayName = 'DetailPopup'
