import * as React from 'react'
import Classnames from 'classnames'
import * as TextBlock from "_molecules/textBlock";
import * as ImageBlock from "_molecules/imageBlock";
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'image-text-block',
}

type Props = Base.Props & {
  type?: string,
  $imageBlock?: ImageBlock.Props,
  $textBlock?: TextBlock.Props,
}

const Element = (props: Props) => {
  const { 
    type = Type.DEFAULT, 
    $imageBlock, 
    $textBlock,
  } = props;
  
  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const imageBlockProps = $imageBlock;
  const textBlockProps = $textBlock;

  return (
    <Block.Element {...blockProps}>
      <ImageBlock.Element {...imageBlockProps}/>
      <TextBlock.Element {...textBlockProps}/>
    </Block.Element>
  )
}

export {
  Element,
  Type,
  Props,
};
