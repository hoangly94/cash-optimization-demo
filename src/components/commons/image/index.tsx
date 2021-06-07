import * as React from 'react';
import styles from './_styles.css'
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'image',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
  L2 = 'size-l2',
}

export type Props = Base.Props & {
  type?: Type,
  src?: string,
  size?: Size,
  onClick?: React.MouseEventHandler,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    src,
    onClick,
  } = props;

  //create props
  const componentProps = {
    ...Base.mapProps(props, styles, [type, size]),
    src: src,
  }

  return (
    <img {...componentProps}/>
  )
}

Element.displayName = 'Image'












