import * as React from 'react'
import Classnames from 'classnames'
import * as Row from "./row";
import * as Cell from "./cell";
import * as Block from "~commons/block";
import * as Base from '~/_settings';
import styles from './_styles.css';

export enum Type {
  DEFAULT = 'table',
}

export type Props = Base.Props & {
  type?: Type,
  $rows?: Row.Props[],
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $rows = [],
  } = props

  //create props
  const componentProps = Base.mapProps(props, styles, [type]);
  // toTable($rows)
  return (
    <div {...componentProps}>
      {toTable($rows)}
    </div>
  )
}

const toTable = (rows: Row.Props[]) => {
  return rows.map(toRow);
}

const toRow = ($row: Row.Props, index) => {
  const children = $row.$cells ? $row.$cells.map(toCell) : null;
  const rowProps = {
    key: (new Date().getTime()) + index,
    children: children,
    textAlign:Base.TextAlign.CENTER,
    ...$row,
  };
  return (<Row.Element {...rowProps} />);
}

const toCell = ($cell: Cell.Props, index) => {
  const cellProps = {
    key: (new Date().getTime()) + index,
    padding: Base.PaddingV.PX_8,
    ...$cell,
  };

  return (<Cell.Element {...cellProps} />);
}

Element.displayName = 'Table'

// const toTable = ($rows: Row.Props[]) => {
//   const newTableData:any[][] = [...new Array($rows[0].$cells?.length)].map(()=> [] as Row.Props[]);
  
//   $rows.map((row, rowIndex) => {
//     row.$cells?.map((cell, cellIndex) => {
//       newTableData[cellIndex].push(cell);
//     });
//   });

//   return newTableData.map(toCol);
// }

// const toCol = (col: any[], index) => {
//   const children = col.map(toCell);
//   const rowProps = {
//     key: (new Date().getTime()) + index,
//     children: children,
//     ...col,
//   };
//   return (<Row.Element {...rowProps} />);
// }

// const toCell = ($cell: Cell.Props, index) => {
//   const cellProps = {
//     key: (new Date().getTime()) + index,
//     padding: Base.Padding.PX_3,
//     ...$cell,
//   };

//   return (<Cell.Element {...cellProps} />);
// }