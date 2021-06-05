import React, { useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Dropdown from "~commons/dropdown";
import { getCurrentDate } from "@utils";

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;
  console.log('================History Popup');

  const queryResult = useSelector(state => state['atmCdm'].queryResult);
  const dispatch = useDispatch();

  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    style: {
      maxHeight: '500px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    ...props,
  };

  const tableProps: Table.Props = {
    ...tableData(queryResult.map(mapResponseToData)),
    // height: Base.Height.PX_300,
    backgroundColor: Base.BackgroundColor.WHITE,
    margin:Base.MarginBottom.PX_18,
  }



  const handleCloseButtonClick = () => {
    if (setIsShown)
      setIsShown(false)
  }
  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    onClick: handleCloseButtonClick,
  }
  return (
    <Popup.Element {...props}>
      <Table.Element {...tableProps} />
      <Block.Element {...actionsWrapperProps}>
        <Block.Element {...actionsProps}>
          <Button.Element {...closeButtonProps} />
        </Block.Element>
      </Block.Element>
    </Popup.Element>
  )
}

const actionsWrapperProps: Block.Props = {
  flex: Base.Flex.END,
}

const actionsProps: Block.Props = {
  flex: Base.Flex.END,
  width: Base.Width.PER_70,
}


const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const handleRowClick = (dispatch) => (item) => (e)=> {
  dispatch({ type: SELECT_ROW, data: item })
}

const tableData = (queryResult): Table.Props => ({
  $rows: [
    {
      backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ATM/CDM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ATM/CDM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại máy ATM/CDM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ ATM/CDM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái ATM/CDM',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã DVQL',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên DVQL',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày đăng ký',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'NV đăng ký',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Datelastmaint',
        },
      ],
    },
    ...queryResult,
  ],
})


const mapResponseToData = (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.atmCdmCode,
    },
    {
      children: item.atmCdmName,
    },
    {
      children: item.atmCdmType,
    },
    {
      children: item.atmAddress,
    },
    {
      children: item.atmStatus,
    },
    {
      children: item.categoryOrgs.orgsCode,
    },
    {
      children: item.categoryOrgs.orgsName,
    },
    {
      children: getCurrentDate(item.createddate),
    },
    {
      children: item.createdby,
    },
    {
      children: getCurrentDate(item.updateddate),
    },
  ]
})

export default Element;
Element.displayName = 'Actions_Button'
