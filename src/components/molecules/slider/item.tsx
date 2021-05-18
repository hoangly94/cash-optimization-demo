import * as React from 'react'
import Classnames from 'classnames'
import * as Image from "_atoms/image";
import * as ContentBlock from "_molecules/contentBlock";
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'slider-item',
}

enum Size {
  SMALL = 'item-small',
  MEDIUM = 'item-medium',
  LARGE = 'item-large',
}

type Props = Block.Props & {
  type?: Type,
  size?: Size,
  index?: number,
  $image?: Image.Props,
  $contentBlock?: ContentBlock.Props,
}

const Element = (props: Props) => {
  const { type = Type.DEFAULT, size = Size.MEDIUM, index = 0, $image, $contentBlock } = props;
  const { height = Base.Height.NONE, width = Base.Width.NONE } = props;

  //create style
  const itemStyle = {
    left: `${100 * index}%`,
    height: height,
  }

  //create props
  const itemProps = {
    ...props,
    style: itemStyle,
    classNames: Classnames(
      styles[type],
      styles[size],
    ),
  }

  const imageProps = {
    ...$image,
    type: Image.Type.FULL,
    width: width,
    height: height,
  }

  const contentBlockProps = {
    ...$contentBlock,
    type: ContentBlock.Type.SLIDER,
    theme: Base.Theme.DARK,
    padding: Base.Padding.PX_38,
  }

  const ContentElement = $contentBlock ? <ContentBlock.Element {...contentBlockProps} /> : '';
  
  return (
    <Block.Element {...itemProps}>
      <Image.Element {...imageProps} />
      {ContentElement}
    </Block.Element>
  );
}

export {
  Element,
  Type,
  Size,
  Props,
};

