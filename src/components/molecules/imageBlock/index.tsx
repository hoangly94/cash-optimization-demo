import * as React from 'react'
import Classnames from 'classnames'
import * as Image from "_atoms/image";
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'image-block',
}

type Props = Block.Props & {
  type?: string,
  $image?: Image.Props,
}

const Element = (props: Props) => {
  const { 
    type = Type.DEFAULT, 
    $image,
  } = props;
  
  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const imageProps = {
    ...$image,
    width: Base.Width.FULL,
  };

  return (
    <Block.Element {...blockProps}>
      <Image.Element {...imageProps}/>
    </Block.Element>
  )
}

export {
  Element,
  Type,
  Props,
};
