import * as React from 'react'
import Classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ROW } from '~stores/orgs/constants';
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";
import * as Table from "~commons/table";
import { getCurrentDate } from '@utils';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const queryResult = useSelector(state => state['orgs'].queryResult);
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
  console.log(queryResult);
  const tableProps: Table.Props = {
    ...tableData(queryResult.map(mapResponseToData(handleRowClick(dispatch)))),
    // height: Base.Height.PX_300,
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {

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

Element.displayName = 'SearchDataTable'

