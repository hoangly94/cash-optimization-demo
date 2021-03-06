import * as React from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Sort from '../sort';

export enum Type {
  DEFAULT = 'cell',
  LINK = 'link',
}

export type Props = Base.Props & {
  type?: Type,
  url?: string,
  children: React.ReactNode,
  onClick?: React.MouseEventHandler;
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    children,
    onClick,
  } = props;
  
  const handleClick = onClick ? {onClick:onClick} : {};
  //create props
  const componentProps = {
    ...Base.mapProps(props, styles, [type]),
    ...handleClick,
  };

  return (
    <td {...componentProps}>
      {children}
    </td>
  )
}

Element.displayName = 'Cell'
