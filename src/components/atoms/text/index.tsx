import * as React from 'react'
import styles from './styles.css'
import * as Base from '_/_settings';

export enum Type {
  DEFAULT = 'text',
}

export enum Size {
  S2 = 's2',
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
  L2 = 'l2',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  text?: string,
}

export const Element = (props: Props) => {
  const { 
    type = Type.DEFAULT, 
    text, 
    size = Size.M,
    theme = Base.Theme.DEFAULT,
  } = props;

  //create props
  const textProps = Base.mapProps(props, styles, [type, size, theme]);
  return (
    <p {...textProps}>
      {text}
    </p>
  )
}