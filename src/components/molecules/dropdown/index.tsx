import * as React from 'react'
import Classnames from 'classnames'
import * as TextBlock from "_molecules/textBlock";
import * as ImageBlock from "_molecules/imageBlock";
import * as Block from "_atoms/block";
import * as Link from "_atoms/link";
import * as Image from "_atoms/image";
import * as List from "_atoms/list";
import * as ListLi from "_atoms/list/li";
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAULT = 'dropdown',
}
enum Direction {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

type Props = Base.Props & {
  type?: Type,
  direction?: Direction,
  $link?: Link.Props,
  $subs?: List.Props<Props>,
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $link,
    $subs,
  } = props;

  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const linkProps = {
    ...$link,
  };

  const subProps = {
    ...$subs,
  };
  
  // const subDropDownElement = $subs?.$lis.map(SubDropDownElementMapping);

  return (
    <Block.Element {...blockProps}>
      <Link.Element {...linkProps} />
      <List.Element {...subProps}/>
    </Block.Element>
  )
}

// const SubDropDownElementMapping = ($listLi: ListLi.Props) => {
//   // const dropdownProps = {
//   //   ...$listLi.children,
//   // };

//   return <Element {...$listLi.children} />;
// };

export {
  Element,
  Type,
  Props,
};
