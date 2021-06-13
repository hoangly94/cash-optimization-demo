import * as React from 'react'
import Classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW } from '~stores/category/orgs/constants';
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";
import * as Table from "~commons/table";
import { getCurrentDate } from '@utils';
import {HANDLE_BUTTON} from "~stores/_base/constants";

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['orgs'].queryResult.data);
  const dispatch = useDispatch();

  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    width:Base.Width.FULL,
    style: {
      // maxHeight: '500px',
      overflow: 'auto',
    },
    ...props,
  };

  const tableProps: Table.Props = {
    ...tableData(queryResult?.map(mapResponseToData(handleRowClick(dispatch)))),
    backgroundColor: Base.BackgroundColor.WHITE,
    style:{
      minWidth: '1200px',
    }
  }
  return (
    <Block.Element {...componentWrapperProps}>
      <Table.Element {...tableProps} />
    </Block.Element >
  )
}

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const handleRowClick = (dispatch) => (item) => (e)=> {
  dispatch({ type: SELECT_ROW, data: item })
  dispatch({ type: HANDLE_BUTTON, keys: ['orgs', 'edit', 'isDisabled'], value: false });
}

const tableData = (queryResult?): Table.Props => ({
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
      children: item.categoryOrgsParent.orgsParentId,
    },
    {
      children: item.categoryOrgsParent.orgsCode,
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

Element.displayName = 'SearchDataTable'

