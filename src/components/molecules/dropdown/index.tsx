import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "~atoms/block";
import * as Link from "~atoms/link";
import * as Text from "~atoms/text";
import * as Title from "~atoms/title";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
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
  $title?: Text.Props,
  //for TEXT_DROPDOWN
  $link?: Link.Props,
  //default text
  $list?: List.Props<Text.Props>,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $title,
    $link,
    $list,
  } = props;

  //create props
  const blockWrapperProps = {
    ...props,
  };

  const dropdownProps = {
    classNames: Classnames(
      styles[type],
    ),
    border: Base.Border.SOLID,
  };

  const titleProps = {
    ...$title,
  };

  const linkProps = {
    ...$link,
  };

  const listProps = {
    ...$list,
  };
  // console.log(Classnames(styles['caret']));
  const caretProps = {
    size: SVG.Size.S1,
    classNames: styles['caret'],
  };

  // const subDropDownElement = $subs?.$lis.map(SubDropDownElementMapping);
  if (type === Type.TEXT_DROPDOWN) {
    return (
      <Block.Element {...blockWrapperProps}>
        <Link.Element {...linkProps} />
        <List.Element {...listProps} />
      </Block.Element>
    )
  }

  if (type === Type.DEFAULT) {
    return (
      <Block.Element {...blockWrapperProps}>
        <Text.Element {...titleProps} />
        <Block.Element {...dropdownProps}>
          {/* <Text.Element {...textProps} /> */}
          <Caret {...caretProps}/>
        </Block.Element>
        <List.Element {...listProps} />
      </Block.Element>
    )
  }
  return (
    <></>
  )
}

// const SubDropDownElementMapping = ($listLi: ListLi.Props) => {
//   // const dropdownProps = {
//   //   ...$listLi.children,
//   // };

//   return <Element {...$listLi.children} />;
// };