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
  isDisabled?: boolean,
  href?: string,
  isLoading?: boolean,
  children?: React.ReactNode,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    onClick,
    text,
    isLoading = false,
    isDisabled = false,
    href = '',
  } = props;

  const newProps = {
    padding: Base.Padding.PX_8,
    backgroundColor: Base.BackgroundColor.WHITE,
    border: Base.Border.SOLID,
    ...props,
  }


  const child = isLoading ? <ThreeDotsLoader size={Svg.Size.L2} fill='#fff' /> : text;

  const disabled = isDisabled ? 'disabled' : '';

  //create props
  const buttonProps = {
    onClick: onClickWithLoading(isDisabled, isLoading, onClick),
    ...Base.mapProps(newProps, styles, [type, size, disabled]),
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

const onClickWithLoading = (isDisabled: boolean, isLoading: boolean, onClick?: React.MouseEventHandler) => (e) => {
  if (!isDisabled && !isLoading && onClick)
    onClick(e);
}

Element.displayName = 'Button'












