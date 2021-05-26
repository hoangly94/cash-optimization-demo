import * as React from 'react';
import { Link } from "react-router-dom";
import Classnames from 'classnames';
import * as Base from '~/_settings';
import styles from './styles.css'

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
  href?: string,
}

export const Element = (props: Props) => {
  const {
    theme,
    type = Type.DEFAULT,
    size = Size.M,
    onClick,
    text,
    disabled,
    href = '',
  } = props;

  // const {default: styles  } = !theme || theme === Base.Theme.LIGHT?  require('./styles.css'): require('./styles2.css');
  // const {default: styles1  } =  require('./styles.css');
  // const {default: styles2  } =  require('./dark.css');

  // console.log(styles1);
  // console.log(styles2);
  //create props
  const buttonProps = {
    ...Base.mapProps(props, styles, [type, size]),
    onClick: onClick,
  }
  
  const element = href !== ''
    ? <button {...buttonProps}>{text}</button>
    : /^http.+$/.test(href) || href === '' 
      ? <a {...buttonProps}>{text}</a>  
      : <Link  {...buttonProps} to={href}>{text}</Link>;

  return (
    element
  )
}












