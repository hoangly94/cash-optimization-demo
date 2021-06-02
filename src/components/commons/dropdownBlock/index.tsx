import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "~atoms/block";
import * as Link from "~atoms/link";
import * as Text from "~atoms/text";
import * as Title from "~atoms/title";
import * as Dropdown from "~atoms/dropdown";
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
  const componentWrapperProps: Props = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const dropdownProps: Dropdown.Props = {
    ...$dropdown,
  };

  const titleProps: Text.Props = {
    ...$title,
  };

  return (
    <Block.Element {...componentWrapperProps}>
      <Text.Element {...titleProps} />
      <Dropdown.Element {...dropdownProps} />
    </Block.Element>
  )
}
