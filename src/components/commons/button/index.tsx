import * as React from 'react';
import Classnames from 'classnames';
import styles from './_styles.css'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import ThreeDotsLoader from '~commons/svg/threeDotsLoader';
import * as Svg from '~commons/svg';

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
  isLoading?: boolean,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    onClick,
    text,
    disabled,
    href = '',
    isLoading = false,
  } = props;

  const newProps = {
    padding: Base.Padding.PX_8,
    backgroundColor: Base.BackgroundColor.WHITE,
    border: Base.Border.SOLID,
    ...props,
  }

  const onClickWithLoading = (e)=>{
    if(!isLoading && onClick)
      onClick(e);
  }

  const child = isLoading ? <ThreeDotsLoader size={Svg.Size.L2} fill='#fff'/> : text;

  //create props
  const buttonProps = {
    onClick: onClickWithLoading,
    ...Base.mapProps(newProps, styles, [type, size]),
  }
  
  const element = href === ''
    ? <button {...buttonProps}>{child}</button>
    : /^http.+$/.test(href)
      ? <a {...buttonProps}>{child}</a>  
      : <Link  {...buttonProps} to={href}>{child}</Link>;

  return (
    element
  )
}

Element.displayName = 'Button'












