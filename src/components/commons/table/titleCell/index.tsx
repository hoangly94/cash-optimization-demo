import * as React from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Sort from '../sort';

export enum Type {
  DEFAULT = 'cell',
  TITLE = 'cell-title',
  LINK = 'link',
}

export type Props = Base.Props & {
  type?: Type,
  url?: string,
  children: React.ReactNode,
  sort?: Sort.Props,
  action?: Object,
  sortedRef?: any,
  onClick?: React.MouseEventHandler;
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    children,
    onClick,
    action,
    sort,
    sortedRef,
  } = props;

  const handleClick = onClick ? { onClick } : {};
  //create props
  const componentProps = {
    ...Base.mapProps(props, styles, [type]),
    ...handleClick,
  };
  const sortElement = !sort || (
    <Sort.Element {...sort} sortedRef={sortedRef}/>
  );
  return (
    <td {...componentProps}>
      {children}
      {sortElement}
    </td>
  )
}

Element.displayName = 'Cell'
