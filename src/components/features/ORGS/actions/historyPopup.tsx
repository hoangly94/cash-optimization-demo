import React, { useEffect, useRef, useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW, FETCH_HISTORY } from '~stores/orgs/constants';
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_HISTORY });
  }, [])
  const historySelector = useSelector(state => state['orgs'].history);

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
    ...tableData(historySelector .map(mapResponseToData)),
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
      style:{
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
          children: 'Mã ĐV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐV',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ Đơn vị',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã cụm',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên cụm',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ĐVQL',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ĐVQL',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'KC đến ĐVQL',
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
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.orgsAddress,
    },
    {
      children: item.areaCode,
    },
    {
      children: item.areaName,
    },
    {
      children: item.orgsParentId,
    },
    {
      children: item.orgsParentId,
    },
    {
      children: item.dvqlKc,
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
