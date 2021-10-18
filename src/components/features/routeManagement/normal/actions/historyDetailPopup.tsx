import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
// import * as SearchDataTable from "../actions/editingPopup/searchDataTable";
import { HANDLE_POPUP } from '~stores/_base/constants';
import { getCurrentDate, getCurrentDateTime, getDateString, _Date } from '~/utils';
import { REQUEST_EDITING_CANCEL } from '~/stores/pyc/registration/constants';
import { FETCH_BALANCE_SPECIAL, SELECT_DUALTABLE_CONTENT_ROW } from '_/stores/routeManagement/normal/constants';

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const selector = useSelector(state => state['routeManagement'].history?.detailPopup);
  // const userSelector = useSelector(state => state['auth'].user);
  const dispatch = useDispatch();

  return (
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_EDITING_CANCEL })}
    >
      <Title.Element
        tagType={Title.TagType.H3}
        text='Thông tin'
        style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '28px',
        }}
      />
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số lộ trình' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={selector?.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Trạng thái LT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={selector?.routeStatus}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Version LT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={selector?.routeVersion}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Ngày tạo LT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={_Date.getDate(selector?.createddate)}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVTLT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={selector?.orgsName}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên thủ quỹ ĐVTLT' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={selector?.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Thời gian bắt đầu lộ trình' {...inputTitleProps} />
        <Input.Element
          {...inputProps}
          defaultValue={selector?.startTime}
          isDisabled={true}
        />
      </Block.Element>


      <Title.Element text='Các PYC được chọn tham gia lộ trình'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...pycTableData(selector?.routeCashOptimization?.map(pycMapResponseToData(handleRowClick(dispatch), dispatch)))}
          backgroundColor={Base.BackgroundColor.WHITE}
          style={{
            minWidth: '1800px',
          }}
        />
      </Block.Element>

      <Title.Element text='Thông tin xe đính kèm lái xe tham gia lộ trình'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...vehicleTableData(selector?.routeDetailVehicle?.map(vehicleMapResponseToData(handleRowClick(dispatch))))}
          backgroundColor={Base.BackgroundColor.WHITE}
          style={{
            minWidth: '1800px',
          }}
        />
      </Block.Element>

      <Title.Element text='Thông tin nhân viên tham gia lộ trình'
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...persTableData(selector?.routeDetailPers?.map(persMapResponseToData(handleRowClick(dispatch))))}
          backgroundColor={Base.BackgroundColor.WHITE}
          style={{
            minWidth: '1800px',
          }}
        />
      </Block.Element>

      <Title.Element text='Thông tin thứ tự di chuyển của lộ trình '
        width={Base.Width.PER_70}
        tagType={Title.TagType.H3}
      />
      <Block.Element
        margin={Base.MarginBottom.PX_38}
        style={{
          overflow: 'auto',
        }}
      >
        < Table.Element
          {...routeTableData(selector?.routeDetailOganize?.map(routeMapResponseToData(dispatch, handleRowClick(dispatch))))}
          backgroundColor={Base.BackgroundColor.WHITE}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
        </Block.Element>
        <Block.Element {...actionsProps}>
          {/* <Button.Element
            text='Update'
            margin={Base.MarginRight.PX_8}
            width={Base.Width.PX_200}
            border={Base.Border.NONE}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.GREEN}
            onClick={handleSubmitButtonClick}
          /> */}
          <Button.Element
            text='Close'
            width={Base.Width.PX_200}
            color={Base.Color.WHITE}
            backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
            // flexGrow={Base.FlexGrow.G1}
            onClick={() => {
              dispatch({
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'historyDetail', 'isShown'],
                value: false,
              });
              dispatch({
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'history', 'isShown'],
                value: true,
              });
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

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const handleRowClick = (dispatch) => (item, tableType) => (e) => {
  if (tableType === 3)
    dispatch({ type: SELECT_DUALTABLE_CONTENT_ROW, data: item?.cashOptimization, popupType: 2, tableType: 2 });
}

const vehicleTableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Biển số xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã đơn vị quản lý xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên đơn vị quản lý xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên Lái xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT Lái xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Vị trí GPS của xe',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const vehicleMapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 1),
  $cells: [
    {
      children: item.index || index + 1,
    },
    {
      children: item.vehicleCode,
    },
    {
      children: item.categoryVehicle?.categoryOrgs?.orgsCode,
    },
    {
      children: item.categoryVehicle?.categoryOrgs?.orgsName,
    },
    {
      children: item.categoryVehicle?.driverName,
    },
    {
      children: item.categoryVehicle?.categoryPers?.persMobile,
    },
    {
      children: item.gps,
    },
    {
      children: item.categoryVehicle?.vehicleStatus,
    },
  ]
})

const persTableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên nhân viên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Chức danh',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT Nhân viên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVQL NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVQL NV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const persMapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 2),
  $cells: [
    {
      children: item.index || index + 1,
    },
    {
      children: item.persCode,
    },
    {
      children: item.persName,
    },
    {
      children: item.categoryPers?.categoryTitle?.titleName,
    },
    {
      children: item.categoryPers?.persMobile,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsCode,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsName,
    },
    {
      children: item.categoryPers?.categoryOrgs?.orgsAddress,
    },
    {
      children: item.categoryPers?.persStatus,
    },
  ]
})

const pycTableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC DV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Khoảng cách ĐVĐQ với ĐVYCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình điều quỹ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVYCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên thủ quỹ ĐVYCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT thủ quỹ ĐVYCĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ATM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên NH đối tác KPP mở TK',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Họ và tên thủ quỹ ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'SĐT thủ quỹ ĐVĐQ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Thông tin chi tiết HĐB',
        },
      ]
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const pycMapResponseToData = (handleRowClick, dispatch) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item, 3),
  $cells: [
    {
      children: item.index || index + 1,
    },
    {
      children: item.cashOptimization?.id,
    },
    {
      children: item.cashOptimization?.cashOptimizationStatus,
    },
    {
      children: item.cashOptimization?.orgsRequestId,
    },
    {
      children: item.cashOptimization?.priorityLevelName,
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
    },
    {
      children: item.cashOptimization?.model,
    },
    {
      children: item.cashOptimization?.orgsName,
    },
    {
      children: item.cashOptimization?.orgsHolderName,
    },
    {
      children: item.cashOptimization?.orgsHolderMobile,
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.orgsDestName,
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.atmCdmName,
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.nnhnTctdName,
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.tqDvdqName || ''
    },
    {
      children: item.cashOptimization?.cashOptimizationOrgsDetailModel?.tqDvdqMobile || ''
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
  ]
})

const routeTableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái điểm dừng',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại điểm dừng',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên điểm đi',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đi',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ điểm đến',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Khoảng cách từ điểm đi đến điểm đến ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số PYC HT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mức độ ưu tiên',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mô hình điều quỹ',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Số dư HĐB',
        },
      ],
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const routeMapResponseToData = (dispatch, handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: item.index || index + 1,
    },
    {
      children: item.routeDetailOganizeStatus,
    },
    {
      children: item.stopPointType,
    },
    {
      children: item.departurePointName,
    },
    {
      children: item.departurePointAddress,
    },
    {
      children: item.destinationPointName,
    },
    {
      children: item.destinationPointAddress,
    },
    {
      children: item.kcDepartureToDestination,
    },
    {
      children: item.cashOptimizationId,
    },
    {
      children: item.cashOptimization?.priorityLevelName,
    },
    {
      children: item.cashOptimization?.model,
    },
    {
      children: <a
        style={{
          color: 'blue',
          cursor: 'pointer',
        }}
        onClick={() => {
          dispatch({
            type: HANDLE_POPUP,
            keys: ['routeManagement', 'balanceSpecial', 'isShown'],
            value: true,
          });
          dispatch({ type: FETCH_BALANCE_SPECIAL, routeDetailOganizeId: item.id })
        }} >Link</a>,
    },
  ]
})
Element.displayName = 'DetailPopup'
