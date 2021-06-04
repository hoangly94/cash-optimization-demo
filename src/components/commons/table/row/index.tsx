import * as React from 'react'
import styles from './_styles.css'
import * as Cell from "../cell";
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'row',
}

export type Props = Base.Props & {
  type?: Type,
  $cells?: Cell.Props[],
  children?: React.ReactNode,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    children,
  } = props;

  //create props
  const componentProps = Base.mapProps(props, styles, [type]);

  return (
    <div {...componentProps}>{children}</div>
  )
}

Element.displayName = 'Row'