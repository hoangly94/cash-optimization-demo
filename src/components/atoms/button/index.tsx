import * as React from 'react'
import { Link } from "react-router-dom";
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';

export enum Type {
  DEFAULT = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  onClick?(): void,
  text?: string,
  disabled?: boolean,
  url?: string,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    size = Size.M,
    onClick,
    text,
    disabled,
    url = '',
  } = props;

  //create props
  const buttonProps = {
    ...Base.mapProps(props, styles, [type, size, theme]),
    onClick: onClick,
  }

  const element = url !== ''
    ? <button {...buttonProps}>{text}</button>
    : /^http.+$/.test(url) || url === '' 
      ? <a {...buttonProps}>{text}</a>  
      : <Link  {...buttonProps} to={url}>{text}</Link>;

  return (
    element
  )
}


