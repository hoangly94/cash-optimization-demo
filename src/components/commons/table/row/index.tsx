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
  isSelected?: boolean,
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    isSelected = false,
    children,
    onClick,
  } = props;

  const backgroundColorProps = isSelected
    ? {
      backgroundColor: Base.BackgroundColor.BRIGHT_GRAY,
    }
    : null

  const newProps = {
    ...props,
    ...backgroundColorProps,
  }

  const handleClick = onClick ? {onClick: onClick} : null

  //create props
  const componentProps = Base.mapProps(newProps, styles, [type]);


  return (
    <div {...componentProps} {...handleClick}>{children}</div>
  )
}

Element.displayName = 'Row'