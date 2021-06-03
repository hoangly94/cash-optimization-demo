import * as React from 'react';
import Classnames from 'classnames';
import styles from './_styles.css'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'button',
}

export enum Size {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  onClick?: React.MouseEventHandler,
  text?: string,
  disabled?: boolean,
  href?: string,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    onClick,
    text,
    disabled,
    href = '',
  } = props;

  const newProps = {
    padding: Base.Padding.PX_8,
    backgroundColor: Base.BackgroundColor.WHITE,
    border: Base.Border.SOLID,
    ...props,
  }
  //create props
  const buttonProps = {
    onClick: onClick,
    ...Base.mapProps(newProps, styles, [type, size]),
  }
  
  const element = href === ''
    ? <button {...buttonProps}>{text}</button>
    : /^http.+$/.test(href)
      ? <a {...buttonProps}>{text}</a>  
      : <Link  {...buttonProps} to={href}>{text}</Link>;

  return (
    element
  )
}












