import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_DUALTABLE_MOVE, SELECT_COMBOX, REQUEST_QUERY, SELECT_DUALTABLE_CONTENT_ROW, SET_POPUP_TYPE, HANDLE_SPECIAL_DELETE, HANDLE_SPECIAL_ADD, REQUEST_EDITING_CANCEL, REQUEST_EDITING, CHANGE_EDITING_INPUT, REQUEST_UPDATE_CONTINUE, REQUEST_PERS, REQUEST_CREATING_PYC_BS, } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as DualTable from "~commons/dualTable";
import * as Datepicker from "~commons/datepicker";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import moment from 'moment';
import { useEffect } from '@storybook/addons';
import { useConfirmationDialog } from '_/hooks';

export type Props = Popup.Props & {
  popupType: string,
};

export const Element = (props: Props) => {
  const {
    setIsShown,
    popupType,
  } = props;
  const selector = useSelector(state => state['routeManagement'].editingPopup);
  const userSelector = useSelector(state => state['auth'].user);
  const dispatch = useDispatch();
  const [confirmationDialog, setConfirmationDialog] = useConfirmationDialog({});
  const selectedContentData2 = selector.tableContent2?.filter(item => item.isSelected);
  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      setConfirmationDialog({
        title: 'Bạn muốn lưu thông tin đăng ký vào hệ thống?',
        description: 'Vui lòng nhấn YES để lưu thông tin, nhấn NO để quay lại',
        onConfirmClick: () => {
          if (popupType === 'normal')
            dispatch({ type: REQUEST_EDITING });
        },
        onDismissClick: () => {
          dispatch({
            type: HANDLE_POPUP,
            keys: ['routeManagement', 'edit', 'isShown'],
            value: false,
          })
        },
        isShown: true,
      });
    }
  }
  const handleContinueButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      if (popupType == 'normal') {
        setConfirmationDialog({
          title: 'Bạn có muốn lưu thông tin và chuyển trạng thái= Adding(Tìm phương tiện và thành phần vận chuyển)?',
          description: 'Vui lòng nhấn YES để đồng ý, nhấn NO để quay lại',
          onConfirmClick: () => {
            dispatch({ type: REQUEST_UPDATE_CONTINUE, popupType });
          },
          onDismissClick: () => {
            dispatch({
              type: HANDLE_POPUP,
              keys: ['routeManagement', 'edit', 'isShown'],
              value: false,
            })
          },
          isShown: true,
        });
      }
      if (popupType == 'urgent') {
        setConfirmationDialog({
          title: 'Bạn muốn lưu thông tin đăng ký vào hệ thống?',
          description: 'Vui lòng nhấn YES để đồng ý và chuyển qua MH sắp xếp, nhấn NO để quay lại',
          onConfirmClick: () => {
            dispatch({ type: REQUEST_CREATING_PYC_BS });
          },
          onDismissClick: () => {
            dispatch({
              type: HANDLE_POPUP,
              keys: ['routeManagement', 'edit', 'isShown'],
              value: false,
            })
          },
          isShown: true,
        });
      }
    }
  }

  const submitButtonProps: Button.Props = {
    text: 'Update',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handleSubmitButtonClick,
  }
  const continueButtonProps: Button.Props = {
    text: 'Continue',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handleContinueButtonClick,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }


  const html1 = popupType === 'urgent' ? (
    <>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái LT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'editingPopup', 'routeStatus'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Phương tiện vận chuyển' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'editingPopup', 'transportType'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Thời gian bắt đầu lộ trình' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'editingPopup', 'startTime'],
            reducerType: '',
          }}
        />
      </Block.Element>
    </>
  ) : null;

  const html2 = popupType === 'urgent' ? (
    <>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên NV bổ sung PYC' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          defaultValue={userSelector.fullname}
        />
      </Block.Element>
    </>
  ) : (
    <>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Thời gian bắt đầu lộ trình (dd/mm/yyyy hh:mm:ss)' {...inputTitleProps} />
        <Datepicker.Element
          flexGrow={Base.FlexGrow.G1}
          margin={Base.MarginRight.PX_18}
          $input={{
            placeholder: 'dd/mm/yyyy hh:mm:ss',
            width: Base.Width.FULL,
            store: {
              selectorKeys: ['routeManagement', 'editingPopup', 'startTime'],
              reducerType: CHANGE_EDITING_INPUT,
            },
            max: 19,
          }}
          $datepicker={{
            store: {
              selectorKeys: ['routeManagement', 'editingPopup', 'startTime'],
              action: { type: CHANGE_EDITING_INPUT },
            },
          }}
          dateFormat='DD/MM/YYYY HH:mm:ss'
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên thủ quỹ ĐVTLT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'editingPopup', 'tqDltltName'],
            reducerType: '',
          }}
        />
      </Block.Element>
    </>
  );
  return (
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_EDITING_CANCEL })}
      extractHtml={confirmationDialog}
    >
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số Lộ trình' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'editingPopup', 'id'],
            reducerType: '',
          }}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVTLT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['routeManagement', 'editingPopup', 'orgsName'],
            reducerType: '',
          }}
        />
      </Block.Element>
      {html1}
      <DualTable.Element
        type={DualTable.Type.BLOCK}
        title1='Danh sách các PYC đang chờ tham gia lộ trình'
        title2='Danh sách các PYC được chọn tham gia lộ trình'
        titleCallback1={titleCallback}
        titleCallback2={titleCallback}
        cellMapping1={cellMapping(dispatch)}
        cellMapping2={cellMapping(dispatch)}
        store={{
          selector1Keys: ['routeManagement', 'editingPopup', 'tableContent1'],
          selector2Keys: ['routeManagement', 'editingPopup', 'tableContent2'],
          row1ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 1 },
          row2ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 2 },
          handleMoveActionType: HANDLE_DUALTABLE_MOVE,
        }}
        actionButtons={{
          oneRightToLeft: {
            text: 'Add',
            isDisabled: selector.tableContent2.length >= 10,
            isShown: false,
          },
          oneLeftToRight: {
            text: 'Remove',
            isDisabled: popupType === 'urgent' && !['Approved', 'Processing'].includes(selectedContentData2[0]?.cashOptimizationStatus),
            isShown: false,
          },
          allRightToLeft: {
            isDisabled: true,
            isShown: true,
          },
          allLeftToRight: {
            isDisabled: true,
            isShown: true,
          },
        }}
        margin={Base.MarginBottom.PX_28}
        pagination={{
          store: {
            totalSelectorKeys: ['routeManagement', 'editingPopup'],
            action: {
              type: REQUEST_PERS,
            }
          },
          style: {
            marginTop: '5px',
          }
        }}
      />

      {html2}

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
            isDisabled={popupType === 'urgent'}
          />
          <Button.Element
            {...continueButtonProps}
            flexGrow={Base.FlexGrow.G1}
            isDisabled={popupType === 'urgent' && ['Originating_R', 'Adding', 'Organizing', 'Canceled-R', 'Finishing', 'Finished'].includes(selector.routeStatus)}
          />

          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'edit', 'isShown'],
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

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const titleCallback = () => ([
  {
    ...tableData_$rows_$cells_title,
    children: 'STT',
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Số lộ trình',
    sort: {
      type: REQUEST_QUERY,
      data: 'id',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Trạng thái PYC',
    sort: {
      type: REQUEST_QUERY,
      data: 'status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mức độ ưu tiên',
    sort: {
      type: REQUEST_QUERY,
      data: 'priority_level_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Khoảng cách ĐVĐQ với ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: '',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mô hình điều quỹ',
    sort: {
      type: REQUEST_QUERY,
      data: 'model',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Tên ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'orgs_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Họ và tên thủ quỹ ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'orgs_holder_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'SĐT Thủ quỹ ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'orgs_holder_mobile',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Tên ĐVĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Họ và tên Thủ quỹ ĐVĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'SĐT thủ quỹ ĐVĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Thông tin chi tiết HĐB',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Loại yêu cầu',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'loại tiền',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'loại vàng',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Số lượng HĐB',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Đặc điểm',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Tên ATM',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Tên NH đối tác KPP mở TK',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  {
    ...tableData_$rows_$cells_title,
    children: 'Số PYC DV',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
]);

const cellMapping = (dispatch) => (item, index) => ([
  {
    children: item.index || index + 1,
  },
  {
    children: item.id,
  },
  {
    children: item.cashOptimizationStatus,
  },
  {
    children: item.priorityLevelName,
  },
  {
    children: item.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
  },
  {
    children: item.model,
  },
  {
    children: item.orgsName,
  },
  {
    children: item.orgsHolderName,
  },
  {
    children: item.orgsHolderMobile,
  },
  {
    children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.orgsDestName,
  },
  {
    children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.tqDvdqName,
  },
  {
    children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.tqDvdqMobile,
  },
  {
    children: <a
      style={{
        color: 'blue',
        cursor: 'pointer',
      }}
      onClick={() => dispatch({
        type: HANDLE_POPUP,
        keys: ['routeManagement', 'special', 'isShown'],
        value: true,
      })} >Link</a>,
  },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.type,
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.currencyType
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.goldType,
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.quanlity
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.attribute,
  // },
  // {
  //   children: item.cashOptimizationOrgsDetailModel?.atmCdmName,
  // },
  // {
  //   children: item.cashOptimizationOrgsDetailModel?.nnhnTctdName,
  // },
  {
    children: item.orgsRequestId,
  },
]);

const validateForm = (dispatch, selector) => {
  if (!moment(selector.startTime, 'DD/MM/YYYY HH:mm:ss', true).isValid()) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Sai Thời gian bắt đầu lộ trình (dd/mm/yyyy hh:mm:ss)' } });
    return false;
  }
  return true;
}





export default Element;
Element.displayName = 'EditingPopup'
