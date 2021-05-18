import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import baseStyles from '../../_settings/_base.css'
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'image',
  FULL = 'image-full',
  CIRLCE = 'image-cicle',
}

enum Size {
  Default = '',
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

type Props = Base.Props & {
  type?: Type,
  size?: Size,
  src?: string,
  onClick?(): void,
}

const Element = (props: Props) => {
  const { 
    type = Type.DEFAULT, 
    size = Size.Default, 
    src = Base.Config.default_image, 
    onClick
  } = props;
  
  //create props
  const imageProps = {
    ...Base.mapProps(props, styles, [type, size]),
    src: src,
    onClick: onClick,
  };

  return (
    <img {...imageProps} />
  )
}

export {
  Element,
  Type,
  Size,
  Props,
};
