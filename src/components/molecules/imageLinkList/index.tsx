import * as React from 'react'
import Classnames from 'classnames'
import * as TextBlock from "_molecules/textBlock";
import * as ImageBlock from "_molecules/imageBlock";
import * as Block from "_atoms/block";
import * as Link from "_atoms/link";
import * as List from "_atoms/list";
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAULT = 'image-link-list-block',
}

type Props = Base.Props & {
  type?: Type,
  $imageBlock?: ImageBlock.Props,
  $list: List.Props<Link.Props>,
  $link?: Link.Props,
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $imageBlock,
    $list,
    $link,
  } = props;

  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const imageBlockProps = {
    ...$imageBlock,
  };

  const listProps = {
    ...$list,
  };


  const linkProps = {
    ...$link,
  };

  const link = $link ? <Link.Element {...linkProps} /> : null;

  // const LinkListElement = $list.$lis?.map(LinkListElementMapping);

  return (
    <Block.Element {...blockProps}>
      <ImageBlock.Element {...imageBlockProps} />
      <List.Element {...listProps}/>
    </Block.Element>
  )
}

// const LinkListElementMapping = ($link: List.Props<Link.Props>) => {
//   const linkProps = {
//     ...$link,
//   };

//   return <Link.Element {...linkProps} />;
// };

export {
  Element,
  Type,
  Props,
};
