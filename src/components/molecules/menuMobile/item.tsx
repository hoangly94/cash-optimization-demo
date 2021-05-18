import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
import * as Base from '_/_settings';
import { Icon } from '_atoms/icon'
import * as DropDown from '_molecules/dropdown'
import * as Link from '_atoms/link'

enum Type {
  DEFAULT = 'menu-item',
}

enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Props = Base.Props & {
  type?: string,
  size?: Size,
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
  } = props;

  //create props
  const itemProps = {
    ...props,
    classNames: Classnames(
      styles[type],
      // styles[size],
    ),
  }

  return (
    <nav {...itemProps}>
    </nav>
  )
}

export {
  Element,
  Type,
  Size,
  Props,
};
