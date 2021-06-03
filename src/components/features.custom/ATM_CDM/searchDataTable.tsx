import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";
import * as Table from "~commons/table";

export type Props = Base.Props;

export const Element = (props: Props) => {
  //create props
  const componentWrapperProps = {
    margin:Base.MarginTop.PX_28,
    height: Base.Height.PX_300,
    ...props,
  };

  const tableProps: Table.Props = {
    ...tableData,
    // height: Base.Height.PX_300,
    backgroundColor: Base.BackgroundColor.WHITE,
    style:{
      
    }
  }
  return (
    <Block.Element {...componentWrapperProps}>
      <Table.Element {...tableProps}/>
    </Block.Element >
  )
}
const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}
const tableData:Table.Props = {
  $rows:[
    {
      backgroundColor:Base.BackgroundColor.CLASSIC_BLUE,
      color:Base.Color.WHITE,
      $cells:[
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
    {
      $cells:[
        {
          children: 'bbbb1',
        },
        {
          children: 'bbbb2',
        },
        {
          children: 'bbbb3',
        }
      ],
    },
  ],
}

