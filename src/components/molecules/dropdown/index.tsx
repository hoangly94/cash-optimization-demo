import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "~atoms/block";
import * as Link from "~atoms/link";
import * as Text from "~atoms/text";
import Caret from "~svg/caret";
import * as List from "~atoms/list";
import * as Base from '~/_settings';
import styles from './styles.css';

export enum Type {
  DEFAULT = 'dropdown',
  TEXT_DROPDOWN = 'text-dropdown',
}
export enum Direction {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export type Props = Base.Props & {
  type?: Type,
  direction?: Direction,
  //for TEXT_DROPDOWN
  $link?: Link.Props,
  //default text
  $text: Text.Props,
  $subs?: List.Props<Props>,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $link,
    $subs,
  } = props;

  //create props
  const blockWrapperProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const blockProps = {

  };

  const linkProps = {
    ...$link,
  };

  const subProps = {
    ...$subs,
  };

  // const subDropDownElement = $subs?.$lis.map(SubDropDownElementMapping);
  if (type === Type.TEXT_DROPDOWN) {
    return (
      <Block.Element {...blockWrapperProps}>
        <Link.Element {...linkProps} />
        <List.Element {...subProps} />
      </Block.Element>
    )
  }

  return (
    <Block.Element {...blockWrapperProps}>
      <Block.Element {...blockProps}>
        <Link.Element {...linkProps} />
        <Caret/>
      </Block.Element>
      <List.Element {...subProps} />
    </Block.Element>
  )
}

// const SubDropDownElementMapping = ($listLi: ListLi.Props) => {
//   // const dropdownProps = {
//   //   ...$listLi.children,
//   // };

//   return <Element {...$listLi.children} />;
// };