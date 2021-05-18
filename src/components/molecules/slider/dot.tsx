import * as React from 'react'
import Classnames from 'classnames'
import * as Image from "_atoms/image";
import * as ContentBlock from "_molecules/contentBlock";
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'dot',
  BORDER = 'dot-border',
}

enum Size {
  S = 'dot-s',
  M = 'dot-m',
  L = 'dot-l',
}

type Props = {
  type?: Type,
  size?: Size,
  theme?: Base.Theme,
  isActive?: Boolean,
  index?: number,
  onClick?(): void,
  className?: string,
  style?: { [key: string]: any; },
}

const Element = (props: Props) => {
  const { type = Type.DEFAULT, size = Size.M, theme = Base.Theme.DEFAULT, isActive, onClick, style, className } = props

  //create props
  const dotProps = {
    className: Classnames(
      styles[type],
      styles[size],
      styles[isActive ? 'active' : ''],
      className
    ),
    onClick: onClick,
    style: style,
  }

  return (
    <a {...dotProps} />
  );
}

export {
  Element,
  Type,
  Size,
  Props,
};

