import * as React from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'label',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  text?: string,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    text = '',
  } = props;

  //create props
  const componentProps = Base.mapProps(props, styles, [type, size]);
  return (
    <div {...componentProps}>
      {text}
    </div>
  )
}

Element.displayName = 'Label';


