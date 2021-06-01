import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "~atoms/block";
import * as Link from "~atoms/link";
import * as Text from "~atoms/text";
import * as Title from "~atoms/title";
import * as Dropdown from "~atoms/dropdown";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
import * as List from "~atoms/list";
import * as Base from '~/_settings';
import styles from './styles.css';

export enum Type {
  DEFAULT = 'dropdown-block',
}

export type Props = Base.Props & {
  type?: Type,
  $title?: Text.Props,
  $dropdown?: Dropdown.Props,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $title,
    $dropdown,
  } = props;

  //create props
  const blockWrapperProps: Props = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const dropdownProps: Dropdown.Props = {
    ...$dropdown,
    border: Base.Border.SOLID,
  };

  const titleProps: Text.Props = {
    ...$title,
  };

  return (
    <Block.Element {...blockWrapperProps}>
      <Text.Element {...titleProps} />
      <Dropdown.Element {...dropdownProps} />
    </Block.Element>
  )
}
