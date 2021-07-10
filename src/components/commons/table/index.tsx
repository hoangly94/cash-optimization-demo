import React, { useCallback, useRef, useState } from 'react'
import Classnames from 'classnames'
import * as Row from "./row";
import * as Cell from "./cell";
import * as TitleCell from "./titleCell";
import * as Block from "~commons/block";
import * as Base from '~/_settings';
import styles from './_styles.css';
import { Record, Map } from 'immutable';

export enum Type {
  DEFAULT = 'table',
}

export type Props = Base.Props & {
  type?: Type,
  action?: Object,
  $thead?: Row.Props[],
  $rows?: Row.Props[],
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    action,
    $thead = [],
    $rows = [],
  } = props;

  // const sortedState = useState('');
  // const TheadComponent = useRef(
  //   <thead>
  //     {toTitle($thead, sortedState)}
  //   </thead>
  // );
  const sortedRef = useRef({
    key: '',
    type: 0,
  });

  //create props
  const componentProps = {
    ...Base.mapProps(props, styles, [type]),
  };

  return (
    <table {...componentProps}>
      {/* {TheadComponent.current} */}
      <thead>
        {toTitle($thead, sortedRef)}
      </thead>
      <tbody>
        {toTable($rows)}
      </tbody>
    </table>
  )
}

const toTitle = (rows: Row.Props[], sortedRef) => {
  return rows.map(toTitleRow(sortedRef));
}
const toTable = (rows: Row.Props[]) => {
  return rows.map(toRow);
}

const toTitleRow = (sortedRef) => ($row: Row.Props, index) => {

  const children = $row.$cells ? $row.$cells.map(toTitleCell(sortedRef)) : null;
  const rowProps = {
    key: (new Date().getTime()) + index,
    children: children,
    textAlign: Base.TextAlign.CENTER,
    ...$row,
  };
  return (<Row.Element {...rowProps} />);
}
const toTitleCell = (sortedRef) => ($cell: TitleCell.Props, index) => {
  const cellProps = {
    key: (new Date().getTime()) + index,
    padding: Base.PaddingV.PX_8,
    ...$cell,
    sortedRef,
  };
  return (<TitleCell.Element {...cellProps} />);
}

const toRow = ($row: Row.Props, index) => {
  const children = $row.$cells ? $row.$cells.map(toCell) : null;
  const rowProps = {
    key: (new Date().getTime()) + index,
    children: children,
    textAlign: Base.TextAlign.CENTER,
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

Element.displayName = 'Table';

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