import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "~commons/block";
import * as Base from '~/_settings';
import styles from './_styles.css';
import { Size } from '.';

export enum Type {
  DEFAULT = 'combox-option',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  text?: string | number,
  value?: string | number,
  active?: boolean,
  onClick?: React.MouseEventHandler,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    active = false,
    text,
  } = props;

  //create props
  const conponentProps = {
    ...props,
    classNames: Classnames(
      styles[type],
      styles[size],
    ),
  };
  return (
    <Block.Element {...conponentProps}>
      {text}
    </Block.Element>
  )
}

Element.displayName = 'Option';