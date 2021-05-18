import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '_/_settings';
import styles from './styles.css'
import baseStyles from '_/_settings/_base.css'

enum Type {
  DEFAULT = 'icon',
  CIRCLE = 'icon-circle',
}

enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  GIANT = 'giant',
}


type Props = {
  type?: Type,
  size?: Size,
  src?: string,
  visibility?: Base.Visibility,
  onClick?(): void,
  className?: string,
}
const Element = (props: Props) => {
  const { type = Type.DEFAULT, size = Size.MEDIUM, src, visibility = Base.Visibility.NONE, onClick, className } = props
  // const aaa = require('./chevron-down.svg');
  
  //create class props  
  const iconProps = {
    src: src,
    onClick: onClick,
    className: Classnames(
      styles[type],
      styles[size],
      baseStyles[visibility],
      className
    ),
  }

  return (
    <img {...iconProps}/>
  )
}

export {
  Element as Icon,
  Type as IconType,
  Size as IconSize,
};

const svgPath = "/svgs/";
export const ChevronUp = svgPath + "chevron-up.svg";
export const ChevronDown = svgPath + "chevron-down.svg";
export const ChevronLeft = svgPath + "chevron-left.svg";
export const ChevronRight = svgPath + "chevron-right.svg";