import * as React from 'react'
import Classnames from 'classnames'
import * as Text from "_atoms/text";
import * as Image from "_atoms/image";
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'logo',
  CIRLCE = 'logo-cicle',
}

enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

type Props = Base.Props & {
  type?: Type,
  size?: Size,  
  $image?: Image.Props,
  $text?: Text.Props,
}

const Element = (props: Props) => {
  const { 
    type = Type.DEFAULT, 
    size = Size.M, 
    $text, 
    $image,
  } = props;

  //create props
  const logoProps = Base.mapProps(props, styles, [type, size]);

  const imageProps = {
    ...$image,
    src: $image?.src || Base.Config.default_avatar,
    classNames: styles[size],
  };

  const textProps = $text;

  const textElement = $text ? <Text.Element {...textProps} /> : null;

  return (
    <div {...logoProps}>
      <Image.Element {...imageProps} />
      {textElement}
    </div>
  )
}

export {
  Element,
  Type,
  Size,
  Props,
};
