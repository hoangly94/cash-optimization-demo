import * as React from 'react'
import Classnames from 'classnames'
import * as Row from "_atoms/row";
import * as Cell from "_atoms/cell";
import * as Block from "_atoms/block";
import * as Base from '_/_settings';
import styles from './styles.css';
import baseStyles from '../../_settings/_base.css';

enum Type {
  DEFAULT = 'table',
}

enum Theme {
  DEFAULT = '',
}

type Props = {
  type?: Type,
  data: {
    rows: Row.Props[],
  },
  cellPadding?: Base.Padding,
  className?: string,
}

const Element = (props: Props) => {
  const { type = Cell.Type.DEFAULT, data, cellPadding = Base.Padding.PX_8, className } = props

  //create props
  const blockWrapperProps = {
    className: Classnames(
      styles[type ?? Type.DEFAULT],
      className
    ),
  }

  const toCell = (cell: Cell.Props) => {
    const cellProps = {
      ...cell,
      padding: cellPadding,
      ...cell,
    };

    return (<Cell.Element {...cellProps} />);
  }

  const toRow = (row: Row.Props) => {
    const children = row.cells ? row.cells.map(cell => toCell(cell)) : null;
    const rowProps = {
      children: children,
      ...row,
    };
    return (<Row.Element {...rowProps} />);
  }

  const toTable = (rows: Row.Props[]) => {
    return rows.map(row => toRow(row));
  }

  return (
    <Block.Element {...blockWrapperProps}>
      {toTable(data.rows)}
    </Block.Element>
  )
}

Element.defaultProps = {
  type: Type.DEFAULT,
  theme: Theme.DEFAULT,
}

export {
  Element,
  Type,
  Props,
};
