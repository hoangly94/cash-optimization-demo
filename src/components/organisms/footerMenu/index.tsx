import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "_atoms/block";
import * as List from "_atoms/list";
import * as Link from "_atoms/link";
import * as Section from "_atoms/section";
import * as TextBlock from "_molecules/textBlock";
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAULT = 'footer-menu',
}

type Props = Section.Props & {
  $innerSection: Block.Props & {
    type?: Type,
    $blocks: MenuBlockProps[],
  }
}

type MenuBlockProps = Block.Props & {
  $link?: Link.Props,
  $list?: List.Props<Link.Props>,
};

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $innerSection,
  } = props;

  //create props
  const sectionProps = props;

  const innerSectionProps = {
    ...$innerSection,
    classNames: Classnames(
      styles[type],
    ),
  };

  const menuBlockElement = $innerSection.$blocks.map(menuBlockElementMapping);
  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSectionProps}>
        {menuBlockElement}
      </Block.Element>
    </Section.Element>
  )
}

const menuBlockElementMapping = ($block: MenuBlockProps) => {
  const blockProps = $block;
  const titleProps = $block.$link;
  const listProps = $block.$list;
  // const menuListElement = $block.$items.$items.map(menuListElementMapping);

  return (
    <Block.Element {...blockProps}>
      <Link.Element {...titleProps} />
      <List.Element {...listProps}/>
    </Block.Element>
  );
}

// const menuListElementMapping = ($item: Link.Props) => {
//   const linkProps = $item;
//   return <Link.Element {...linkProps} />;
// }

export {
  Element,
  Type,
  Props,
};
