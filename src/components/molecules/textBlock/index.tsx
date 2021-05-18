import * as React from 'react'
import Classnames from 'classnames'
import * as Text from "_atoms/text";
import * as Image from "_atoms/image";
import * as Block from "_atoms/block";
import styles from './styles.css';

enum Type {
  DEFAULT = 'text-block',
}

type Props = Block.Props & {
  type?: Type,
  $texts?: Text.Props[],
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $texts = [],
  } = props

  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    )
  };

  const children = $texts.map(textProps => {
    return (<Text.Element {...textProps} />);
  });

  return (
    <Block.Element {...blockProps}>
      {children}
    </Block.Element>
  )
}

export {
  Element,
  Type,
  Props,
};
